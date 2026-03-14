import React, { useEffect, useState } from 'react';
import { SplitText } from '../components/ui/SplitText';
import { ScrollFloat } from '../components/ui/ScrollFloat';
import { GlassSurface } from '../components/ui/GlassSurface';
import { ReviewCard, Review } from '../components/reviews/ReviewCard';
import { ReviewForm } from '../components/reviews/ReviewForm';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (reviewData: any) => {
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      fetchReviews();
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="mb-16 text-center">
        <h1 className="text-display-xl text-[--color-text-primary] mb-6">
          <SplitText text="Stories From Our Community" tag="h1" />
        </h1>
        <ScrollFloat yOffset={20} delay={0.2}>
          <p className="text-body text-[--color-text-secondary] max-w-2xl mx-auto mb-12">
            Real reviews from real people
          </p>
          <GlassSurface className="inline-flex flex-col items-center p-8 mb-16" borderRadius={24} opacity={0.90}>
            <div className="text-display-md text-[--color-text-primary] mb-2">{averageRating}</div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-6 h-6 ${i < Math.round(Number(averageRating)) ? 'text-[--color-accent-warm] fill-current' : 'text-gray-300'}`} viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-label text-[--color-text-muted] mb-6">Based on {reviews.length} reviews</p>
            <GlassSurface borderRadius={999} brightness={0} opacity={1}>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-8 py-4 bg-[#0A0A0A] text-white text-label rounded-full hover:bg-[#2A2A2A] transition-colors"
              >
                Write a Review
              </button>
            </GlassSurface>
          </GlassSurface>
        </ScrollFloat>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-black/5 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ScrollFloat key={review.id} yOffset={40} delay={index * 0.1}>
              <ReviewCard review={review} />
            </ScrollFloat>
          ))}
        </div>
      )}

      <ReviewForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleSubmitReview} 
      />
    </div>
  );
}
