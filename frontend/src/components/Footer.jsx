import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight, Download, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Company Description */}
        <div className="space-y-5">
          <div className="flex items-center space-x-3">
            <img 
              src="/sr-logo.jpeg" 
              alt="SR Plastic Logo" 
              className="w-auto h-11 object-cover border border-slate-900 shadow-sm" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Leading manufacturer and supplier of premium quality PVC & Rubber Moulds, Cover Blocks, Paver Block Machinery, Iron Oxide Colors, and Hardener Additives.
          </p>
          <div className="flex items-center space-x-3 pt-1">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-900 hover:bg-secondary hover:text-primary text-slate-400 rounded-full border border-slate-800/60 transition-all duration-300 hover:-translate-y-1"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-900 hover:bg-secondary hover:text-primary text-slate-400 rounded-full border border-slate-800/60 transition-all duration-300 hover:-translate-y-1"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-900 hover:bg-secondary hover:text-primary text-slate-400 rounded-full border border-slate-800/60 transition-all duration-300 hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-900 hover:bg-secondary hover:text-primary text-slate-400 rounded-full border border-slate-800/60 transition-all duration-300 hover:-translate-y-1"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 border-l-2 border-secondary pl-3">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Product Catalogue</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Product Categories */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 border-l-2 border-secondary pl-3">Our Offerings</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/category/Paver-Block-Plastic-Mould" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Paver Block Plastic Mould</span>
              </Link>
            </li>
            <li>
              <Link to="/category/Paver-Block-PVC-Rubber-Mould" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Paver Block PVC Rubber Mould</span>
              </Link>
            </li>
            <li>
              <Link to="/category/Paver-Block-Machinery" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Paver Block Machinery</span>
              </Link>
            </li>
            <li>
              <Link to="/category/Paver-Block-Chemicals" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Paver Block Chemicals</span>
              </Link>
            </li>
            <li>
              <Link to="/category/Iron-Oxide-Color" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Iron Oxide Color</span>
              </Link>
            </li>
            <li>
              <Link to="/category/Recycle-Plastic-Sheet" className="group flex items-center hover:text-white transition duration-200 text-slate-400">
                <ChevronRight size={12} className="mr-1.5 text-slate-500 group-hover:text-white transition-colors duration-200 transform group-hover:translate-x-0.5 transition-transform" />
                <span>Recycle Plastic Sheet</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-5 text-sm">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 border-l-2 border-secondary pl-3">Get in Touch</h3>
          <div className="flex items-start space-x-3">
            <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
            <span className="text-slate-400 leading-relaxed">
              Phase-III, GIDC Industrial Estate,<br />
              Vatva, Ahmedabad, Gujarat 382445
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={15} className="text-secondary flex-shrink-0" />
            <a href="tel:+919876543210" className="text-slate-400 hover:text-white transition duration-200">+91 98765 43210</a>
          </div>
          <div className="flex items-center space-x-3">
            <Mail size={15} className="text-secondary flex-shrink-0" />
            <a href="mailto:info@srplastic.com" className="text-slate-400 hover:text-white transition duration-200">info@srplastic.com</a>
          </div>
          <div className="pt-2">
            <a 
              href="/sr-plastics.pdf" 
              download="sr-plastics.pdf"
              className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-dark text-primary font-extrabold py-2.5 px-4 rounded-lg shadow-sm hover:shadow hover:scale-[1.02] active:scale-95 transition-all duration-200 text-xs uppercase tracking-wide"
            >
              <Download size={14} className="stroke-[2.5]" />
              <span>Download Product PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} SR PLASTIC. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-white transition duration-200">Terms & Conditions</a>
          <span className="text-slate-800">|</span>
          <span>Designed & Developed with MERN Stack</span>
        </div>
      </div>
    </footer>
  );
}
