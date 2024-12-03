import { useEffect, useRef, useState } from 'react';

interface TikTokEmbedProps {
  embedCode: string;
}

export default function TikTokEmbed({ embedCode }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const loadTikTokEmbed = async () => {
      if (!containerRef.current || !embedCode) {
        setError('Invalid embed configuration');
        return;
      }

      try {
        // Clean up previous content
        containerRef.current.innerHTML = '';

        // Extract video ID from the embed code
        const videoIdMatch = embedCode.match(/data-video-id="([^"]+)"/);
        if (!videoIdMatch) {
          throw new Error('Invalid TikTok embed code');
        }

        const videoId = videoIdMatch[1];
        
        // Create the blockquote element
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'tiktok-embed';
        blockquote.setAttribute('cite', `https://www.tiktok.com/video/${videoId}`);
        blockquote.setAttribute('data-video-id', videoId);
        blockquote.style.maxWidth = '605px';
        blockquote.style.minWidth = '325px';

        // Add section element required by TikTok
        const section = document.createElement('section');
        blockquote.appendChild(section);

        // Add to container
        containerRef.current.appendChild(blockquote);

        // Load TikTok embed script
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;

        // Handle script load success
        script.onload = () => {
          if (isMounted) {
            setIsLoading(false);
            if (window.TikTok) {
              window.TikTok.reload();
            }
          }
        };

        // Handle script load error
        script.onerror = () => {
          if (isMounted) {
            setError('Failed to load TikTok embed script');
            setIsLoading(false);
          }
        };

        document.body.appendChild(script);

        return () => {
          script.remove();
        };
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load TikTok video');
          setIsLoading(false);
        }
      }
    };

    loadTikTokEmbed();

    return () => {
      isMounted = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [embedCode]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="tiktok-embed-container min-h-[600px] w-full overflow-hidden rounded-lg bg-gray-50"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
            <p className="text-sm text-gray-600">Loading TikTok video...</p>
          </div>
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    TikTok?: {
      reload: () => void;
    };
  }
}