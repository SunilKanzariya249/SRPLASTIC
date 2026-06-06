import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ShoppingCart, Trash2, ArrowRight, ChevronRight, ChevronDown, MapPin, Download } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { quoteItems, removeFromQuote, updateQuantity, quoteCount, clearQuote } = useQuote();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // 768px is the md breakpoint
        setMobileMenuOpen(false);
        setMobileSubmenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (quoteItems.length === 0) return;
    setSubmitting(true);
    try {
      // 1. Submit to Web3Forms for client-side email delivery (required for Web3Forms free tier)
      try {
        const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '211fba8c-8248-4b56-8890-ec7281e2f3ee';
        let productsList = '';
        quoteItems.forEach((item, idx) => {
          productsList += `${idx + 1}. ${item.name} (Qty: ${item.quantity})\n`;
        });
        const web3Message = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.companyName || 'N/A'}
Subject: Bulk Product Quote Request

Requested Products List:
${productsList}

Additional Message:
${formData.message}
`;
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            name: formData.name,
            email: formData.email,
            subject: 'SRPLASTIC Bulk Product Quote Request',
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
          subject: 'Bulk Product Quote Request',
          products: quoteItems.map(item => ({
            productId: item._id,
            name: item.name,
            quantity: item.quantity.toString()
          }))
        })
      });
      const data = await response.json();
      if (data.success) {
        setInquirySubmitted(true);
        clearQuote();
        setFormData({ name: '', email: '', phone: '', companyName: '', message: '' });
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting quote request.');
    } finally {
      setSubmitting(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      {/* Top Utility Bar */}
      <div className="hidden md:flex bg-slate-950 text-slate-300 text-sm py-3 px-6 justify-between items-center border-b border-slate-900">
        <div className="flex items-center space-x-5">
          <a href="tel:+919876543210" className="flex items-center space-x-1.5 hover:text-secondary transition duration-200 font-medium tracking-wide">
            <Phone size={14} className="text-secondary" />
            <span>+91 98765 43210</span>
          </a>
          <span className="w-[1px] h-4 bg-slate-800" />
          <a href="mailto:info@srplastic.com" className="flex items-center space-x-1.5 hover:text-secondary transition duration-200 font-medium tracking-wide">
            <Mail size={14} className="text-secondary" />
            <span>info@srplastic.com</span>
          </a>
          <span className="w-[1px] h-4 bg-slate-800" />
          <div className="flex items-center space-x-1.5 text-slate-400 font-medium tracking-wide">
            <MapPin size={14} className="text-secondary/80" />
            <span>Gujarat, India</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-white/5 px-3 py-1 rounded border border-white/5">
            Mfg. & Exporter
          </span>
          <span className="w-[1px] h-4 bg-slate-800" />
          <a 
            href="/sr-plastics.pdf" 
            download="sr-plastics.pdf"
            className="flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-primary font-extrabold px-4 py-1.5 rounded-full text-[11px] tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          >
            <Download size={13} className="stroke-[3]" />
            <span>Company Profile</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/sr-logo.jpeg" 
            alt="SR Plastic Logo" 
            className="w-auto h-10  object-cover" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`font-semibold text-base transition ${isActive('/') ? 'text-secondary' : 'text-slate-600 hover:text-primary'}`}>Home</Link>
          <Link to="/about" className={`font-semibold text-base transition ${isActive('/about') ? 'text-secondary' : 'text-slate-600 hover:text-primary'}`}>About Us</Link>
          
          {/* Products Dropdown */}
          <div className="relative group py-2">
            <Link 
              to="/products" 
              className={`font-semibold text-base transition flex items-center gap-1 ${
                isActive('/products') || location.pathname.startsWith('/category/') ? 'text-secondary' : 'text-slate-600 hover:text-primary'
              }`}
            >
              <span>Products</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Dropdown Box - aligned with left-0, starting at bottom of navbar top-[53px], sliding down on hover */}
            {/* before: pseudo-elements create an invisible hover bridge of 25px above the box to prevent mouse-leave events */}
            <div className="absolute left-0 top-[54px] w-64 bg-white border border-slate-150 rounded-none shadow-xl py-0 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50 before:absolute before:content-[''] before:w-full before:h-[25px] before:-top-[25px] before:left-0">
              <Link to="/category/Paver-Block-Plastic-Mould" className="block px-5 py-3 text-base font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary border-b border-slate-100 transition duration-150">
                Paver Block Plastic Mould
              </Link>
              <Link to="/category/Paver-Block-PVC-Rubber-Mould" className="block px-5 py-3 text-base font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary border-b border-slate-100 transition duration-150">
                Paver Block PVC Rubber Mould
              </Link>
              <Link to="/category/Paver-Block-Machinery" className="block px-5 py-3 text-base font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary border-b border-slate-100 transition duration-150">
                Paver Block Machinery
              </Link>
              <Link to="/category/Paver-Block-Chemicals" className="block px-5 py-3 text-base font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary border-b border-slate-100 transition duration-150">
                Paver Block Chemicals
              </Link>
              <Link to="/category/Iron-Oxide-Color" className="block px-5 py-3 text-base font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary border-b border-slate-100 transition duration-150">
                Iron Oxide Color
              </Link>
              <Link to="/category/Recycle-Plastic-Sheet" className="block px-5 py-3 text-base font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary transition duration-150">
                Recycle Plastic Sheet
              </Link>
            </div>
          </div>

          <Link to="/contact" className={`font-semibold text-base transition ${isActive('/contact') ? 'text-secondary' : 'text-slate-600 hover:text-primary'}`}>Contact Us</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Quote Cart Trigger */}
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-slate-700 hover:text-primary transition focus:outline-none"
            aria-label="Quote Cart"
          >
            <ShoppingCart size={24} />
            {quoteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-primary font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                {quoteCount}
              </span>
            )}
          </button>

          {/* Call-to-action button */}
          <button
            onClick={() => setCartOpen(true)}
            className="hidden lg:flex bg-secondary hover:bg-secondary-dark text-primary font-bold px-5 py-2.5 rounded-lg shadow transition items-center space-x-2 text-sm"
          >
            <span>GET A QUOTE</span>
            <ArrowRight size={16} />
          </button>

          {/* Hamburger Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-2xl py-6 px-6 space-y-4 z-50">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`flex items-center justify-between font-bold text-base py-3 px-4 rounded-xl transition-all duration-200 ${
              isActive('/') ? 'bg-secondary/10 text-secondary' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Home</span>
            <ChevronRight size={16} className={isActive('/') ? 'text-secondary' : 'text-slate-400'} />
          </Link>
          
          <Link 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`flex items-center justify-between font-bold text-base py-3 px-4 rounded-xl transition-all duration-200 ${
              isActive('/about') ? 'bg-secondary/10 text-secondary' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>About Us</span>
            <ChevronRight size={16} className={isActive('/about') ? 'text-secondary' : 'text-slate-400'} />
          </Link>

          {/* Products Dropdown Accordion */}
          <div className="rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <Link 
                to="/products" 
                onClick={() => setMobileMenuOpen(false)} 
                className={`flex-1 font-bold text-base py-3 px-4 transition-all duration-200 ${
                  isActive('/products') ? 'text-secondary bg-primary/5' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Products
              </Link>
              <button 
                onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                className="py-3 px-4 text-slate-500 hover:text-primary transition focus:outline-none border-l border-slate-100"
                aria-label="Toggle Products Submenu"
              >
                <ChevronDown size={18} className={`transition-transform duration-300 ${mobileSubmenuOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
              </button>
            </div>
            
            <div className={`transition-all duration-300 overflow-hidden ${
              mobileSubmenuOpen ? 'max-h-[300px] border-t border-slate-100 opacity-100 py-2 bg-slate-50/70' : 'max-h-0 opacity-0 pointer-events-none'
            }`}>
              {[
                { name: "Paver Block Plastic Mould", path: "/category/Paver-Block-Plastic-Mould" },
                { name: "Paver Block PVC Rubber Mould", path: "/category/Paver-Block-PVC-Rubber-Mould" },
                { name: "Paver Block Machinery", path: "/category/Paver-Block-Machinery" },
                { name: "Paver Block Chemicals", path: "/category/Paver-Block-Chemicals" },
                { name: "Iron Oxide Color", path: "/category/Iron-Oxide-Color" },
                { name: "Recycle Plastic Sheet", path: "/category/Recycle-Plastic-Sheet" }
              ].map((cat) => (
                <Link 
                  key={cat.path}
                  to={cat.path} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`block px-6 py-2.5 text-xs font-bold transition-all duration-150 ${
                    location.pathname === cat.path ? 'text-secondary pl-8 border-l-4 border-secondary' : 'text-slate-500 hover:text-primary hover:pl-7'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`flex items-center justify-between font-bold text-base py-3 px-4 rounded-xl transition-all duration-200 ${
              isActive('/contact') ? 'bg-secondary/10 text-secondary' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Contact Us</span>
            <ChevronRight size={16} className={isActive('/contact') ? 'text-secondary' : 'text-slate-400'} />
          </Link>

          <button
            onClick={() => { setMobileMenuOpen(false); setCartOpen(true); }}
            className="w-full bg-primary hover:bg-primary-dark text-white text-center font-bold py-3.5 rounded-xl transition shadow-md text-sm tracking-wide"
          >
            Get a Quote ({quoteCount})
          </button>
        </div>
      )}

      {/* Quote Cart Side Panel / Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Overlay */}
            <div onClick={() => { setCartOpen(false); setInquirySubmitted(false); }} className="absolute inset-0 bg-slate-900 bg-opacity-65 transition-opacity" aria-hidden="true"></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-primary text-white">
                    <h2 className="text-lg font-bold flex items-center space-x-2">
                      <ShoppingCart className="text-secondary" />
                      <span>Quote Request List</span>
                    </h2>
                    <button 
                      onClick={() => { setCartOpen(false); setInquirySubmitted(false); }}
                      className="p-1.5 hover:bg-slate-800 rounded transition text-slate-300 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="flex-1 py-6 px-6 overflow-y-auto">
                    {inquirySubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 mx-auto rounded-full flex items-center justify-center mb-4 shadow">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Quote Request Sent!</h3>
                        <p className="text-slate-600 text-sm">
                          Thank you for your inquiry. Our sales executive will review your specifications and get back to you with the custom quote in 24 hours.
                        </p>
                        <button
                          onClick={() => { setCartOpen(false); setInquirySubmitted(false); }}
                          className="mt-6 bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-dark transition text-sm"
                        >
                          Continue Browsing
                        </button>
                      </div>
                    ) : quoteItems.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-100 text-slate-400 mx-auto rounded-full flex items-center justify-center mb-4">
                          <ShoppingCart size={28} />
                        </div>
                        <p className="text-slate-500 font-medium">Your quote list is empty.</p>
                        <p className="text-slate-400 text-xs mt-1">Browse our products and add them to your request list.</p>
                        <Link
                          to="/products"
                          onClick={() => setCartOpen(false)}
                          className="inline-block mt-6 bg-secondary text-primary font-bold px-5 py-2.5 rounded-lg shadow hover:bg-secondary-dark transition text-sm"
                        >
                          Browse Products
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* List of items */}
                        <div className="flow-root">
                          <ul className="-my-5 divide-y divide-slate-100">
                            {quoteItems.map((item) => (
                              <li key={item._id} className="flex py-5">
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                                  <img
                                    src={`/product_images/${item.imageName}`}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.target.src = '/product_images/page_1.png'; }}
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-800">
                                      <h4>{item.name}</h4>
                                      <button 
                                        onClick={() => removeFromQuote(item._id)}
                                        className="text-slate-400 hover:text-red-500 transition"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                    <p className="mt-1 text-xs text-slate-500">{item.category}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-xs">
                                    <div className="flex items-center space-x-2">
                                      <label htmlFor={`quantity-${item._id}`} className="text-slate-500">Qty:</label>
                                      <input
                                        type="number"
                                        id={`quantity-${item._id}`}
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, e.target.value)}
                                        className="w-14 border border-slate-300 rounded px-2 py-0.5 text-center text-slate-800 font-bold focus:ring-primary focus:border-primary"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Customer Information Form */}
                        <div className="border-t border-slate-200 pt-6">
                          <h3 className="text-sm font-bold text-slate-800 mb-4">Requestor Contact Details</h3>
                          <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                            <div>
                              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                              <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                                placeholder="Your Name"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Email *</label>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                                  placeholder="name@email.com"
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
                                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                                  placeholder="98765 43210"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-600 mb-1">Company Name</label>
                              <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                                placeholder="Company Ltd."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-600 mb-1">Additional Requirements / Message *</label>
                              <textarea
                                name="message"
                                required
                                rows="3"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none resize-none"
                                placeholder="Details about your requirements, shipping location, dimensions..."
                              ></textarea>
                            </div>
                            <button
                              type="submit"
                              disabled={submitting}
                              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-md transition text-sm disabled:opacity-50 mt-4"
                            >
                              {submitting ? 'Submitting...' : 'SUBMIT QUOTE REQUEST'}
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
