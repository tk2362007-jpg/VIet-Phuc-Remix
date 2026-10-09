import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Curated high-fidelity facts for instant responsiveness & resilient fallback
const CURATED_FACTS = [
  {
    title: 'Bí ẩn 5 hạt cúc trên tà Áo Ngũ Thân',
    garment: 'Áo Ngũ Thân',
    era: 'Triều Nguyễn (1744 - 1945)',
    fact: '5 chiếc cúc áo ngũ thân (thường bằng gỗ quý, ngọc hoặc đồng) tượng trưng cho đạo lý Ngũ Thường của người quân tử: Nhân, Lễ, Nghĩa, Trí, Tín. Ngoài ra, 5 thân áo còn đại diện cho Tứ thân phụ mẫu (cha mẹ đẻ và cha mẹ chồng/vợ) cùng người mặc ở giữa được chở che.',
    significance: 'Nhắc nhở người mặc luôn giữ gìn chuẩn mực đạo đức, lòng hiếu thảo và khí chất đoan chính trong mọi hành vi ứng xử.',
    didYouKnow: 'Vua Minh Mạng năm 1837 từng ban chiếu định chế Áo Ngũ Thân làm quốc phục trên toàn cõi Việt Nam từ Bắc chí Nam.',
    sources: [
      {
        title: 'Áo ngũ thân - Trang phục truyền thống Việt Nam',
        uri: 'https://vi.wikipedia.org/wiki/%C3%81o_ng%C5%A9_th%C3%A2n'
      },
      {
        title: 'Ý nghĩa văn hóa của áo ngũ thân thời Nguyễn - Tạp chí Di sản',
        uri: 'https://vietnamheritage.com.vn'
      }
    ]
  },
  {
    title: 'Họa tiết Thủy Ba & Dải Ngũ Sắc Áo Nhật Bình',
    garment: 'Áo Nhật Bình',
    era: 'Hoàng tộc triều Nguyễn (thế kỷ 19)',
    fact: 'Viền cổ áo Nhật Bình ghép dải ngũ sắc (xanh, vàng, trắng, đỏ, lục) tượng trưng cho Ngũ hành tương sinh tương khắc. Phần gấu áo luôn thêu họa tiết sóng nước Thủy Ba nhấp nhô và dải mây Ngũ sắc, tượng trưng cho sự vững chãi của đất nước vươn mình giữa trời biển.',
    significance: 'Thể hiện thứ bậc tôn quý trong chốn cung đình (Hoàng hậu, Công chúa, Cung tần) và tư duy triết học vũ trụ quan Á Đông.',
    didYouKnow: 'Cái tên "Nhật Bình" bắt nguồn từ chính cổ áo hình chữ nhật cân đối buông thẳng trước ngực.',
    sources: [
      {
        title: 'Áo Nhật Bình - Tuyệt tác lễ phục cung đình Huế',
        uri: 'https://vi.wikipedia.org/wiki/%C3%81o_Nh%E1%BA%ADt_B%C3%ACnh'
      }
    ]
  },
  {
    title: 'Chiếc Nón Quai Thao và 32 Công Đoạn Tinh Xảo',
    garment: 'Nón Quai Thao (Nón Ba Tầm)',
    era: 'Thế kỷ 17 - 20 (Vùng Kinh Bắc)',
    fact: 'Nón quai thao của các liền chị quan họ có đường kính rộng từ 70 - 80cm phẳng như mặt trời nhỏ. Để hoàn thiện một chiếc nón đạt chuẩn, nghệ nhân làng Triều Khúc phải thực hiện tới 32 công đoạn tỉ mỉ, từ chuốt nan tre cật, ép lá cọ già đến bện chùm quai thao bằng tơ tằm óng ả.',
    significance: 'Biểu tượng của sự duyên dáng, e ấp và thanh lịch của người phụ nữ Kinh Bắc ngàn năm văn hiến.',
    didYouKnow: 'Quai thao dệt bằng sợi tơ tằm nguyên chất có gắn hai quả thao tròn rủ xuống ngực, khi di chuyển sẽ khẽ lay động tạo nhịp điệu nhẹ nhàng.',
    sources: [
      {
        title: 'Nghề làm nón quai thao Triều Khúc - Di sản văn hóa phi vật thể',
        uri: 'https://vietnam.vnanet.vn'
      }
    ]
  },
  {
    title: 'Lãnh Mỹ A và Kỹ Thuật Nhuộm Trái Mặc Nưa',
    garment: 'Chất liệu Lãnh Mỹ A (Áo Bà Ba / Áo Dài cao cấp)',
    era: 'Miền Tây Nam Bộ (Đầu thế kỷ 20)',
    fact: 'Lãnh Mỹ A được mệnh danh là "nữ hoàng của các loại lụa". Vải dệt từ 100% tơ tằm tự nhiên, sau đó được nhúng mủ trái Mặc Nưa tươi và phơi nắng liên tục hơn 100 lần trong 45 ngày để đạt được màu đen tuyền huyền bí, bóng như da thuộc và càng mặc càng óng ả.',
    significance: 'Đỉnh cao của sự cần mẫn và trí tuệ bản địa Nam Bộ trong việc tận dụng quà tặng của thiên nhiên nhiệt đới.',
    didYouKnow: 'Khi trời nắng nóng, mặc Lãnh Mỹ A mang lại cảm giác mát lạnh lạ kỳ; khi trời lạnh, chất vải lại giữ ấm tự nhiên.',
    sources: [
      {
        title: 'Lãnh Mỹ A - Huyền thoại tơ lụa Tân Châu An Giang',
        uri: 'https://angiang.gov.vn'
      }
    ]
  },
  {
    title: 'Khăn Đóng chữ "Nhất" (一) & Sự Quang Minh',
    garment: 'Khăn Đóng (Khăn Xếp)',
    era: 'Thế kỷ 18 - nay',
    fact: 'Vành khăn đóng phía trước trán của nam giới xưa luôn xếp nếp thành hình chữ "Nhất" (一) ngay ngắn, còn phụ nữ thường xếp hình chữ "Nhân" (人). Chữ "Nhất" tượng trưng cho sự chính trực, quang minh chính đại, trước sau như một của người quân tử.',
    significance: 'Thể hiện cốt cách đĩnh đạc, trật tự lễ nghi và sự tôn trọng tuyệt đối với người đối diện.',
    didYouKnow: 'Thời Nguyễn, dân gian có câu "Áo cài khuy, khăn quấn đầu" như chuẩn mực tối thiểu của một người trí thức xuất hành.',
    sources: [
      {
        title: 'Khăn đóng Việt Nam qua các thời kỳ lịch sử',
        uri: 'https://vi.wikipedia.org/wiki/Kh%C4%83n_%C4%91%C3%B3ng'
      }
    ]
  },
  {
    title: 'Áo Giao Lĩnh thời Lý - Trần: Dấu Tích Ngàn Năm',
    garment: 'Áo Giao Lĩnh (Cổ Chéo)',
    era: 'Thời Lý - Trần - Hậu Lê (Thế kỷ 11 - 18)',
    fact: 'Áo Giao Lĩnh là dạng trang phục cổ với cổ áo vắt chéo trước ngực (vạt trái đè lên vạt phải). Đây là một trong những dạng cổ phục lâu đời nhất được phát hiện trong các bức tượng cổ và tranh vẽ thời Lý, Trần, từng được mặc phổ biến bởi cả hoàng gia lẫn thứ dân.',
    significance: 'Cội nguồn cấu trúc trang phục truyền thống của người Việt trước khi áo ngũ thân và áo dài ra đời.',
    didYouKnow: 'Quy tắc vạt trái đè lên vạt phải (hữu nhậm) là quy chuẩn phân biệt y phục văn minh trong quan niệm cổ xưa.',
    sources: [
      {
        title: 'Trang phục thời Lý - Trần qua tư liệu khảo cổ học',
        uri: 'https://baotanglichsu.vn'
      }
    ]
  },
  {
    title: 'Chiếc Vòng Kiềng Bạc và Tín Ngưỡng Bảo Trợ Bình An',
    garment: 'Vòng Kiềng Bạc',
    era: 'Truyền thống ngàn đời',
    fact: 'Kiềng bạc nguyên khối hình tròn khép kín biểu trưng cho sự viên mãn, sung túc và vẹn toàn trời đất. Trong các gia đình xưa, chiếc kiềng bạc là của hồi môn thiêng liêng người mẹ trao cho con gái ngày vu quy, vừa là trang sức quý giá vừa mang ý nghĩa bảo bọc.',
    significance: 'Bạc ta được cha ông tin rằng có khả năng kỵ gió độc, thanh lọc tà khí và bảo vệ sức khỏe cho người mang.',
    didYouKnow: 'Đường kính và độ dày của kiềng được uốn tỉ mỉ để ôm khít nhẹ nhàng chân cổ áo đứng của Áo Dài và Áo Ngũ Thân.',
    sources: [
      {
        title: 'Ý nghĩa của chiếc kiềng bạc trong đám cưới truyền thống Việt',
        uri: 'https://vietnamnet.vn'
      }
    ]
  },
  {
    title: 'Áo Tấc — Quốc Phục Đại Lễ của Dân Tộc',
    garment: 'Áo Tấc (Áo Tay Thụng)',
    era: 'Triều Nguyễn (1802 - 1945)',
    fact: 'Áo Tấc thực chất là áo ngũ thân nhưng có ống tay thụng dài rộng (rộng từ 30 - 50cm). Khi người mặc chắp tay trước ngực hành lễ (lễ vái), hai ống tay áo buông thõng phủ kín bàn tay tạo thành dáng điệu trang nghiêm, cung kính tuyệt đối.',
    significance: 'Dành riêng cho các nghi lễ trọng đại nhất: Tế Nam Giao, bái yết tổ tiên, lễ cưới hỏi và đại triều.',
    didYouKnow: 'Cái tên "Áo Tấc" xuất phát từ việc phần viền áo thụng được may rộng thêm đúng một tấc ta (khoảng 4cm).',
    sources: [
      {
        title: 'Áo tấc - Lễ phục trang trọng của người Việt',
        uri: 'https://vi.wikipedia.org/wiki/%C3%81o_t%E1%BA%A5c'
      }
    ]
  },
  {
    title: 'Áo Tứ Thân và Triết Lý Thắt Lưng Bao Duyên Dáng',
    garment: 'Áo Tứ Thân',
    era: 'Bắc Bộ (Thế kỷ 12 - 20)',
    fact: 'Áo Tứ Thân gồm bốn vạt: hai vạt sau may liền thành sống áo ở giữa lưng (tượng trưng cho cha mẹ), hai vạt trước buộc lại trước bụng tạo nét thắt duyên dáng. Phía trong là chiếc yếm hoa gút cổ phối dải yếm lụa hồng, xanh hoặc đào thắm.',
    significance: 'Biểu trưng cho vẻ đẹp chất phác, đảm đang, tần tảo của người phụ nữ nông thôn Bắc Bộ và văn hóa dân ca quan họ.',
    didYouKnow: 'Chiếc thắt lưng xanh hay thắt lưng điều buộc quanh eo không chỉ giữ vạt áo mà còn tạo điểm nhấn cân đối đường cong cơ thể.',
    sources: [
      {
        title: 'Vẻ đẹp và cấu trúc Áo Tứ Thân Việt Nam',
        uri: 'https://vi.wikipedia.org/wiki/%C3%81o_t%E1%BB%A9_th%C3%A2n'
      }
    ]
  },
  {
    title: 'Áo Đối Khâm Thời Lê — Nét Qúy Phái Thăng Long',
    garment: 'Áo Đối Khâm',
    era: 'Thời Lê Trung Hưng (Thế kỷ 16 - 18)',
    fact: 'Áo Đối Khâm có hai vạt trước buông thẳng song song, không cài khuy mà để lộ lớp y phục bên trong gấm vóc hoa lệ. Đây là kiểu lễ phục cao quý của mệnh phụ phu nhân và hoàng thất chốn kinh kỳ Thăng Long xưa.',
    significance: 'Đại diện cho sự cởi mở, sang trọng và trào lưu thẩm mỹ đỉnh cao của triều đại Lê - Trịnh.',
    didYouKnow: 'Nhiều tượng hậu thời Lê tại chùa Dâu, chùa Bút Tháp tạc lại hình tượng Áo Đối Khâm với hoa văn mây lửa vô cùng sống động.',
    sources: [
      {
        title: 'Cổ phục thời Lê Trung Hưng qua hiện vật khảo cổ',
        uri: 'https://baotanglichsu.vn'
      }
    ]
  }
];

const SEARCH_PROMPT_TOPICS = [
  'áo ngũ thân tay chẽn và triết lý ngũ thường thời chúa Nguyễn Phúc Khoát',
  'áo nhật bình cung đình Huế dải ngũ sắc hoa văn thủy ba',
  'nón quai thao nón ba tầm quan họ Bắc Ninh kỹ thuật bện quai thao',
  'lụa tơ tằm Vạn Phúc Hà Đông kỹ thuật dệt the tiến vua',
  'áo tấc áo thụng lễ nghi tế giao triều Nguyễn',
  'vòng kiềng bạc truyền thống phụ nữ Việt Nam ý nghĩa của hồi môn',
  'khăn đóng khăn xếp chữ nhất phẩm hạnh người xưa',
  'áo giao lĩnh thời Lý Trần Hậu Lê khảo cổ học trang phục',
  'lãnh Mỹ A Tân Châu An Giang nhuộm trái mặc nưa tơ tằm',
  'áo bà ba Nam Bộ lịch sử nguồn gốc văn hóa miệt vườn',
  'áo đối khâm thời Lê Trung Hưng y phục quý tộc Thăng Long',
  'họa tiết mây ngũ sắc và sóng nước trên hoàng bào Việt Nam'
];

// In-memory cache & rate limit cooldown tracking
interface CachedTriviaEntry {
  data: any;
  timestamp: number;
}
const triviaMemoryCache = new Map<string, CachedTriviaEntry>();
const CACHE_LIFETIME_MS = 30 * 60 * 1000; // 30 minutes
let rateLimitCooldownUntil = 0; // Cooldown timestamp when 429 occurs

async function startServer() {
  const app = express();
  app.use(express.json());

  // Google GenAI Client with User-Agent telemetry
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API: Get random Viet Phuc knowledge fact grounded with Google Search
  app.get('/api/viet-phuc-trivia', async (req: Request, res: Response) => {
    const requestedTopic = req.query.topic as string | undefined;
    const randomTopic =
      requestedTopic ||
      SEARCH_PROMPT_TOPICS[Math.floor(Math.random() * SEARCH_PROMPT_TOPICS.length)];

    // 1. Check in-memory cache first for fast response
    const cached = triviaMemoryCache.get(randomTopic);
    if (cached && Date.now() - cached.timestamp < CACHE_LIFETIME_MS) {
      return res.json(cached.data);
    }

    // 2. If rate-limited or without API key, gracefully serve from curated heritage archive
    const isRateLimited = Date.now() < rateLimitCooldownUntil;
    if (!apiKey || isRateLimited) {
      const fallbackFact = CURATED_FACTS[Math.floor(Math.random() * CURATED_FACTS.length)];
      return res.json({
        ...fallbackFact,
        groundedWithGoogleSearch: false,
        sourceType: 'curated-archive',
        note: isRateLimited
          ? 'Kho lưu trữ di sản văn hóa Việt phục (chế độ bảo toàn kết nối).'
          : 'Đang hiển thị từ kho lưu trữ di sản văn hóa.'
      });
    }

    try {
      const prompt = `Bạn là chuyên gia nghiên cứu cổ phục và trang phục truyền thống Việt Nam.
Hãy dùng Google Search để tra cứu thông tin chính xác và chọn một sự thật thú vị, giàu giá trị văn hóa lịch sử về chủ đề: "${randomTopic}".

Yêu cầu định dạng:
Chỉ trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm lời chào hay giải thích ngoài mã JSON), theo cấu trúc sau:
{
  "title": "Tiêu đề ngắn gọn, cuốn hút (dưới 15 chữ)",
  "garment": "Tên loại trang phục hoặc phụ kiện",
  "era": "Thời kỳ hoặc triều đại lịch sử chính xác",
  "fact": "Nội dung sự thật thú vị, súc tích (khoảng 2-4 câu dễ hiểu, giàu thông tin thực tế)",
  "significance": "Ý nghĩa biểu tượng, triết lý hoặc giá trị văn hóa sâu sắc",
  "didYouKnow": "Một câu hỏi 'Bạn có biết?' ngắn gọn thú vị khơi gợi tò mò (1 câu)"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const responseText = response.text || '';

      // Extract Google Search grounding chunks
      const candidate = response.candidates?.[0];
      const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];
      const searchQueries = candidate?.groundingMetadata?.webSearchQueries || [];

      const searchSources = groundingChunks
        .map((chunk: any) => {
          if (chunk?.web?.uri) {
            return {
              title: chunk.web.title || 'Nguồn kiểm chứng trên Google Search',
              uri: chunk.web.uri,
            };
          }
          return null;
        })
        .filter(Boolean);

      // Parse JSON safely
      let parsedData: any = null;
      try {
        const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        const jsonCleanText = jsonMatch ? jsonMatch[1].trim() : responseText.trim();
        parsedData = JSON.parse(jsonCleanText);
      } catch (jsonErr) {
        parsedData = {
          title: `Kiến thức về ${randomTopic}`,
          garment: 'Cổ phục Việt Nam',
          era: 'Di sản truyền thống',
          fact: responseText.slice(0, 320).trim(),
          significance: 'Bảo tồn và tôn vinh nét đẹp trang phục cổ truyền Việt Nam.',
          didYouKnow: 'Mỗi chi tiết trên y phục Việt xưa đều ẩn chứa nhân sinh quan sâu sắc.'
        };
      }

      const payload = {
        title: parsedData.title || `Kiến thức về ${randomTopic}`,
        garment: parsedData.garment || 'Việt phục truyền thống',
        era: parsedData.era || 'Lịch sử Việt Nam',
        fact: parsedData.fact || responseText,
        significance: parsedData.significance || 'Tôn vinh giá trị văn hóa và thẩm mỹ truyền thống dân tộc.',
        didYouKnow: parsedData.didYouKnow || 'Trang phục thể hiện phẩm hạnh và tâm hồn người mặc.',
        sources: searchSources.length > 0 ? searchSources : [
          {
            title: 'Tìm kiếm tư liệu cổ phục trên Google',
            uri: `https://www.google.com/search?q=${encodeURIComponent(randomTopic)}`
          }
        ],
        searchQueries,
        groundedWithGoogleSearch: true,
        sourceType: 'live-google-search',
        queryTopic: randomTopic
      };

      // Store in memory cache
      triviaMemoryCache.set(randomTopic, { data: payload, timestamp: Date.now() });

      return res.json(payload);
    } catch (apiError: any) {
      const errMsg = apiError?.message || String(apiError);
      const isQuotaError =
        errMsg.includes('429') ||
        errMsg.includes('RESOURCE_EXHAUSTED') ||
        errMsg.includes('quota') ||
        errMsg.includes('rate-limit') ||
        apiError?.status === 'RESOURCE_EXHAUSTED' ||
        apiError?.status === 429;

      if (isQuotaError) {
        // Activate 1-hour cooldown to seamlessly serve curated archive without further external calls
        rateLimitCooldownUntil = Date.now() + 60 * 60 * 1000;
      }

      // Graceful fallback to verified curated fact
      const fallbackFact = CURATED_FACTS[Math.floor(Math.random() * CURATED_FACTS.length)];
      return res.json({
        ...fallbackFact,
        groundedWithGoogleSearch: false,
        sourceType: 'curated-archive',
        note: 'Hệ thống chuyển sang kho tư liệu di sản chuẩn bị sẵn.'
      });
    }
  });

  // API: AI Style Suggestion based on outfit, gender, weather, and occasion
  app.post('/api/ai-style-suggestion', async (req: Request, res: Response) => {
    const {
      outfitId = 'ao-dai',
      gender = 'female',
      preparationContext,
      occasionId = 'festival',
      currentColorId = 'cream',
      currentAccessories = []
    } = req.body || {};

    const outfitNames: Record<string, string> = {
      'ao-dai': 'Áo Dài',
      'ao-ngu-than': 'Áo Ngũ Thân',
      'ao-nhat-binh': 'Áo Nhật Bình',
      'ao-tac': 'Áo Tấc',
      'ao-ba-ba': 'Áo Bà Ba',
      'ao-tu-than': 'Áo Tứ Thân',
      'ao-tay-chen': 'Áo Tay Chẽn',
      'giao-linh': 'Áo Giao Lĩnh',
      'vien-linh': 'Áo Viên Lĩnh',
      'doi-kham': 'Áo Đối Khâm'
    };

    const occasionNames: Record<string, string> = {
      tet: 'Tết Nguyên Đán',
      wedding: 'Hôn Lễ / Đám Cưới',
      festival: 'Lễ Hội Truyền Thống',
      school: 'Trường Học / Giảng Đường',
      work: 'Công Sở / Văn Phòng',
      photoshoot: 'Chụp Ảnh Ngoại Cảnh / Lookbook',
      'cultural-event': 'Sự Kiện Di Sản / Ngoại Giao',
      travel: 'Du Lịch / Khám Phá',
      casual: 'Dạo Phố / Cà Phê Cuối Tuần',
      other: 'Gặp Gỡ Thường Nhật'
    };

    const outfitName = outfitNames[outfitId] || 'Việt phục';
    const occasionName = occasionNames[occasionId] || 'Sự kiện';
    const weather = preparationContext?.weather;
    const temp = weather?.temp ?? 24;
    const condition = weather?.condition ?? 'Trời mát mẻ';
    const locationName = preparationContext?.locationName ?? 'Việt Nam';
    const dateString = preparationContext?.dateString ?? 'Hôm nay';
    const timeOfDay =
      preparationContext?.timeOfDay === 'evening'
        ? 'Buổi Tối'
        : preparationContext?.timeOfDay === 'afternoon'
        ? 'Buổi Chiều'
        : 'Buổi Sáng';
    const rainProb = weather?.rainProbability ?? 20;

    // Helper to generate cultural and climate-adapted recommendation
    const generateFallbackSuggestion = () => {
      const isCold = temp <= 20;
      const isHot = temp >= 28;
      const isRainy = rainProb >= 50;

      let suggestedColorId = 'cream';
      let suggestedColorName = 'Kem Ngà / Lụa Mộc';
      let colorRationale = '';

      if (occasionId === 'tet') {
        suggestedColorId = isCold ? 'burgundy' : 'red';
        suggestedColorName = isCold ? 'Đỏ Rượu Quý Phái' : 'Đỏ Son Truyền Thống';
        colorRationale = `Dịp Tết Nguyên Đán với khí trời ${temp}°C: Sắc ${suggestedColorName} mang lại vượng khí và may mắn sum vầy đầu xuân, đồng thời tạo cảm giác ấm áp và nổi bật khi du xuân chúc Tết.`;
      } else if (occasionId === 'wedding') {
        suggestedColorId = gender === 'female' ? 'red' : 'blue';
        suggestedColorName = gender === 'female' ? 'Đỏ Son Truyền Thống' : 'Xanh Chàm / Lam Cổ';
        colorRationale = `Hôn lễ trang trọng: Tone màu ${suggestedColorName} tôn vinh không khí hỷ sự tao nhã, chuẩn mực lễ nghi truyền thống và tôn trọng gia tiên.`;
      } else if (occasionId === 'school' || occasionId === 'work') {
        suggestedColorId = isHot ? 'pastel' : 'cream';
        suggestedColorName = isHot ? 'Hồng Phấn / Xanh Khói' : 'Kem Ngà / Lụa Mộc';
        colorRationale = `Không gian học đường và công sở: Gam màu ${suggestedColorName} thanh khiết, nền nã, mang lại cảm giác dễ chịu, nhã nhặn mà vẫn tràn đầy khí chất trí thức.`;
      } else if (occasionId === 'photoshoot') {
        suggestedColorId = isCold ? 'yellow' : 'blue';
        suggestedColorName = isCold ? 'Vàng Hoàng Thổ' : 'Xanh Chàm / Lam Cổ';
        colorRationale = `Chụp ảnh ngoại cảnh tại ${locationName}: Màu ${suggestedColorName} có độ tương phản tự nhiên tuyệt đẹp với các công trình kiến trúc cổ kính, bắt sáng hài hòa trong khung hình.`;
      } else {
        suggestedColorId = isCold ? 'burgundy' : isHot ? 'cream' : 'blue';
        suggestedColorName = isCold ? 'Đỏ Rượu Quý Phái' : isHot ? 'Kem Ngà / Lụa Mộc' : 'Xanh Chàm / Lam Cổ';
        colorRationale = `Thời tiết ${temp}°C (${condition}) tại ${locationName}: Sắc ${suggestedColorName} tạo sự cân bằng nhiệt cảm, vừa thanh lịch vừa tôn vinh trọn vẹn phom dáng của ${outfitName}.`;
      }

      const suggestedAccessories: string[] = [];
      if (outfitId === 'ao-tu-than') {
        suggestedAccessories.push('non-quai-thao', 'vong-kieng-bac');
      } else if (outfitId === 'ao-ba-ba') {
        suggestedAccessories.push(gender === 'male' ? 'khan-ran' : 'vong-kieng-bac', 'sandal-day-manh');
      } else if (outfitId === 'ao-nhat-binh' || outfitId === 'ao-tac') {
        suggestedAccessories.push('khan-dong', gender === 'female' ? 'chuoi-ngoc-trai' : 'vong-kieng-bac');
      } else {
        // Ao Dai / Ngu Than
        if (gender === 'male') {
          suggestedAccessories.push('khan-dong', 'sandal-day-manh');
        } else {
          suggestedAccessories.push('vong-kieng-bac', 'sandal-day-manh');
        }
      }

      if (isRainy && !suggestedAccessories.includes('o-truyen-thong')) {
        suggestedAccessories.push('o-truyen-thong');
      }

      return {
        suggestedColorId,
        suggestedColorName,
        colorRationale,
        suggestedAccessories,
        accessoriesRationale: `Bộ phụ kiện được cân chỉnh tỉ mỉ theo niêm luật cổ phục: Kết hợp phụ kiện chuẩn mực với điều kiện thời tiết thực tế tại ${locationName} (${isRainy ? 'kèm ô truyền thống che mưa nhẹ' : 'tối giản thanh thoát để thoải mái di chuyển'}).`,
        overallAdvice: `Khi diện ${outfitName} vào ${timeOfDay.toLowerCase()} cho dịp ${occasionName}, hãy giữ lưng thẳng và bước đi khoan thai. Nét đẹp của Việt phục nằm ở sự dung dị, thanh tao và phong thái tự tin của người mặc.`,
        weatherAdaptationTip: isCold
          ? 'Tiết trời se lạnh: Nên mặc kèm áo lót lụa mềm bên trong để giữ ấm vùng ngực và cổ.'
          : isHot
          ? 'Thời tiết ấm nóng: Ưu tiên chất liệu tơ tằm hoặc đũi thoáng khí, phối phụ kiện gọn nhẹ.'
          : 'Thời tiết mát mẻ lý tưởng để tà áo thả bay tự nhiên trong từng bước đi.',
        culturalScore: 9.6,
        sourceType: 'curated-stylist'
      };
    };

    // If without API key or in cooldown, return curated stylist suggestion
    const isRateLimited = Date.now() < rateLimitCooldownUntil;
    if (!apiKey || isRateLimited) {
      return res.json(generateFallbackSuggestion());
    }

    try {
      const prompt = `Bạn là chuyên gia tạo mẫu di sản Việt phục kiêm stylist thời trang đương đại.
Hãy phân tích ngữ cảnh thời tiết và dịp xuất hiện sau đây để đưa ra gợi ý phối màu vải (color) và phụ kiện (accessories) phù hợp nhất cho trang phục đang chọn.

THÔNG TIN BỐI CẢNH:
- Trang phục đang chọn: ${outfitName} (ID: ${outfitId})
- Giới tính: ${gender === 'male' ? 'Nam' : 'Nữ'}
- Dịp xuất hiện: ${occasionName} (ID: ${occasionId})
- Địa phương: ${locationName}
- Ngày mặc: ${dateString} • Thời điểm: ${timeOfDay}
- Khí hậu & Thời tiết: ${temp}°C, ${condition}, khả năng mưa: ${rainProb}%
- Màu hiện tại: ${currentColorId}
- Phụ kiện hiện tại: ${currentAccessories.join(', ') || 'Chưa chọn'}

DANH SÁCH MÀU HỢP LỆ (BẮT BUỘC CHỌN 1 TRONG CÁC ID NÀY CHO suggestedColorId):
- 'cream': Kem Ngà / Lụa Mộc
- 'red': Đỏ Son Truyền Thống
- 'burgundy': Đỏ Rượu Quý Phái
- 'yellow': Vàng Mù Tạt / Hoàng Thổ
- 'blue': Xanh Chàm / Lam Cổ
- 'green': Xanh Ngọc / Diệp Lục
- 'black': Đen Mực / Thạch Mặc
- 'pastel': Hồng Phấn / Xanh Khói

DANH SÁCH PHỤ KIỆN HỢP LỆ (CHỌN TỪ 1 ĐẾN 3 ID PHÙ HỢP CHO suggestedAccessories):
- 'khan-dong': Khăn đóng lụa (cho Áo dài, Áo ngũ thân, Áo tấc, Áo nhật bình)
- 'vong-kieng-bac': Vòng kiềng bạc nguyên khối
- 'chuoi-ngoc-trai': Chuỗi ngọc trai cổ điển
- 'non-quai-thao': Nón quai thao Kinh Bắc (CHỈ DÀNH CHO Áo tứ thân)
- 'non-la': Nón lá bài thơ (che nắng khi trời nắng dạo phố)
- 'o-truyen-thong': Ô truyền thống (khuyên dùng khi trời mưa hoặc có nắng nhẹ)
- 'quat-tram': Quạt xếp gỗ trầm
- 'sandal-day-manh': Sandal quai mảnh
- 'sneakers-retro-trang': Sneakers retro trắng
- 'khan-ran': Khăn rằn Nam Bộ (CHỈ DÀNH CHO Áo bà ba)

QUY TẮC CỐT LÕI:
1. Nón quai thao không phối cùng Áo Dài, Áo Ngũ Thân hay Áo Nhật Bình.
2. Khăn đóng không đội cùng Áo Tứ Thân hay Áo Bà Ba.
3. Nếu trời mưa (${rainProb}% >= 50% hoặc thời tiết mưa), nên bổ sung 'o-truyen-thong'.
4. Đưa ra lời giải thích sâu sắc về văn hóa và khí hậu.

YÊU CẦU ĐỊNH DẠNG:
Trả về DUY NHẤT một chuỗi JSON hợp lệ không kèm markdown theo cấu trúc:
{
  "suggestedColorId": "cream | red | burgundy | blue | yellow | green | black | pastel",
  "suggestedColorName": "Tên tiếng Việt của màu",
  "colorRationale": "Giải thích vì sao màu này hài hòa với thời tiết và dịp xuất hiện",
  "suggestedAccessories": ["id1", "id2"],
  "accessoriesRationale": "Giải thích vì sao các phụ kiện này chuẩn di sản và thích ứng thời tiết",
  "overallAdvice": "Lời khuyên tổng thể từ AI Stylist về phong thái và phối đồ",
  "weatherAdaptationTip": "Mẹo ứng biến nhanh với thời tiết",
  "culturalScore": 9.5
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      let parsed = JSON.parse(responseText.trim());

      const validColors = ['cream', 'red', 'burgundy', 'blue', 'yellow', 'green', 'black', 'pastel'];
      if (!validColors.includes(parsed.suggestedColorId)) {
        parsed.suggestedColorId = 'cream';
      }

      return res.json({
        ...parsed,
        sourceType: 'gemini-ai'
      });
    } catch (apiError: any) {
      const errMsg = apiError?.message || String(apiError);
      const isQuota =
        errMsg.includes('429') ||
        errMsg.includes('RESOURCE_EXHAUSTED') ||
        errMsg.includes('quota') ||
        apiError?.status === 429;

      if (isQuota) {
        rateLimitCooldownUntil = Date.now() + 60 * 60 * 1000;
      }

      return res.json(generateFallbackSuggestion());
    }
  });

  // Setup Vite in Dev or Static Serve in Prod
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback for HTML serving
    app.use('*', async (req: Request, res: Response, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
