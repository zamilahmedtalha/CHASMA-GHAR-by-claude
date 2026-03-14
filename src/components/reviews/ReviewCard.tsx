import React from 'react';
import { GlassSurface } from '../ui/GlassSurface';
import { Star } from 'lucide-react';

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <GlassSurface className="p-6 flex flex-col gap-4" borderRadius={24} opacity={0.90}>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < review.rating ? "fill-[--color-accent-warm] text-[--color-accent-warm]" : "text-gray-300"} 
            />
          ))}
        </div>
        <span className="text-label text-[--color-text-muted]">
          {new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>
      <p className="text-body text-[--color-text-primary] leading-relaxed flex-grow">"{review.text}"</p>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-label text-[--color-text-primary]">
          {review.name.charAt(0)}
        </div>
        <span className="text-label text-[--color-text-primary]">{review.name}</span>
      </div>
    </GlassSurface>
  );
};
