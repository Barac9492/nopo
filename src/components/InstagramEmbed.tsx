import { useEffect, useRef } from 'react';

interface InstagramEmbedProps {
  embedCode: string;
}

export default function InstagramEmbed({ embedCode }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only proceed if we have a container and embed code
    if (!containerRef.current || !embedCode) return;

    // Insert the embed code
    containerRef.current.innerHTML = embedCode;

    // Load Instagram embed script if not already loaded
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://www.instagram.com/embed.js';
      document.body.appendChild(script);
    }

    // Process embeds when script is loaded
    const processEmbeds = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        setTimeout(processEmbeds, 100);
      }
    };

    processEmbeds();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [embedCode]);

  return (
    <div 
      ref={containerRef}
      className="instagram-embed-container w-full overflow-hidden rounded-lg bg-white"
    />
  );
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}