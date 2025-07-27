import React, { useRef, useEffect, useState } from 'react';
import Celebration from './Celebration.tsx';

interface PrincessAvatarProps {
  message: string;
  isLoading: boolean;
  showCelebration: boolean;
  onCelebrationComplete: () => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
);

const PrincessAvatar: React.FC<PrincessAvatarProps> = ({ message, isLoading, showCelebration, onCelebrationComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);

  useEffect(() => {
    let isActive = true;
    const loadImage = async () => {
      try {
        const response = await fetch('components/princess_v2.png');
        if (!response.ok) {
          throw new Error('Failed to fetch princess image');
        }
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);
        if (isActive) {
          setBitmap(imageBitmap);
        }
      } catch (error) {
        console.error("Error loading princess avatar:", error);
      }
    };
    loadImage();

    return () => {
      isActive = false;
      bitmap?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!bitmap || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    if (!ctx || !parent) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        // Handle high-DPI displays for crisp images
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        // Create a circular clipping path for the 'rounded-full' effect
        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        // Add a white background inside the clipped circle
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        // Replicate `object-cover` behavior
        const canvasRatio = width / height;
        const bitmapRatio = bitmap.width / bitmap.height;
        let sx = 0, sy = 0, sWidth = bitmap.width, sHeight = bitmap.height;

        if (bitmapRatio > canvasRatio) { // Bitmap is wider than canvas, crop sides
          sWidth = bitmap.height * canvasRatio;
          sx = (bitmap.width - sWidth) / 2;
        } else { // Bitmap is taller than canvas, crop top/bottom
          sHeight = bitmap.width / canvasRatio;
          sy = (bitmap.height - sHeight) / 2;
        }

        ctx.drawImage(bitmap, sx, sy, sWidth, sHeight, 0, 0, width, height);

        ctx.restore(); // remove clipping path
      }
    });

    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
  }, [bitmap]);

  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
      <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="A charming princess with brown hair and a flower crown."
          // The border and shadow are applied to the canvas element itself
          className="w-full h-full rounded-full border-4 border-white shadow-lg"
        />
        {showCelebration && <Celebration onComplete={onCelebrationComplete} />}
      </div>
      <div className="relative bg-white rounded-2xl p-4 shadow-lg min-h-[80px] w-full border-2 border-pink-200">
        <div className="text-gray-700 text-lg md:text-xl text-center flex items-center justify-center h-full">
            {isLoading ? <TypingIndicator /> : message}
        </div>
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-b-2 border-l-2 border-pink-200 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default PrincessAvatar;