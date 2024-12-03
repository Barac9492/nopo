import { useState } from 'react';
import { Star } from 'lucide-react';
import Button from './ui/Button';
import { Comment } from '../types';

interface CommentSectionProps {
  restaurantId: string;
  comments: Comment[];
}

export default function CommentSection({ restaurantId, comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission
    setNewComment('');
    setRating(5);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reviews</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="comment" className="mb-2 block text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Share your experience..."
          />
        </div>
        
        <Button type="submit">Post Review</Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-lg border bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.userName}`}
                  alt={comment.userName}
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-medium">{comment.userName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{comment.rating}</span>
              </div>
            </div>
            <p className="text-gray-600">{comment.content}</p>
            <time className="mt-2 block text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}