import { useState } from 'react';
import { Plus, X, MapPin, Car } from 'lucide-react';
import Button from './ui/Button';
import { Restaurant, NEIGHBORHOODS } from '../types';

interface RestaurantFormProps {
  initialData?: Partial<Restaurant>;
  onSubmit: (data: Partial<Restaurant>) => void;
  onCancel: () => void;
}

export default function RestaurantForm({ initialData, onSubmit, onCancel }: RestaurantFormProps) {
  const [formData, setFormData] = useState<Partial<Restaurant>>(initialData || {
    name: '',
    koreanName: '',
    description: '',
    cuisine: '',
    priceRange: 'moderate',
    neighborhood: '',
    address: '',
    googleMapsUrl: '',
    rating: 0,
    images: [''],
    instagramEmbeds: [''],
    openingHours: {
      Mon: '',
      Tue: '',
      Wed: '',
      Thu: '',
      Fri: '',
      Sat: '',
      Sun: '',
    },
    createdAt: new Date().toISOString(),
  });

  const handleChange = (field: keyof Restaurant, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addInstagramEmbed = () => {
    setFormData((prev) => ({
      ...prev,
      instagramEmbeds: [...(prev.instagramEmbeds || []), ''],
    }));
  };

  const removeInstagramEmbed = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instagramEmbeds: prev.instagramEmbeds?.filter((_, i) => i !== index),
    }));
  };

  const updateInstagramEmbed = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instagramEmbeds: prev.instagramEmbeds?.map((embed, i) =>
        i === index ? value : embed
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      createdAt: formData.createdAt || new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name (English)</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name (Korean)</label>
          <input
            type="text"
            value={formData.koreanName}
            onChange={(e) => handleChange('koreanName', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cuisine</label>
          <input
            type="text"
            value={formData.cuisine}
            onChange={(e) => handleChange('cuisine', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <select
            value={formData.priceRange}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="budget">Budget</option>
            <option value="moderate">Moderate</option>
            <option value="expensive">Expensive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Neighborhood</label>
          <select
            value={formData.neighborhood}
            onChange={(e) => handleChange('neighborhood', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Select a neighborhood</option>
            {NEIGHBORHOODS.map((neighborhood) => (
              <option key={neighborhood.id} value={neighborhood.id}>
                {neighborhood.name} ({neighborhood.koreanName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            Address (Korean)
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
              <Car className="h-3 w-3" />
              Show to cab driver!
            </span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
            placeholder="서울특별시 종로구 광장시장 88"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Google Maps URL
          </label>
          <div className="mt-1 flex gap-2">
            <input
              type="url"
              value={formData.googleMapsUrl}
              onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              required
              placeholder="https://maps.google.com/..."
            />
            {formData.googleMapsUrl && (
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(formData.googleMapsUrl, '_blank')}
                className="gap-2"
              >
                <MapPin className="h-4 w-4" />
                Preview
              </Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={formData.images?.[0]}
          onChange={(e) => handleChange('images', [e.target.value])}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Instagram Posts
            <span className="ml-2 text-sm text-gray-500">
              (Click Share → Embed → Copy code)
            </span>
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addInstagramEmbed}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Post
          </Button>
        </div>
        <div className="space-y-2">
          {formData.instagramEmbeds?.map((embed, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                value={embed}
                onChange={(e) => updateInstagramEmbed(index, e.target.value)}
                placeholder="Paste Instagram embed code here..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                rows={3}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeInstagramEmbed(index)}
                className="text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {Object.keys(formData.openingHours || {}).map((day) => (
          <div key={day}>
            <label className="block text-sm font-medium text-gray-700">{day}</label>
            <input
              type="text"
              value={formData.openingHours?.[day]}
              onChange={(e) =>
                handleChange('openingHours', {
                  ...(formData.openingHours || {}),
                  [day]: e.target.value,
                })
              }
              placeholder="9 AM - 5 PM"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Restaurant</Button>
      </div>
    </form>
  );
}