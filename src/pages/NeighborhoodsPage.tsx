import { MapPin } from 'lucide-react';

const NEIGHBORHOODS = [
  {
    id: 'hongdae',
    name: 'Hongdae',
    koreanName: '홍대',
    image: 'https://images.unsplash.com/photo-1585129819171-80b02d4c85b0?q=80&w=1920',
    restaurantCount: 42,
  },
  {
    id: 'gangnam',
    name: 'Gangnam',
    koreanName: '강남',
    image: 'https://images.unsplash.com/photo-1617541086271-4d43983704bd?q=80&w=1920',
    restaurantCount: 56,
  },
  {
    id: 'insadong',
    name: 'Insadong',
    koreanName: '인사동',
    image: 'https://images.unsplash.com/photo-1585813271600-d3cf4a6b5b4c?q=80&w=1920',
    restaurantCount: 38,
  },
];

export default function NeighborhoodsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <MapPin className="h-8 w-8 text-indigo-500" />
          <h1 className="text-3xl font-bold">Explore by Neighborhood</h1>
        </div>
        <p className="mt-2 text-gray-600">
          Discover heritage restaurants in Seoul's most iconic neighborhoods
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {NEIGHBORHOODS.map((neighborhood) => (
          <div
            key={neighborhood.id}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="aspect-[4/3]">
              <img
                src={neighborhood.image}
                alt={neighborhood.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold">{neighborhood.name}</h2>
              <p className="mb-2 text-lg">{neighborhood.koreanName}</p>
              <p className="text-sm">
                {neighborhood.restaurantCount} heritage restaurants
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}