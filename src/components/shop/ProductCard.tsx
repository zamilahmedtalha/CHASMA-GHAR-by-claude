import React from 'react';
import { Link } from 'react-router-dom';
import { GlassSurface } from '../ui/GlassSurface';
import { useCartStore } from '../../store/useCartStore';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
  accentColor: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCartStore();

  return (
    <GlassSurface 
      className={`group flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl product-card ${className || ''}`}
      borderRadius={24}
      opacity={0.90}
      brightness={40}
    >
      <div className="product-card-inner">
        <Link to={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden rounded-[20px] m-2">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
          {product.stock === 0 && (
            <div className="absolute top-4 right-4 bg-black/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md">
              Out of Stock
            </div>
          )}
        </Link>
        <div className="p-4">
          <p className="text-label text-[--color-text-muted] capitalize">{product.category}</p>
          <Link to={`/product/${product.slug}`}>
            <h3 className="text-heading mt-1 group-hover:text-[--color-text-secondary] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-price text-[--color-accent-warm] mt-1">${product.price.toFixed(2)}</p>
          
          <GlassSurface borderRadius={999} brightness={0} opacity={1} className="mt-3 w-full">
            <button
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
              className="w-full py-3 bg-[#0A0A0A] text-white text-label rounded-full hover:bg-[#2A2A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
            </button>
          </GlassSurface>
        </div>
      </div>
    </GlassSurface>
  );
};
