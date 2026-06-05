import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Search, ShoppingCart, Check, ArrowLeft, Home } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';
import { staticProducts } from '../data/staticProducts';

const categoryMap = {
  'pvc-mould': 'Paver Block Plastic Mould',
  'rubber-mould': 'Paver Block PVC Rubber Mould',
  'cover-block': 'Cover Block',
  'machinery': 'Paver Block Machinery',
  'color': 'Iron Oxide Color',
  'chemicals-hardner': 'Paver Block Chemicals',
  'plastic-sheet': 'Recycle Plastic Sheet',
  // New slugs
  'Paver-Block-Plastic-Mould': 'Paver Block Plastic Mould',
  'Paver-Block-PVC-Rubber-Mould': 'Paver Block PVC Rubber Mould',
  'Paver-Block-Machinery': 'Paver Block Machinery',
  'Iron-Oxide-Color': 'Iron Oxide Color',
  'Paver-Block-Chemicals': 'Paver Block Chemicals',
  'Recycle-Plastic-Sheet': 'Recycle Plastic Sheet'
};

const titleMap = {
  'pvc-mould': 'Paver Block Plastic Mould',
  'rubber-mould': 'Paver Block PVC Rubber Mould',
  'cover-block': 'Curb & Cover Blocks',
  'machinery': 'Paver Block Machinery',
  'color': 'Iron Oxide Color',
  'chemicals-hardner': 'Paver Block Chemicals',
  'plastic-sheet': 'Recycle Plastic Sheet',
  // New slugs
  'Paver-Block-Plastic-Mould': 'Paver Block Plastic Mould',
  'Paver-Block-PVC-Rubber-Mould': 'Paver Block PVC Rubber Mould',
  'Paver-Block-Machinery': 'Paver Block Machinery',
  'Iron-Oxide-Color': 'Iron Oxide Color',
  'Paver-Block-Chemicals': 'Paver Block Chemicals',
  'Recycle-Plastic-Sheet': 'Recycle Plastic Sheet'
};

const descMap = {
  'pvc-mould': 'Explore our range of premium PVC paver block molds for heavy-duty, consistent tile and paver manufacturing.',
  'rubber-mould': 'Tear-resistant, durable, and highly flexible rubber moulds designed for premium textures and long service life.',
  'cover-block': 'Round and square concrete spacer cover blocks in multiple sizes from 20mm to 50mm for solid reinforcing.',
  'machinery': 'Heavy-duty vibrator tables, pan concrete mixers, top color layer mixers, and block machine layouts.',
  'color': 'UV-stable, high-dispersion iron oxide coloring pigments to produce bright, long-lasting concrete blocks.',
  'chemicals-hardner': 'Industrial-grade concrete hardening additives, dual-action superplasticizers, and lacquer polishes.',
  'plastic-sheet': 'Sustainable, heavy-gauge recycled plastic pallets and sheets engineered for concrete block stacks.',
  // New slugs
  'Paver-Block-Plastic-Mould': 'Explore our range of premium PVC paver block molds for heavy-duty, consistent tile and paver manufacturing.',
  'Paver-Block-PVC-Rubber-Mould': 'Tear-resistant, durable, and highly flexible rubber moulds designed for premium textures and long service life.',
  'Paver-Block-Machinery': 'Heavy-duty vibrator tables, pan concrete mixers, top color layer mixers, and block machine layouts.',
  'Iron-Oxide-Color': 'UV-stable, high-dispersion iron oxide coloring pigments to produce bright, long-lasting concrete blocks.',
  'Paver-Block-Chemicals': 'Industrial-grade concrete hardening additives, dual-action superplasticizers, and lacquer polishes.',
  'Recycle-Plastic-Sheet': 'Sustainable, heavy-gauge recycled plastic pallets and sheets engineered for concrete block stacks.'
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItems, setAddedItems] = useState({});

  const { addToQuote } = useQuote();

  // Validate route parameter
  const dbCategory = categoryMap[categoryName];

  useEffect(() => {
    if (!dbCategory) return;

    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const url = `${API_URL}/api/products?category=${encodeURIComponent(dbCategory)}`;
        const response = await fetch(url);
        const resData = await response.json();

        if (resData.success && resData.data && resData.data.length > 0) {
          setProducts(resData.data);
        } else {
          generateFallbackProducts();
        }
      } catch (error) {
        console.warn('API error, falling back to static products');
        generateFallbackProducts();
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName, dbCategory]);

  if (!dbCategory) {
    return <Navigate to="/products" replace />;
  }

  const generateFallbackProducts = () => {
    const filtered = staticProducts.filter(item => item.category === dbCategory);
    setProducts(filtered);
  };

  const handleAddToCart = (product) => {
    addToQuote(product, 1);
    setAddedItems(prev => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product._id]: false }));
    }, 1500);
  };

  // Filter displayed products on frontend using the search input
  const displayedProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.subcategory && product.subcategory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Category Header Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-0 w-80 h-80 bg-slate-800/40 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-bold mb-4">
            <Link to="/" className="hover:text-secondary flex items-center gap-1 transition">
              <Home size={12} />
              <span>Home</span>
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-secondary transition">Products</Link>
            <span>/</span>
            <span className="text-secondary uppercase">{titleMap[categoryName]}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight">{titleMap[categoryName]}</h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
            {descMap[categoryName]}
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={`Search in ${titleMap[categoryName]}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
            />
          </div>
          <div className="text-slate-500 font-semibold text-xs md:text-sm">
            {displayedProducts.length} items found
          </div>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 bg-white space-y-4 animate-pulse">
                <div className="bg-slate-200 h-48 rounded-lg w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                <div className="h-10 bg-slate-200 rounded w-full pt-4"></div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8 max-w-lg mx-auto shadow-sm">
            <p className="text-slate-500 font-bold text-lg">No items match your search</p>
            <p className="text-slate-400 text-xs mt-1">Try spelling your search keyword differently or clear the search field.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-6 bg-primary text-white font-bold px-5 py-2.5 rounded-lg shadow hover:bg-primary-dark transition text-sm"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-primary/20 transition duration-300"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="h-72 bg-slate-50 flex items-center justify-center p-2 border-b border-slate-100 overflow-hidden relative"
                >
                  <img
                    src={`/product_images/${product.imageName}`}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.src = '/product_images/page_1.png'; }}
                  />
                  {product.subcategory && (
                    <span className="absolute top-3 right-3 bg-slate-100/80 backdrop-blur-sm text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase border border-slate-200">
                      {product.subcategory}
                    </span>
                  )}
                </Link>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base hover:text-primary transition duration-200">
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h3>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 border border-slate-300 hover:border-slate-400 text-slate-700 font-extrabold py-2.5 rounded-xl text-xs transition text-center"
                    >
                      Specifications
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-4 py-2.5 rounded-xl flex items-center justify-center transition border ${
                        addedItems[product._id]
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                          : 'bg-secondary hover:bg-secondary-dark border-secondary text-primary hover:text-primary-dark shadow-sm'
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

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition"
          >
            <ArrowLeft size={16} />
            <span>View All Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
