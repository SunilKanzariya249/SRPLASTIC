import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ShoppingCart, SlidersHorizontal, Check } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';
import { staticProducts } from '../data/staticProducts';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [addedItems, setAddedItems] = useState({}); // Tracking animate checks on add

  const { addToQuote } = useQuote();

  // Selected category from URL params or default to 'All'
  const selectedCategory = searchParams.get('category') || 'All';

  const categories = [
    'All',
    'PVC Mould',
    'Rubber Mould',
    'Cover Block',
    'Machinery',
    'Color',
    'Chemicals & Hardener',
    'Plastic Sheet'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        let url = `${API_URL}/api/products?category=${encodeURIComponent(selectedCategory)}`;
        if (searchTerm) {
          url += `&search=${searchTerm}`;
        }
        const response = await fetch(url);
        const resData = await response.json();
        
        if (resData.success && resData.data && resData.data.length > 0) {
          setProducts(resData.data);
        } else {
          // If connection is successful but database is empty, use the full static database fallback
          generateFallbackProducts();
        }
      } catch (error) {
        console.warn('API connection failed, falling back to static schema data');
        generateFallbackProducts();
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [selectedCategory, searchTerm]);

  // Generates offline fallback products from extracted catalog titles
  const generateFallbackProducts = () => {
    const filtered = staticProducts.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    setProducts(filtered);
  };

  const handleCategorySelect = (cat) => {
    setSearchParams({ category: cat });
    setShowMobileFilters(false);
  };

  const handleAddToCart = (product) => {
    addToQuote(product, 1);
    setAddedItems(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product._id]: false }));
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Our Product Catalogue</h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">Explore our range of premium moulds, industrial machines, and pigments.</p>
        </div>
        <span className="mt-4 md:mt-0 bg-slate-100 border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-bold">
          {products.length} Products Found
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search products by model or keyword (e.g. Cosmic, Vibrator)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
          />
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center justify-center space-x-2 border border-slate-300 bg-white px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex gap-8 relative">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-28 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-800 text-base pb-3 border-b border-slate-100">Categories</h2>
            <ul className="space-y-1 text-sm font-semibold">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-primary text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Sidebar Filters - Mobile Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
            <div onClick={() => setShowMobileFilters(false)} className="absolute inset-0 bg-slate-900/60" />
            <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col p-6 space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-lg">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Categories</p>
                <ul className="space-y-1.5 text-sm font-semibold">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
                          selectedCategory === cat
                            ? 'bg-primary text-white'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4 bg-white space-y-4 animate-pulse">
                  <div className="bg-slate-200 h-44 rounded-lg w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-10 bg-slate-200 rounded w-full pt-4"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8">
              <p className="text-slate-500 font-bold text-lg">No products found</p>
              <p className="text-slate-400 text-xs mt-1">Try adjusting your filters or search keywords.</p>
              <button
                onClick={() => { setSearchTerm(''); setSearchParams({}); }}
                className="mt-6 bg-primary text-white font-bold px-5 py-2.5 rounded-lg shadow hover:bg-primary-dark transition text-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col card-glow hover:border-primary/20"
                >
                  {/* Image */}
                  <Link 
                    to={`/product/${product._id}`}
                    className="h-48 bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100 overflow-hidden"
                  >
                    <img
                      src={`/product_images/${product.imageName}`}
                      alt={product.name}
                      className="max-h-full max-w-[90%] object-contain hover:scale-105 transition duration-300"
                      onError={(e) => { e.target.src = '/product_images/page_1.png'; }}
                    />
                  </Link>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase">
                        {product.category}
                      </span>
                      <h3 className="font-extrabold text-slate-800 text-sm md:text-base mt-2 hover:text-primary">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mt-1.5 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Footer buttons */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex gap-2.5">
                      <Link
                        to={`/product/${product._id}`}
                        className="flex-1 border border-slate-300 hover:border-slate-400 text-slate-700 font-bold py-2 rounded-lg text-xs transition text-center"
                      >
                        Specifications
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-3 py-2 rounded-lg flex items-center justify-center transition border ${
                          addedItems[product._id]
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                            : 'bg-secondary hover:bg-secondary-dark border-secondary text-primary hover:text-primary-dark'
                        }`}
                        title="Add to Quote List"
                      >
                        {addedItems[product._id] ? <Check size={16} /> : <ShoppingCart size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
