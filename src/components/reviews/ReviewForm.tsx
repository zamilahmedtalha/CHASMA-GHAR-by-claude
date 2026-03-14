import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { name: string; email: string; rating: number; text: string }) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit({ name, email, rating, text });
    setRating(0);
    setName('');
    setEmail('');
    setText('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Write a Review">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-label text-[--color-text-primary] mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={
                    star <= (hoveredRating || rating)
                      ? "fill-[--color-accent-warm] text-[--color-accent-warm]"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-label text-[--color-text-primary] mb-2">Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-body"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-label text-[--color-text-primary] mb-2">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-body"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="text" className="block text-label text-[--color-text-primary] mb-2">Review</label>
          <textarea
            id="text"
            required
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none text-body"
            placeholder="Share your thoughts..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#0A0A0A] text-white text-label rounded-full hover:bg-[#2A2A2A] transition-colors"
        >
          Submit Review
        </button>
      </form>
    </Modal>
  );
};
