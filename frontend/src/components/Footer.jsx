import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight, Download } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-300 pt-16 pb-8 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Company Description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/sr-logo.jpeg" 
              alt="SR Plastic Logo" 
              className="w-auto h-10  object-cover" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Leading manufacturer and supplier of premium quality PVC & Rubber Moulds, Cover Blocks, Paver Block Machinery, Iron Oxide Colors, and Hardener Additives.
          </p>
          <div className="pt-2">
            <span className="inline-block bg-slate-800 text-secondary text-xs px-2.5 py-1 rounded font-semibold border border-slate-700">
              ISO 9001:2015 Registered
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 border-l-4 border-secondary pl-3">Quick Links</h3>
          <ul className="space-y-3.5 text-sm">
            <li>
              <Link to="/" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Product Catalogue</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Product Categories */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 border-l-4 border-secondary pl-3">Our Offerings</h3>
          <ul className="space-y-3.5 text-sm">
            <li>
              <Link to="/category/pvc-mould" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>PVC Paver Moulds</span>
              </Link>
            </li>
            <li>
              <Link to="/category/rubber-mould" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Rubber Paver Moulds</span>
              </Link>
            </li>
            <li>
              <Link to="/category/cover-block" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Curb & Cover Blocks</span>
              </Link>
            </li>
            <li>
              <Link to="/category/machinery" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Vibrator Table & Mixers</span>
              </Link>
            </li>
            <li>
              <Link to="/category/color" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Iron Oxide Colors</span>
              </Link>
            </li>
            <li>
              <Link to="/category/chemicals-hardner" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Chemicals & Hardeners</span>
              </Link>
            </li>
            <li>
              <Link to="/category/plastic-sheet" className="flex items-center hover:text-white transition">
                <ChevronRight size={14} className="text-secondary mr-1" />
                <span>Recycle Plastic Sheets</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-sm">
          <h3 className="text-white font-bold text-base mb-6 border-l-4 border-secondary pl-3">Get in Touch</h3>
          <div className="flex items-start space-x-3">
            <MapPin size={18} className="text-secondary mt-0.5 flex-shrink-0" />
            <span className="text-slate-400 leading-relaxed">
              Phase-III, GIDC Industrial Estate,<br />
              Vatva, Ahmedabad, Gujarat 382445
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={16} className="text-secondary flex-shrink-0" />
            <a href="tel:+919876543210" className="text-slate-400 hover:text-white transition">+91 98765 43210</a>
          </div>
          <div className="flex items-center space-x-3">
            <Mail size={16} className="text-secondary flex-shrink-0" />
            <a href="mailto:info@srplastic.com" className="text-slate-400 hover:text-white transition">info@srplastic.com</a>
          </div>
          <div className="pt-2">
            <a 
              href="/catalog.pdf" 
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded border border-slate-700 transition text-xs"
              onClick={(e) => { e.preventDefault(); alert('Catalog PDF download will start when available.'); }}
            >
              <Download size={14} className="text-secondary" />
              <span>Download Product PPT / PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} SR PLASTIC. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms & Conditions</a>
          <span className="text-slate-700">|</span>
          <span>Designed & Developed with MERN Stack</span>
        </div>
      </div>
    </footer>
  );
}
