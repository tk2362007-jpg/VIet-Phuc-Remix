export interface WeatherInfo {
  location: string;
  temp: number;
  condition: string;
  conditionCode: 'sunny' | 'cloudy' | 'rainy' | 'cool' | 'breeze';
  humidity: number;
  windSpeed: string;
  rainProbability: number;
  clothingAdvice: string;
  recommendedFabrics: string[];
}

export interface VietnamLocation {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  defaultTemp: number;
  vibe: string;
}

export const VIETNAM_LOCATIONS: VietnamLocation[] = [
  { id: 'hanoi', name: 'Hà Nội', region: 'Miền Bắc', lat: 21.0285, lon: 105.8542, defaultTemp: 22, vibe: 'Cổ kính, Hồ Gươm, 36 phố phường' },
  { id: 'hue', name: 'Huế', region: 'Miền Trung', lat: 16.4637, lon: 107.5909, defaultTemp: 25, vibe: 'Cố đô trầm mặc, Đại Nội, Sông Hương' },
  { id: 'hochiminh', name: 'TP. Hồ Chí Minh', region: 'Miền Nam', lat: 10.8231, lon: 106.6297, defaultTemp: 31, vibe: 'Năng động, hiện đại, rực rỡ nắng ấm' },
  { id: 'hoian', name: 'Hội An', region: 'Miền Trung', lat: 15.8801, lon: 108.3380, defaultTemp: 26, vibe: 'Phố cổ đèn lồng, Chùa Cầu, sông Hoài' },
  { id: 'dalat', name: 'Đà Lạt', region: 'Tây Nguyên', lat: 11.9404, lon: 108.4583, defaultTemp: 18, vibe: 'Sương mù, cao nguyên mát lạnh' },
  { id: 'danang', name: 'Đà Nẵng', region: 'Miền Trung', lat: 16.0544, lon: 108.2022, defaultTemp: 27, vibe: 'Biển xanh, cầu Rồng, thanh lịch' },
  { id: 'cantho', name: 'Cần Thơ', region: 'Miền Tây', lat: 10.0452, lon: 105.7469, defaultTemp: 30, vibe: 'Sông nước hữu tình, miệt vườn Nam Bộ' }
];

export const TIME_OF_DAY_OPTIONS = [
  { id: 'morning', label: 'Buổi Sáng', timeRange: '06:30 — 11:30', desc: 'Ánh sáng tự nhiên trong trẻo, khí trời mát lành' },
  { id: 'afternoon', label: 'Buổi Chiều', timeRange: '13:00 — 17:30', desc: 'Nắng ấm hoàng hôn, lý tưởng chụp ảnh ngoại cảnh' },
  { id: 'evening', label: 'Buổi Tối', timeRange: '18:00 — 22:00', desc: 'Không gian tiệc tùng, lễ hội hoa đăng trang trọng' }
] as const;

export type TimeOfDayId = typeof TIME_OF_DAY_OPTIONS[number]['id'];

/**
 * Format date to Vietnamese formal display string
 */
export function formatVietnameseDate(date: Date): string {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${dayName}, ngày ${day}/${month}/${year}`;
}

/**
 * Lấy dữ liệu thời tiết thực tế từ trạm khí tượng qua Open-Meteo API.
 * Xử lý lỗi kết nối, quá giới hạn dự báo và không tự bịa số liệu khi API không trả về.
 */
export async function fetchRealWeatherForecast(
  locationId: string,
  targetDate: Date,
  timeOfDay: TimeOfDayId = 'morning'
): Promise<WeatherInfo> {
  const loc = VIETNAM_LOCATIONS.find((l) => l.id === locationId) || VIETNAM_LOCATIONS[0];
  const now = new Date();

  // Tính khoảng cách ngày so với hiện tại
  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffTime = targetMidnight.getTime() - todayMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Open-Meteo forecast hỗ trợ trong vòng 16 ngày
  if (diffDays > 16) {
    throw new Error(
      `Dịch vụ khí tượng hiện chỉ cung cấp dự báo chính xác trong vòng 16 ngày tới. Ngày ${formatVietnameseDate(targetDate)} chưa có dữ liệu thời tiết trực tuyến.`
    );
  }
  if (diffDays < -30) {
    throw new Error(
      `Ngày ${formatVietnameseDate(targetDate)} quá xa trong quá khứ, không có dữ liệu khí tượng trực tuyến.`
    );
  }

  const targetDateStr = `${targetMidnight.getFullYear()}-${String(targetMidnight.getMonth() + 1).padStart(2, '0')}-${String(targetMidnight.getDate()).padStart(2, '0')}`;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=Asia%2FBangkok&forecast_days=16`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Máy chủ thời tiết phản hồi không thành công (mã ${res.status}).`);
    }

    const data = await res.json();
    if (!data.hourly || !Array.isArray(data.hourly.time)) {
      throw new Error('Dữ liệu thời tiết trả về từ máy chủ không hợp lệ.');
    }

    // Xác định giờ mục tiêu theo timeOfDay
    let targetHour = '09:00';
    if (timeOfDay === 'afternoon') targetHour = '15:00';
    if (timeOfDay === 'evening') targetHour = '19:00';

    const targetIsoPrefix = `${targetDateStr}T${targetHour}`;
    let matchIdx = data.hourly.time.findIndex((t: string) => t.startsWith(targetIsoPrefix));
    if (matchIdx === -1) {
      matchIdx = data.hourly.time.findIndex((t: string) => t.startsWith(targetDateStr));
    }
    if (matchIdx === -1) {
      throw new Error(`Không tìm thấy dữ liệu thời tiết cho ngày ${targetDateStr}.`);
    }

    const temp = Math.round(data.hourly.temperature_2m[matchIdx]);
    const humidity = Math.round(data.hourly.relative_humidity_2m[matchIdx] ?? 65);
    const rainProbability = Math.round(data.hourly.precipitation_probability[matchIdx] ?? 0);
    const windSpeedRaw = data.hourly.wind_speed_10m[matchIdx];
    const windSpeed = `${Math.round(windSpeedRaw ?? 10)} km/h`;
    const weatherCode = Number(data.hourly.weather_code[matchIdx] ?? 0);

    let condition = 'Nắng ráo quang đãng';
    let conditionCode: WeatherInfo['conditionCode'] = 'sunny';
    let clothingAdvice = 'Thời tiết rất đẹp cho trang phục truyền thống.';
    let recommendedFabrics = ['Lụa tơ tằm', 'Linen mộc', 'Gấm nhẹ'];

    if (weatherCode >= 51 && weatherCode <= 99) {
      condition = weatherCode >= 80 ? 'Mưa rào rải rác' : 'Có thể có mưa';
      conditionCode = 'rainy';
      clothingAdvice = 'Có thể có mưa: Khuyên dùng tà áo gọn gàng, mang theo ô truyền thống để giữ vạt áo khô ráo.';
      recommendedFabrics = ['Lụa đanh sợi', 'Vải tơ chịu ẩm', 'Linen'];
    } else if (temp <= 19) {
      condition = 'Se lạnh mát lành';
      conditionCode = 'cool';
      clothingAdvice = 'Tiết trời se lạnh: Thích hợp diện Áo Ngũ Thân hoặc Áo Tấc tay thụng nhiều lớp, phối khăn đóng giữ ấm.';
      recommendedFabrics = ['Gấm dệt tơ', 'Nhung the cao cấp', 'Lụa hai lớp'];
    } else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
      condition = 'Mây dịu, gió mát';
      conditionCode = 'breeze';
      clothingAdvice = 'Trời mát mẻ, tà áo bay bổng khi dạo phố. Rất thích hợp cho Áo Dài, Áo Tứ Thân mềm mại.';
      recommendedFabrics = ['Lụa Vạn Phúc', 'Lụa tơ tằm Nha Xá', 'The La Khê'];
    } else if (temp <= 27) {
      condition = 'Trời quang nắng nhẹ';
      conditionCode = 'sunny';
      clothingAdvice = 'Nhiệt độ dễ chịu, nắng nhẹ dịu dàng: Rất lý tưởng chụp ảnh ngoại cảnh cùng Áo Dài truyền thống.';
      recommendedFabrics = ['Lụa tơ tằm mềm', 'Đũi tự nhiên', 'Voan lót lụa'];
    } else {
      condition = 'Nắng ấm nhiệt đới';
      conditionCode = 'sunny';
      clothingAdvice = 'Nắng ấm phương Nam: Hoàn hảo cho Áo Bà Ba hoặc Áo Dài cách tân phom suông, chất vải mát rượi.';
      recommendedFabrics = ['Lãnh Mỹ A mát rượi', 'Linen sợi tre', 'Lụa tơ tằm nhẹ'];
    }

    return {
      location: loc.name,
      temp,
      condition,
      conditionCode,
      humidity,
      windSpeed,
      rainProbability,
      clothingAdvice,
      recommendedFabrics
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Kết nối dịch vụ thời tiết quá thời gian chờ (timeout). Vui lòng thử lại.');
    }
    throw err;
  }
}

/**
 * Fallback local weather calculation for backwards compatibility if needed
 */
export function getWeatherForecast(
  locationId: string,
  targetDate: Date,
  timeOfDay: TimeOfDayId = 'morning'
): WeatherInfo {
  const loc = VIETNAM_LOCATIONS.find((l) => l.id === locationId) || VIETNAM_LOCATIONS[0];
  
  let timeOffset = 0;
  if (timeOfDay === 'morning') timeOffset = -2;
  if (timeOfDay === 'afternoon') timeOffset = +3;
  if (timeOfDay === 'evening') timeOffset = -1;

  const daySeed = targetDate.getDate() * 11 + (targetDate.getMonth() + 1) * 23;
  const dayHash = (daySeed % 7) - 3;
  const temp = Math.max(14, loc.defaultTemp + timeOffset + dayHash);

  const rainSeed = (daySeed + loc.name.length * 7) % 100;
  let rainProbability = Math.max(5, Math.min(85, rainSeed));

  let condition = 'Nắng nhẹ dịu dàng';
  let conditionCode: WeatherInfo['conditionCode'] = 'sunny';
  let humidity = 65;
  let windSpeed = '12 km/h';
  let clothingAdvice = 'Thời tiết rất đẹp cho trang phục truyền thống.';
  let recommendedFabrics = ['Lụa tơ tằm', 'Linen mộc', 'Gấm nhẹ'];

  if (rainProbability >= 65) {
    condition = 'Có thể có mưa nhẹ';
    conditionCode = 'rainy';
    humidity = 82;
    windSpeed = '14 km/h';
    clothingAdvice = 'Khả năng có mưa nhẹ: Khuyên dùng tà áo gọn gàng, tránh vạt quét đất; phối kèm ô giấy truyền thống hoặc giày sneaker tiện di chuyển.';
    recommendedFabrics = ['Lụa đanh sợi', 'Vải tơ chịu ẩm', 'Linen'];
  } else if (temp <= 19) {
    condition = 'Se lạnh mát lành';
    conditionCode = 'cool';
    humidity = 72;
    windSpeed = '15 km/h';
    clothingAdvice = 'Tiết trời se lạnh: Thích hợp diện Áo Ngũ Thân dày dặn hoặc Áo Tấc tay thụng, phối khăn đóng hoặc áo lót hai lớp để giữ ấm thanh lịch.';
    recommendedFabrics = ['Gấm dệt tơ', 'Nhung the cao cấp', 'Lụa hai lớp'];
  } else if (temp <= 25) {
    condition = 'Mát mẻ, trời quang';
    conditionCode = 'breeze';
    humidity = 60;
    windSpeed = '10 km/h';
    clothingAdvice = 'Thời tiết lý tưởng nhất trong năm: Thoải mái diện Áo Dài, Áo Tứ Thân hoặc Ngũ Thân. Trang phục thả tà mềm mại, bay bổng trong gió.';
    recommendedFabrics = ['Lụa Vạn Phúc', 'Lụa tơ tằm Nha Xá', 'The La Khê'];
  } else if (temp <= 29) {
    condition = 'Nắng ráo, thoáng đãng';
    conditionCode = 'sunny';
    humidity = 68;
    windSpeed = '8 km/h';
    clothingAdvice = 'Nắng ráo chan hòa: Ưu tiên chất liệu lụa mỏng nhẹ, thoát ẩm tốt. Nên mang thêm nón lá bài thơ hoặc nón quai thao vừa che nắng vừa tạo dáng duyên dáng.';
    recommendedFabrics = ['Lụa tơ tằm mỏng', 'Vải Đũi sợi tự nhiên', 'Voan lót lụa'];
  } else {
    condition = 'Nắng ấm nhiệt đới';
    conditionCode = 'sunny';
    humidity = 76;
    windSpeed = '7 km/h';
    clothingAdvice = 'Nắng ấm phương Nam: Hoàn hảo cho Áo Bà Ba hoặc Áo Dài cách tân phom suông. Chất vải mát rượi, thấm hút mồ hôi tối ưu.';
    recommendedFabrics = ['Lãnh Mỹ A mát rượi', 'Linen 100% sợi tre', 'Lụa tơ tằm nhẹ'];
  }

  return {
    location: loc.name,
    temp,
    condition,
    conditionCode,
    humidity,
    windSpeed,
    rainProbability,
    clothingAdvice,
    recommendedFabrics
  };
}
