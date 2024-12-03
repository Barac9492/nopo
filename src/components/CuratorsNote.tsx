import { useState } from 'react';
import { Edit, Save } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from '../contexts/AuthContext';

interface CuratorsNoteProps {
  restaurantId: string;
  initialNote?: string;
}

export default function CuratorsNote({ restaurantId, initialNote }: CuratorsNoteProps) {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(initialNote || '');

  const handleSave = () => {
    // Save to localStorage for demo purposes
    localStorage.setItem(`curator_note_${restaurantId}`, note);
    setIsEditing(false);
  };

  const handleEdit = () => {
    const savedNote = localStorage.getItem(`curator_note_${restaurantId}`);
    if (savedNote) {
      setNote(savedNote);
    }
    setIsEditing(true);
  };

  if (!note && !isAuthenticated) return null;

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-amber-900">Curator's Note</h3>
        {isAuthenticated && (
          <Button
            variant="outline"
            size="sm"
            onClick={isEditing ? handleSave : handleEdit}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Save Note
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit Note
              </>
            )}
          </Button>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-md border border-amber-200 bg-white p-2 text-amber-900"
          rows={4}
          placeholder="Add your curator's note here..."
        />
      ) : (
        <p className="whitespace-pre-wrap text-amber-900">{note}</p>
      )}
    </div>
  );
}