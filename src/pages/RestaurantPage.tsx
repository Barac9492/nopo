import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Share2, Car } from 'lucide-react';
import Button from '../components/ui/Button';
import InstagramEmbed from '../components/InstagramEmbed';
import CommentSection from '../components/CommentSection';
import CuratorsNote from '../components/CuratorsNote';
import { useRestaurant } from '../hooks/useRestaurants';
import { NEIGHBORHOODS } from '../types';

export default function RestaurantPage() {
  const { id } = useParams();
  const { data: restaurant, isLoading } = useRestaurant(id || '');

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-600">Loading restaurant details...</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-600">Restaurant not found</div>
      </div>
    );
  }

  const neighborhood = NEIGHBORHOODS.find(n => n.id === restaurant.neighborhood);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Hero Image */}
        <div 
          className="relative h-[500px] overflow-hidden rounded-xl bg-gray-100"
          style={{
            backgroundImage: `url(${restaurant.images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="mb-2 text-5xl font-bold">{restaurant.name}</h1>
            <p className="text-2xl">{restaurant.koreanName}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Rating and Share */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-yellow-400" />
                <span className="text-3xl font-bold">{restaurant.rating}</span>
              </div>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>

            {/* Location and Hours */}
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => window.open(restaurant.googleMapsUrl, '_blank')}
                className="w-full gap-2 text-lg"
              >
                <MapPin className="h-5 w-5" />
                <span>View on Google Maps</span>
              </Button>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="mb-2 flex items-center gap-1 text-sm font-medium text-yellow-800">
                  <Car className="h-4 w-4" />
                  Show to cab driver!
                </div>
                <p className="text-lg font-medium text-yellow-900">{restaurant.address}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="text-lg">{restaurant.openingHours.Mon}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">About</h2>
              <p className="text-lg leading-relaxed text-gray-600">{restaurant.description}</p>
            </div>

            {/* Instagram Posts */}
            {restaurant.instagramEmbeds?.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Instagram Posts</h2>
                <div className="space-y-6">
                  {restaurant.instagramEmbeds.map((embed, index) => (
                    <div key={index} className="space-y-4">
                      <InstagramEmbed embedCode={embed} />
                      <CuratorsNote 
                        restaurantId={`${restaurant.id}_post_${index}`}
                        initialNote="This post showcases the authentic atmosphere and delicious dishes that make this place special."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <CommentSection 
              restaurantId={restaurant.id} 
              comments={[]}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map */}
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">Location</h2>
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <div className="flex h-full items-center justify-center text-gray-400">
                  Map preview unavailable
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                {neighborhood?.name}, Seoul
              </div>
            </div>

            {/* Additional Images */}
            {restaurant.images && restaurant.images.length > 1 && (
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-bold">More Photos</h2>
                <div className="grid gap-4">
                  {restaurant.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${restaurant.name} - Photo ${index + 2}`}
                      className="rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}