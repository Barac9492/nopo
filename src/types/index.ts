export interface Restaurant {
  id: string;
  name: string;
  koreanName: string;
  description: string;
  cuisine: string;
  priceRange: 'budget' | 'moderate' | 'expensive';
  neighborhood: string;
  address: string;
  googleMapsUrl: string;
  rating: number;
  images: string[];
  instagramEmbeds: string[];
  openingHours: {
    [key: string]: string;
  };
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export const NEIGHBORHOODS = [
  { id: 'hongdae', name: 'Hongdae', koreanName: '홍대' },
  { id: 'gangnam', name: 'Gangnam', koreanName: '강남' },
  { id: 'insadong', name: 'Insadong', koreanName: '인사동' },
  { id: 'itaewon', name: 'Itaewon', koreanName: '이태원' },
  { id: 'myeongdong', name: 'Myeongdong', koreanName: '명동' },
  { id: 'gwangjang', name: 'Gwangjang Market', koreanName: '광장시장' },
  { id: 'dongdaemun', name: 'Dongdaemun', koreanName: '동대문' },
  { id: 'jongno', name: 'Jongno', koreanName: '종로' },
  { id: 'seongsu', name: 'Seongsu-dong', koreanName: '성수동' }
];