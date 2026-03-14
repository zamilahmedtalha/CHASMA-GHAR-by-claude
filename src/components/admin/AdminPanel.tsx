import React, { useState, useEffect } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { GlassSurface } from '../ui/GlassSurface';
import { Modal } from '../ui/Modal';
import { X, Edit2, Trash2, Plus, Lock, Settings } from 'lucide-react';
import { Product } from '../shop/ProductCard';

export const AdminPanel: React.FC = () => {
  const { adminMode, lockAdmin } = useAdminStore();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    if (adminMode) {
      fetchProducts();
    }
  }, [adminMode]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = sessionStorage.getItem('adminToken');
        await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { 'x-admin-token': token || '' }
        });
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      description: '',
      images: [''],
      category: '',
      stock: 0,
      featured: false,
      accentColor: '#000000'
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem('adminToken');
    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = editingProduct ? 'PATCH' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': token || '' 
        },
        body: JSON.stringify(formData)
      });
      setIsFormOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Failed to save product', error);
    }
  };

  if (!adminMode) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] flex flex-col h-[85vh] animate-in slide-in-from-bottom duration-500 ease-out">
      <GlassSurface 
        className="flex-1 rounded-t-3xl border-t border-white/20 bg-white/90 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
        borderRadius={0}
      >
        <div className="flex items-center justify-between p-6 border-b border-black/10 bg-white/50">
          <div className="flex items-center gap-4">
            <h2 className="text-display-sm text-[--color-text-primary] flex items-center gap-2">
              <Settings size={24} />
              Admin Dashboard
            </h2>
            <div className="flex bg-black/5 p-1 rounded-full">
              {['products', 'orders', 'reviews', 'settings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-label capitalize transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-black' : 'text-[--color-text-muted] hover:text-[--color-text-primary]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GlassSurface borderRadius={999} brightness={0} opacity={1}>
              <button 
                onClick={lockAdmin}
                className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] text-white rounded-full text-label hover:bg-[#2A2A2A] transition-colors"
              >
                <Lock size={16} />
                Lock Admin
              </button>
            </GlassSurface>
            <button 
              onClick={lockAdmin}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <X size={24} className="text-[--color-text-primary]" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {activeTab === 'products' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-display-sm text-[--color-text-primary]">Manage Products</h3>
                <GlassSurface borderRadius={999} brightness={0} opacity={1}>
                  <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] text-white rounded-full text-label hover:bg-[#2A2A2A] transition-colors">
                    <Plus size={16} />
                    Add Product
                  </button>
                </GlassSurface>
              </div>

              {loading ? (
                <div className="text-center py-12 text-[--color-text-muted] text-body">Loading products...</div>
              ) : (
                <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-black/5 text-label text-[--color-text-muted]">
                        <th className="p-4">Product</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Category</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b border-black/5 hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 flex items-center gap-4">
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-black/5" />
                            <span className="text-body text-[--color-text-primary]">{product.name}</span>
                          </td>
                          <td className="p-4 text-price text-[--color-text-secondary]">${product.price.toFixed(2)}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                          </td>
                          <td className="p-4 capitalize text-label text-[--color-text-muted]">{product.category}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(product)} className="p-2 text-[--color-text-muted] hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-[--color-text-muted] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab !== 'products' && (
            <div className="h-full flex items-center justify-center text-[--color-text-muted] text-body">
              <p>This section is under construction.</p>
            </div>
          )}
        </div>
      </GlassSurface>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingProduct ? 'Edit Product' : 'Add Product'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" step="0.01" required value={formData.price || 0} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input type="number" required value={formData.stock || 0} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/50 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="text" required value={formData.images?.[0] || ''} onChange={e => setFormData({...formData, images: [e.target.value]})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input type="text" required value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black/50" />
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.featured || false} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
              </label>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/80 rounded-lg transition-colors">Save Product</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
