import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RESTAURANTS } from '../data/restaurants';
import { Restaurant } from '../types';

interface UseRestaurantsOptions {
  searchQuery?: string;
  cuisine?: string;
  priceRange?: Restaurant['priceRange'];
}

// Helper function to get restaurants from localStorage or default data
function getStoredRestaurants(): Restaurant[] {
  const stored = localStorage.getItem('nopo_restaurants');
  return stored ? JSON.parse(stored) : RESTAURANTS;
}

// Helper function to save restaurants to localStorage
function saveRestaurants(restaurants: Restaurant[]) {
  localStorage.setItem('nopo_restaurants', JSON.stringify(restaurants));
}

export function useRestaurants(options: UseRestaurantsOptions = {}) {
  const { searchQuery, cuisine, priceRange } = options;

  return useQuery({
    queryKey: ['restaurants', searchQuery, cuisine, priceRange],
    queryFn: () => {
      let filteredRestaurants = getStoredRestaurants();

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredRestaurants = filteredRestaurants.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(query) ||
            restaurant.koreanName.toLowerCase().includes(query) ||
            restaurant.description.toLowerCase().includes(query)
        );
      }

      if (cuisine) {
        filteredRestaurants = filteredRestaurants.filter(
          (restaurant) => restaurant.cuisine === cuisine
        );
      }

      if (priceRange) {
        filteredRestaurants = filteredRestaurants.filter(
          (restaurant) => restaurant.priceRange === priceRange
        );
      }

      return filteredRestaurants;
    },
  });
}

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getStoredRestaurants().find((restaurant) => restaurant.id === id),
  });
}

export function useAddRestaurant() {
  const queryClient = useQueryClient();

  return {
    addRestaurant: (newRestaurant: Partial<Restaurant>) => {
      const restaurants = getStoredRestaurants();
      const restaurantToAdd = {
        ...newRestaurant,
        id: (restaurants.length + 1).toString(),
        createdAt: new Date().toISOString(),
      } as Restaurant;

      const updatedRestaurants = [...restaurants, restaurantToAdd];
      saveRestaurants(updatedRestaurants);
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      return restaurantToAdd;
    },
  };
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();

  return {
    updateRestaurant: (id: string, data: Partial<Restaurant>) => {
      const restaurants = getStoredRestaurants();
      const updatedRestaurants = restaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, ...data } : restaurant
      );
      saveRestaurants(updatedRestaurants);
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurant', id] });
    },
  };
}

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return {
    deleteRestaurant: (id: string) => {
      const restaurants = getStoredRestaurants();
      const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
      saveRestaurants(updatedRestaurants);
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  };
}