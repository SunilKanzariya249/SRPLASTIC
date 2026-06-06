import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Check, Phone, ArrowLeft, Send } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';
import { staticProducts } from '../data/staticProducts';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const { addToQuote } = useQuote();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const resData = await response.json();
        if (resData.success && resData.data) {
          setProduct(resData.data);
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        console.log('Using local catalog specifications for:', id);
        generateFallbackProduct();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const generateFallbackProduct = () => {
    const match = staticProducts.find(item => item._id === id) || staticProducts[0];
    setProduct(match);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToQuoteList = () => {
    if (!product) return;
    addToQuote(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    setSubmitting(true);
    try {
      // 1. Submit to Web3Forms for client-side email delivery (required for Web3Forms free tier)
      try {
        const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '211fba8c-8248-4b56-8890-ec7281e2f3ee';
        const web3Message = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: Product Inquiry: ${product.name}
Product Requested: ${product.name} (Qty: ${quantity})
Message: ${formData.message}
`;
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            name: formData.name,
            email: formData.email,
            subject: `SRPLASTIC Product Inquiry: ${product.name}`,
            message: web3Message
          })
        });
      } catch (web3Err) {
        console.warn('Web3Forms notification failed:', web3Err);
      }

      // 2. Submit to backend to store in MongoDB
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Product Inquiry: ${product.name}`,
          products: [{ productId: product._id, name: product.name, quantity: quantity.toString() }]
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-semibold">Loading product specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-red-500 font-bold text-lg">Product Specifications Not Available</p>
        <Link to="/products" className="inline-block mt-4 text-primary font-bold hover:underline">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  // Convert specifications map to array for rendering
  const specsArray = product.specifications 
    ? (product.specifications instanceof Map 
       ? Array.from(product.specifications.entries()) 
       : Object.entries(product.specifications))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Breadcrumb / Back button */}
      <Link 
        to="/products"
        className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-primary transition font-bold text-xs mb-8"
      >
        <ArrowLeft size={16} />
        <span>Back to Catalogue</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Zoomable Product Rendering Card */}
        <div className="md:bg-white md:border md:border-slate-200 md:rounded-2xl md:p-2 md:shadow-sm flex items-center justify-center  md:h-[450px] overflow-hidden lg:sticky lg:top-28">
          <img
            src={`/product_images/${product.imageName}`}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => { e.target.src = '/product_images/page_1.png'; }}
          />
        </div>

        {/* Right Side: Title, Info, Forms */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold text-secondary tracking-widest uppercase bg-secondary-light/45 text-secondary-dark px-3 py-1 rounded-full border border-secondary/20">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight mt-3">
              {product.name}
            </h1>
            {product.subcategory && (
              <p className="text-slate-400 font-semibold text-xs md:text-sm mt-1">{product.subcategory}</p>
            )}
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mt-4">
              {product.description}
            </p>
          </div>

          {/* Specifications Table */}
          {specsArray.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-xs md:text-sm uppercase tracking-wider">Technical Specifications</h3>
              </div>
              <table className="w-full text-left text-xs md:text-sm">
                <tbody className="divide-y divide-slate-100">
                  {specsArray.map(([key, val]) => (
                    <tr key={key} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 font-semibold text-slate-500 w-1/3 bg-slate-50/20">{key}</td>
                      <td className="px-5 py-3 font-bold text-slate-800">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add to Quote List Section */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <label htmlFor="qty-detail" className="text-xs font-semibold text-slate-600">Quantity:</label>
              <input
                type="number"
                id="qty-detail"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 border border-slate-300 rounded px-2 py-1 text-center text-slate-800 font-bold focus:ring-primary focus:border-primary"
              />
            </div>
            
            <button
              onClick={handleAddToQuoteList}
              className={`w-full sm:w-auto flex-1 font-bold py-3 px-6 rounded-lg text-sm flex items-center justify-center space-x-2 shadow transition ${
                added
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Added to Quote Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={18} className="text-secondary" />
                  <span>Add to Quote Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Product Inquiry Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-base mb-1">Quick Enquiry</h3>
            <p className="text-slate-400 text-xs mb-5">Have custom dimensions or motor needs? Write to our plant engineers.</p>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 mx-auto rounded-full flex items-center justify-center mb-3">
                  <Check size={20} />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Inquiry Submitted!</h4>
                <p className="text-slate-500 text-xs">Our manufacturing engineers will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder="name@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Requirements / Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none resize-none"
                    placeholder={`Please mention dimensions, capacity or power specifications needed for ${product.name}...`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg shadow-md transition text-xs flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send size={14} className="text-secondary" />
                  <span>{submitting ? 'Submitting...' : 'SUBMIT PRODUCT ENQUIRY'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
