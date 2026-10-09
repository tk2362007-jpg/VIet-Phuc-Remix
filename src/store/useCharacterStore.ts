import { create } from 'zustand';
import { HairStyleId, HairStyleOption } from '../types';

export interface HairColorSwatch {
  id: string;
  name: string;
  shortLabel: string;
  hex: string;
  specularHex: string;
}

export const HAIRSTYLE_OPTIONS: HairStyleOption[] = [
  {
    id: 'default_long',
    name: 'Tóc Dài Suôn Mượt',
    shortLabel: 'Tóc dài suôn',
    category: 'Truyền thống',
    eraOrVibe: 'Dịu dàng · Cổ điển',
    recommendedGender: 'female',
    description:
      'Suối tóc dài đen nhánh buông xõa qua lưng, ôm nhẹ gương mặt trái xoan chuẩn nét thiếu nữ Việt.'
  },
  {
    id: 'traditional_bun',
    name: 'Tóc Búi Trâm Sen',
    shortLabel: 'Búi trâm vàng',
    category: 'Cung đình & Lễ hội',
    eraOrVibe: 'Đài các · Quý phái',
    recommendedGender: 'female',
    description:
      'Búi tóc cao gọn gàng phía sau gáy điểm xuyết trâm cài hoa sen mạ vàng, khoe trọn cổ áo lập lĩnh.'
  },
  {
    id: 'short_bob',
    name: 'Tóc Bob Ngắn Cách Tân',
    shortLabel: 'Bob hiện đại',
    category: 'Cách tân Gen Z',
    eraOrVibe: 'Năng động · Hiện đại',
    recommendedGender: 'unisex',
    description:
      'Tóc cắt ngắn ngang cằm uốn cụp tự nhiên, tạo điểm nhấn trẻ trung khi phối Áo Dài hoặc Áo Bà Ba.'
  },
  {
    id: 'braided_crown',
    name: 'Tóc Vấn Khăn Nhung',
    shortLabel: 'Tóc vấn Kinh Bắc',
    category: 'Di sản Bắc Bộ',
    eraOrVibe: 'Kinh Bắc · Cổ truyền',
    recommendedGender: 'female',
    description:
      'Tóc tết vấn vòng quanh đỉnh đầu theo lối liền chị Kinh Bắc và phụ nữ Hà Thành xưa.'
  },
  {
    id: 'half_up_flowing',
    name: 'Tóc Buộc Nửa Nơ Lụa',
    shortLabel: 'Buộc nửa thơ',
    category: 'Nàng thơ Remix',
    eraOrVibe: 'Lãng mạn · Nhẹ nhàng',
    recommendedGender: 'female',
    description:
      'Tóc buộc nửa đầu thắt dải lụa tơ tằm mềm mại, hai lọn mai buông nhẹ tôn nét thanh thoát.'
  },
  {
    id: 'scholar_parted',
    name: 'Tóc Rẽ Ngôi Nho Nhã',
    shortLabel: 'Rẽ ngôi lịch lãm',
    category: 'Nam & Unisex',
    eraOrVibe: 'Điềm đạm · Trí thức',
    recommendedGender: 'male',
    description:
      'Kiểu tóc cắt gọn rẽ ngôi 7/3 vuốt phồng tự nhiên, cực hợp với Áo Ngũ Thân Tay Chẽn và Áo Tấc.'
  }
];

export const HAIR_COLOR_SWATCHES: HairColorSwatch[] = [
  {
    id: 'jet-black',
    name: 'Đen Huyền Tơ Tằm',
    shortLabel: 'Đen huyền',
    hex: '#181311',
    specularHex: '#4A3C36'
  },
  {
    id: 'dark-espresso',
    name: 'Nâu Trà Đen Tự Nhiên',
    shortLabel: 'Nâu trà',
    hex: '#2B1D17',
    specularHex: '#634639'
  },
  {
    id: 'chestnut-silk',
    name: 'Nâu Hạt Dẻ Hiện Đại',
    shortLabel: 'Hạt dẻ',
    hex: '#462B1F',
    specularHex: '#875843'
  },
  {
    id: 'burgundy-tint',
    name: 'Đen Ánh Đỏ Trầm',
    shortLabel: 'Ánh đỏ rượu',
    hex: '#33151A',
    specularHex: '#6E2E38'
  }
];

export interface CharacterStoreState {
  hairStyle: HairStyleId;
  hairColor: string;
  idleBreathing: boolean;
  renderEngine: '3d-r3f' | '2.5d-stylized';
  setHairStyle: (style: HairStyleId) => void;
  setHairColor: (color: string) => void;
  setIdleBreathing: (enabled: boolean) => void;
  setRenderEngine: (engine: '3d-r3f' | '2.5d-stylized') => void;
  syncGenderDefaultHair: (gender: 'female' | 'male') => void;
}

export const useCharacterStore = create<CharacterStoreState>((set) => ({
  hairStyle: 'default_long',
  hairColor: '#181311',
  idleBreathing: true,
  renderEngine: '3d-r3f',
  setHairStyle: (hairStyle) => set({ hairStyle }),
  setHairColor: (hairColor) => set({ hairColor }),
  setIdleBreathing: (idleBreathing) => set({ idleBreathing }),
  setRenderEngine: (renderEngine) => set({ renderEngine }),
  syncGenderDefaultHair: (gender) =>
    set((state) => {
      // Automatically switch between default female/male hair if currently on the opposite default
      if (gender === 'male' && state.hairStyle === 'default_long') {
        return { hairStyle: 'scholar_parted' };
      }
      if (gender === 'female' && state.hairStyle === 'scholar_parted') {
        return { hairStyle: 'default_long' };
      }
      return {};
    })
}));
