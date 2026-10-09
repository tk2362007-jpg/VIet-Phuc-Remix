export const FEMALE_HAIRSTYLES = [
  {
    id: "long",
    name: "Tóc dài",
    image: "/hair/female/female-hair-long.png",
    available: true,
    subtitle: "Suôn mượt tự nhiên",
    description:
      "Tóc đen tự nhiên dài mềm mại, rẽ ngôi 6:4 thanh thoát ôm nhẹ thái dương, tôn trọn cổ áo dài và nét trẻ trung Gen Z."
  },
  {
    id: "bun",
    name: "Tóc búi",
    image: "/hair/female/female-hair-bun.png",
    available: true,
    subtitle: "Búi gọn thanh lịch",
    description:
      "Tóc đen búi gọn hiện đại phía sau đầu, lọn tóc mai mềm mại ôm nhẹ hai bên mặt, khoe trọn phần cổ cao duyên dáng của áo dài."
  },
  {
    id: "braid",
    name: "Tóc tết",
    image: "/hair/female/female-hair-braid.png",
    available: true,
    subtitle: "Tết thấp dịu dàng",
    description:
      "Tóc đen tết bím thấp gọn gàng buông nhẹ qua vai, điểm xuyết lọn tóc mai tự nhiên mang nét thanh lịch, nữ tính chuẩn Gen Z Việt."
  },
  {
    id: "short",
    name: "Tóc ngắn",
    image: "/hair/female/female-hair-short.png",
    available: true,
    subtitle: "Bob hiện đại",
    description:
      "Tóc ngắn bob ngang cằm uốn cụp chữ C mềm mại ôm nhẹ đường nét khuôn mặt, trẻ trung năng động mà vẫn dịu dàng khi diện áo dài."
  }
];

export const DEFAULT_FEMALE_HAIRSTYLE = "long";

export function getFemaleHairstyleById(id) {
  return (
    FEMALE_HAIRSTYLES.find((item) => item.id === id && item.available) ||
    FEMALE_HAIRSTYLES[0]
  );
}

export const MALE_HAIRSTYLES = [
  {
    id: "male-short",
    name: "Tóc ngắn truyền thống",
    image: "",
    available: true,
    subtitle: "Gọn gàng chuẩn mực",
    description:
      "Tóc ngắn truyền thống cắt tỉa gọn gàng, ôm sát thái dương và gáy thanh lịch, tôn vẻ nam tính đĩnh đạc khi diện áo dài nam."
  },
  {
    id: "male-bun",
    name: "Tóc búi cao cổ trang",
    image: "",
    available: true,
    subtitle: "Phong cách cổ trang Việt",
    description:
      "Tóc búi củ hành cao trên đỉnh đầu cố định bằng mão quyển và trâm gỗ mộc, tái hiện khí chất nho sĩ, vương tôn cổ trang Việt Nam."
  },
  {
    id: "male-ponytail",
    name: "Tóc dài buộc sau",
    image: "",
    available: true,
    subtitle: "Lãng tử hào hiệp",
    description:
      "Mái tóc đen dài vuốt gọn ra sau gáy buộc bằng dải lụa mộc, buông suôn mượt sau lưng mang phong thái văn võ song toàn."
  },
  {
    id: "male-parted",
    name: "Tóc rẽ ngôi cổ điển",
    image: "",
    available: true,
    subtitle: "Nho nhã lịch lãm",
    description:
      "Kiểu tóc rẽ ngôi 7/3 cổ điển vuốt phồng nhẹ tự nhiên, gọn gàng hai bên mai, chuẩn mực trí thức Việt Nam."
  },
  {
    id: "male-half-up",
    name: "Tóc buộc nửa đầu",
    image: "",
    available: true,
    subtitle: "Thư sinh phong nhã",
    description:
      "Tóc dài buộc nửa đầu phía sau bằng dây lụa, phần tóc dưới buông tự nhiên qua vai, hài hòa nét cổ phong và đương đại."
  }
];

export const DEFAULT_MALE_HAIRSTYLE = "male-short";

export function getMaleHairstyleById(id) {
  return (
    MALE_HAIRSTYLES.find((item) => item.id === id && item.available) ||
    MALE_HAIRSTYLES[0]
  );
}

