import { Restaurant, NEIGHBORHOODS } from '../types';
import { Star, MapPin, Clock, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const isNew = () => {
    const createdDate = new Date(restaurant.createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Show NEW badge for 7 days
  };

  const neighborhood = NEIGHBORHOODS.find(n => n.id === restaurant.neighborhood);

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="group">
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {restaurant.images?.[0] && (
            <img
              src={restaurant.images[0]}
              alt={restaurant.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          )}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{restaurant.rating.toFixed(1)}</span>
          </div>
          {isNew() && (
            <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              NEW
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
            <p className="text-sm text-gray-600">{restaurant.koreanName}</p>
          </div>
          
          <div className="mb-2 space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                window.open(restaurant.googleMapsUrl, '_blank');
              }}
              className="w-full gap-2"
            >
              <MapPin className="h-4 w-4" />
              <span className="truncate">{neighborhood?.name || restaurant.neighborhood}</span>
            </Button>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-2">
              <div className="mb-1 flex items-center gap-1 text-xs font-medium text-yellow-800">
                <Car className="h-3 w-3" />
                Show to cab driver!
              </div>
              <p className="text-sm font-medium text-yellow-900">{restaurant.address}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{restaurant.openingHours['Mon']}</span>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{restaurant.cuisine}</span>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              {restaurant.priceRange}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}