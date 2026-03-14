import React, { useEffect, useState } from 'react';
import { SplitText } from '../components/ui/SplitText';
import { ScrollFloat } from '../components/ui/ScrollFloat';
import { ProductCard, Product } from '../components/shop/ProductCard';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="mb-16 text-center">
        <h1 className="text-display-xl text-[--color-text-primary] mb-6">
          <SplitText text="The Collection" tag="h1" />
        </h1>
        <ScrollFloat yOffset={20} delay={0.2}>
          <p className="text-body text-[--color-text-secondary] max-w-2xl mx-auto">
            Discover pieces made to last
          </p>
        </ScrollFloat>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 products-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-black/5 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 products-grid">
          {products.map((product, index) => (
            <ScrollFloat key={product.id} yOffset={40} delay={index * 0.1}>
              <ProductCard product={product} />
            </ScrollFloat>
          ))}
        </div>
      )}
    </div>
  );
}
