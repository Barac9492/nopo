import { Restaurant } from '../types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Family Bossam',
    koreanName: '패밀리 보쌈',
    description: 'Steamed pork with delicious Kimchi, serving authentic Korean cuisine for over 30 years. Our signature bossam is prepared using a traditional family recipe passed down through generations.',
    cuisine: 'Korean',
    priceRange: 'moderate',
    neighborhood: 'seongsu',
    address: '서울특별시 성동구 왕십리로 134',
    googleMapsUrl: 'https://goo.gl/maps/example',
    rating: 5,
    images: [
      'https://i.ibb.co/Qp1SXBk/bibimbap.png',
      'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=1200&q=80'
    ],
    instagramEmbeds: [
      '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/CxKX2-pSRD5/" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>'
    ],
    openingHours: {
      Mon: '11:00 AM - 10:00 PM',
      Tue: '11:00 AM - 10:00 PM',
      Wed: '11:00 AM - 10:00 PM',
      Thu: '11:00 AM - 10:00 PM',
      Fri: '11:00 AM - 11:00 PM',
      Sat: '11:00 AM - 11:00 PM',
      Sun: '12:00 PM - 9:00 PM'
    },
    createdAt: '2024-03-15T00:00:00Z'
  }
];