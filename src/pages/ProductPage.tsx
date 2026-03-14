import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SplitText } from '../components/ui/SplitText';
import { ScrollFloat } from '../components/ui/ScrollFloat';
import { GlassSurface } from '../components/ui/GlassSurface';
import { ProductCard, Product } from '../components/shop/ProductCard';
import { useCartStore } from '../store/useCartStore';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        // Fetch related products
        fetch('/api/products')
          .then(r => r.json())
          .then(all => setRelatedProducts(all.filter((p: Product) => p.id !== data.id).slice(0, 3)));
      })
      .catch(console.error);
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1).map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <GlassSurface className="p-10 md:p-16" borderRadius={24}>
            <div className="mb-8">
              <p className="text-label text-[--color-text-muted] capitalize mb-2">{product.category}</p>
              <h1 className="text-display-md text-[--color-text-primary] mb-4">
                <SplitText text={product.name} tag="h1" threshold={0} rootMargin="0px" />
              </h1>
              <p className="text-price text-[--color-accent-warm]">${product.price.toFixed(2)}</p>
            </div>
            
            <p className="text-body text-[--color-text-secondary] mb-10">
              {product.description}
            </p>

            <div className="w-full h-px bg-[--color-border] mb-8" />

            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <GlassSurface borderRadius={999} brightness={0} opacity={1}>
                  <button 
                    onClick={() => addItem(product)}
                    disabled={product.stock === 0}
                    className="w-full py-4 bg-[#0A0A0A] text-white text-label rounded-full hover:bg-[#2A2A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </GlassSurface>
                <GlassSurface borderRadius={999} opacity={0.8}>
                  <button className="w-full py-4 text-label text-[--color-text-primary] border border-[--color-border] rounded-full hover:bg-white/50 transition-colors">
                    Add to Wishlist
                  </button>
                </GlassSurface>
              </div>
              
              <div className="w-full h-px bg-[--color-border] my-8" />
              
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-heading text-sm">
                    <span>Product Details</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-body text-[--color-text-secondary] mt-3 group-open:animate-fadeIn">
                    Premium materials and expert craftsmanship ensure durability and comfort.
                  </p>
                </details>
                <div className="w-full h-px bg-[--color-border]" />
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-heading text-sm">
                    <span>Shipping & Returns</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-body text-[--color-text-secondary] mt-3 group-open:animate-fadeIn">
                    Free shipping on orders over $200. 30-day return policy.
                  </p>
                </details>
                <div className="w-full h-px bg-[--color-border]" />
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-heading text-sm">
                    <span>Care Instructions</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-body text-[--color-text-secondary] mt-3 group-open:animate-fadeIn">
                    Clean with the provided microfiber cloth. Store in the protective case when not in use.
                  </p>
                </details>
              </div>
            </div>
          </GlassSurface>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <ScrollFloat yOffset={40}>
            <h2 className="text-display-md text-[--color-text-primary] mb-12">
              <SplitText text="You Might Also Like" tag="h2" />
            </h2>
          </ScrollFloat>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p, i) => (
              <ScrollFloat key={p.id} yOffset={40} delay={i * 0.1}>
                <ProductCard product={p} />
              </ScrollFloat>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
