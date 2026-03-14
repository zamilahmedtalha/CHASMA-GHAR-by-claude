import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SplitText } from '../components/ui/SplitText';
import { ScrollFloat } from '../components/ui/ScrollFloat';
import { GlassSurface } from '../components/ui/GlassSurface';
import { BounceCards } from '../components/ui/BounceCards';
import { ProductCard, Product } from '../components/shop/ProductCard';
import { ReviewCard, Review } from '../components/reviews/ReviewCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.filter((p: Product) => p.featured)))
      .catch(console.error);

    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 z-10">
            <span className="text-label text-[--color-accent-warm] block mb-4 hero-label">New Collection 2025</span>
            <h1 className="text-display-xl text-[--color-text-primary]">
              <SplitText text="Wear Your Story" />
            </h1>
            <ScrollFloat yOffset={20} duration={1.2} delay={0.4}>
              <p className="text-body text-[--color-text-secondary] max-w-md">
                Discover our curated collection of premium eyewear, crafted for the modern aesthetic.
              </p>
            </ScrollFloat>
            <div className="flex flex-wrap gap-4 pt-4">
              <GlassSurface borderRadius={999} brightness={0} opacity={1}>
                <Link to="/shop" className="inline-block px-8 py-4 bg-[#0A0A0A] text-white text-label rounded-full hover:bg-[#2A2A2A] transition-colors">
                  Shop Now
                </Link>
              </GlassSurface>
              <GlassSurface borderRadius={999} displace={0.3} distortionScale={-100} redOffset={0} greenOffset={5} blueOffset={10} brightness={35} opacity={0.88}>
                <Link to="/about" className="inline-block px-8 py-4 text-label text-[--color-text-primary] rounded-full">
                  Our Story
                </Link>
              </GlassSurface>
            </div>
            <div className="pt-8">
              <span className="text-label text-[--color-text-muted]">★★★★★ 200+ Happy Customers</span>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center z-10">
            <BounceCards 
              images={[
                "https://picsum.photos/seed/aviator/400/600",
                "https://picsum.photos/seed/wayfarer/400/600",
                "https://picsum.photos/seed/retroround/400/600"
              ]}
              containerWidth={500}
              containerHeight={400}
              transformStyles={[
                "rotate(-10deg) translate(-100px, 20px)",
                "rotate(0deg) translate(0px, -20px) scale(1.1)",
                "rotate(10deg) translate(100px, 20px)"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollFloat yOffset={40}>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-light">Featured Frames</h2>
              <Link to="/shop" className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors">
                View All
              </Link>
            </div>
          </ScrollFloat>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-32 bg-[#FDF6EC]/50 backdrop-blur-sm border-y border-black/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-light leading-tight text-gray-900">
            <SplitText text="We believe in eyewear that carries meaning. Crafted with intention, designed to frame your world." />
          </h2>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollFloat yOffset={40}>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-light">Client Stories</h2>
              <Link to="/reviews" className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors">
                Read More
              </Link>
            </div>
          </ScrollFloat>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <GlassSurface borderRadius={32} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-[400px] md:h-auto bg-gray-200">
                <img src="https://picsum.photos/seed/glassesstudio/1000/1000" alt="Studio" className="w-full h-full object-cover" />
              </div>
              <div className="p-12 md:p-20 flex flex-col justify-center bg-white/50">
                <ScrollFloat yOffset={30}>
                  <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Chasma Ghar</h2>
                  <p className="text-gray-600 leading-relaxed mb-10">
                    Founded in 2024, Chasma Ghar was born from a desire to create eyewear that resonates with modern aesthetics. We blend traditional craftsmanship with contemporary design.
                  </p>
                  <Link to="/about" className="inline-block px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors">
                    Read Our Story
                  </Link>
                </ScrollFloat>
              </div>
            </div>
          </GlassSurface>
        </div>
      </section>
    </div>
  );
}
