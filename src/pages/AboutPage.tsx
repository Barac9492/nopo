import React, { useState } from 'react';
import { Utensils, Edit, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const DEFAULT_CONTENT = {
  title: "About NOPO",
  subtitle: "Discover Korea's Hidden Heritage",
  intro: "Welcome to NOPO, your guide to Korea's heritage eateries and timeless establishments. The name \"NOPO\" represents more than just restaurants—it's about the culinary heart of Korea, the places where tradition, history, and authenticity come together to create unforgettable experiences.",
  story: [
    "As a Korean who has spent years living abroad, I've seen firsthand the challenges my foreign friends face when visiting Korea. Despite the incredible depth of Korea's culinary culture, many visitors are limited to mainstream, tourist-heavy spots. The true essence of Korean dining—the humble noodle shop run by three generations, the tiny BBQ joint tucked away in an alley, or the bustling food market stall that's been serving the same recipe for decades—often goes unnoticed.",
    "That's why I created NOPO. This is more than a directory—it's a bridge to the real Korea. Here, you'll find curated recommendations for places where locals eat, where history is served on every plate, and where you'll feel the soul of Korea in every bite.",
    "Through NOPO, I hope to give visitors a richer, more authentic taste of Korea, connecting them to the hidden gems that truly define the country's culinary landscape. Whether you're a foodie, an adventurer, or simply someone looking for an unforgettable meal, NOPO is your passport to the flavors and stories that make Korea so special."
  ],
  cta: "Discover the real Korea."
};

export default function AboutPage() {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(DEFAULT_CONTENT);

  const handleSave = () => {
    localStorage.setItem('nopo_about_content', JSON.stringify(content));
    setIsEditing(false);
  };

  const handleEdit = () => {
    const savedContent = localStorage.getItem('nopo_about_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
    setIsEditing(true);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=2070"
          alt="Korean Bibimbap"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Utensils className="h-12 w-12" />
              <h1 className="text-6xl font-bold">NOPO</h1>
            </div>
            <p className="text-xl font-light">노포 - Heritage Eateries</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-4xl space-y-24 px-4">
        {/* Admin Edit Button */}
        {isAuthenticated && (
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={isEditing ? handleSave : handleEdit}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Content
                </>
              )}
            </Button>
          </div>
        )}

        {/* Introduction */}
        <section className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
          <div className="relative z-10">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  className="w-full rounded-md border p-2 text-3xl font-bold"
                />
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                  className="w-full rounded-md border p-2 text-xl"
                />
                <textarea
                  value={content.intro}
                  onChange={(e) => setContent({ ...content, intro: e.target.value })}
                  className="w-full rounded-md border p-2"
                  rows={4}
                />
              </div>
            ) : (
              <>
                <h2 className="mb-6 text-3xl font-bold text-gray-900">{content.title}</h2>
                <h3 className="mb-4 text-xl font-semibold text-gray-800">{content.subtitle}</h3>
                <p className="text-lg leading-relaxed text-gray-700">{content.intro}</p>
              </>
            )}
          </div>
        </section>

        {/* Personal Story */}
        <section className="relative">
          <div className="space-y-6">
            {content.story.map((paragraph, index) => (
              <div key={index}>
                {isEditing ? (
                  <textarea
                    value={paragraph}
                    onChange={(e) => {
                      const newStory = [...content.story];
                      newStory[index] = e.target.value;
                      setContent({ ...content, story: newStory });
                    }}
                    className="w-full rounded-md border p-2"
                    rows={6}
                  />
                ) : (
                  <p className="text-lg leading-relaxed text-gray-700">{paragraph}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">Explore NOPO</h2>
          {isEditing ? (
            <input
              type="text"
              value={content.cta}
              onChange={(e) => setContent({ ...content, cta: e.target.value })}
              className="w-full rounded-md border p-2 text-center text-xl"
            />
          ) : (
            <p className="text-xl text-gray-600">{content.cta}</p>
          )}
        </section>
      </div>
    </div>
  );
}