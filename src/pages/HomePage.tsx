import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import Button from '../components/ui/Button';
import { useRestaurants } from '../hooks/useRestaurants';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: restaurants, isLoading } = useRestaurants({ searchQuery });

  return (
    <div>
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Discover Seoul's Hidden Culinary Gems
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          NOPO (노포) means "Heritage Eateries" in Korean - places that have preserved their traditional 
          recipes and cooking methods for generations.
        </p>
      </section>

      <div className="mb-8 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants, cuisines, or neighborhoods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants?.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}