import { Flame } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';

const SAMPLE_RESTAURANT = {
  id: '1',
  name: 'Gwangjang Market Yukhoe',
  koreanName: '광장시장 육회',
  description: 'Famous for its fresh raw beef tartare and traditional market atmosphere',
  cuisine: 'Korean',
  priceRange: 'moderate' as const,
  address: '88 Changgyeonggung-ro, Jongno-gu, Seoul',
  coordinates: { lat: 37.5704, lng: 126.9922 },
  rating: 4.8,
  images: [
    'https://images.unsplash.com/photo-1605621910929-8c47c4161e9a?q=80&w=1920',
  ],
  tiktokVideos: ['video1'],
  openingHours: {
    Mon: '9:00 AM - 10:00 PM',
  },
};

export default function TrendingPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Flame className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold">Trending Now</h1>
        </div>
        <p className="mt-2 text-gray-600">
          Discover the most popular heritage restaurants in Seoul this week
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <RestaurantCard key={i} restaurant={SAMPLE_RESTAURANT} />
        ))}
      </div>
    </div>
  );
}