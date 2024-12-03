import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Edit, Trash2, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import RestaurantForm from '../components/RestaurantForm';
import { Restaurant } from '../types';
import { useRestaurants, useAddRestaurant, useUpdateRestaurant, useDeleteRestaurant } from '../hooks/useRestaurants';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  
  const { data: restaurants = [] } = useRestaurants();
  const { addRestaurant } = useAddRestaurant();
  const { updateRestaurant } = useUpdateRestaurant();
  const { deleteRestaurant } = useDeleteRestaurant();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddRestaurant = (data: Partial<Restaurant>) => {
    addRestaurant(data);
    setIsAddingRestaurant(false);
  };

  const handleEditRestaurant = (data: Partial<Restaurant>) => {
    if (editingRestaurant) {
      updateRestaurant(editingRestaurant.id, data);
      setEditingRestaurant(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      deleteRestaurant(id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    );
  }

  if (isAddingRestaurant) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add New Restaurant</h1>
          <Button variant="outline" onClick={() => setIsAddingRestaurant(false)}>
            Cancel
          </Button>
        </div>
        <div className="rounded-lg border bg-white p-6">
          <RestaurantForm
            onSubmit={handleAddRestaurant}
            onCancel={() => setIsAddingRestaurant(false)}
          />
        </div>
      </div>
    );
  }

  if (editingRestaurant) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edit Restaurant</h1>
          <Button variant="outline" onClick={() => setEditingRestaurant(null)}>
            Cancel
          </Button>
        </div>
        <div className="rounded-lg border bg-white p-6">
          <RestaurantForm
            initialData={editingRestaurant}
            onSubmit={handleEditRestaurant}
            onCancel={() => setEditingRestaurant(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Restaurant Management</h1>
        <div className="flex gap-4">
          <Button onClick={() => setIsAddingRestaurant(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Restaurant
          </Button>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Korean Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cuisine</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price Range</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rating</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{restaurant.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{restaurant.koreanName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{restaurant.cuisine}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{restaurant.priceRange}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{restaurant.rating}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingRestaurant(restaurant)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(restaurant.id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}