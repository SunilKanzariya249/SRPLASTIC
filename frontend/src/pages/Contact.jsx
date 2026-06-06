import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // 1. Submit to Web3Forms for client-side email delivery (required for Web3Forms free tier)
      try {
        const web3formsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '211fba8c-8248-4b56-8890-ec7281e2f3ee';
        const web3Message = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject || 'General Contact Form'}
Message: ${formData.message}
`;
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            name: formData.name,
            email: formData.email,
            subject: `SRPLASTIC Contact Us: ${formData.subject || 'New Message'}`,
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
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert(data.message || 'Error sending message.');
      }
    } catch (error) {
      console.warn('API error, simulating offline message submission');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-950 py-20 border-b-4 border-secondary group transition-all duration-300">
        {/* Hover-reveal background image */}
        <div 
          className="absolute inset-0 bg-[length:100%_100%] bg-center bg-no-repeat opacity-0 group-hover:opacity-80 transition-all duration-700 scale-105 group-hover:scale-100 pointer-events-none z-0"
          style={{ backgroundImage: "url('/about-contact-page banner .png')" }}
        />
        {/* Gradient overlay to enhance text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/50 to-slate-950/80 z-10 pointer-events-none" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8">
          <div className="border-l-4 border-secondary pl-5 md:pl-7">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md animate-fade-in">Contact Us</h1>
            <p className="text-secondary text-xs md:text-sm mt-3 tracking-widest uppercase font-bold drop-shadow-md">Connect with our manufacturing plant managers</p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left panel: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-2 bg-secondary/15 px-3 py-1 rounded inline-block">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight tracking-tight">
                We Are Here to Assist Your Business
              </h2>
              <div className="w-12 h-1 bg-secondary mt-3"></div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                Whether you want to place a bulk order for PVC moulds, request customization parameters, or purchase concrete pan mixers, get in touch with our team.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-primary/10 text-primary p-3.5 rounded-xl flex-shrink-0">
                  <MapPin size={22} className="stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">Office & Plant Address</h4>
                  <p className="text-slate-500 text-sm mt-1.5 leading-relaxed font-medium">
                    Satwara Estate, Near Panchasar Rd, Rajnagar, Sardar Nagar, Morbi, Gujarat 363641
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-primary/10 text-primary p-3.5 rounded-xl flex-shrink-0">
                  <Phone size={22} className="stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">Phone Number</h4>
                  <p className="text-slate-500 text-sm mt-1.5 leading-relaxed font-medium">
                    Mobile: <a href="tel:+919316642648" className="text-primary hover:underline font-extrabold">+91 93166 42648</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-primary/10 text-primary p-3.5 rounded-xl flex-shrink-0">
                  <Mail size={22} className="stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">Email Address</h4>
                  <p className="text-slate-500 text-sm mt-1.5 leading-relaxed font-medium">
                    Email: <a href="mailto:kanzariyasunil249@gmail.com" className="text-primary hover:underline font-extrabold">kanzariyasunil249@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-primary/10 text-primary p-3.5 rounded-xl flex-shrink-0">
                  <Clock size={22} className="stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">Office Hours</h4>
                  <p className="text-slate-500 text-sm mt-1.5 leading-relaxed font-medium">
                    Monday – Saturday: 09:00 AM – 07:00 PM <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Chat Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/919316642648?text=Hello%20SR%20PLASTIC,%20I%20want%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl shadow-md hover:shadow-lg hover:shadow-emerald-500/20 transition duration-300 text-sm md:text-base w-full justify-center tracking-widest uppercase"
              >
                <svg 
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 448 512" 
                  className="w-5 h-5 md:w-6 md:h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                </svg>
                <span>CHAT QUICKLY ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 md:p-10 shadow-md hover:shadow-lg transition-all duration-300 h-fit">
            <h3 className="font-extrabold text-slate-800 text-xl mb-1">Send a Message</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">Fill in details about your plant setups or tile manufacturing requirements.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 mx-auto rounded-full flex items-center justify-center mb-4 shadow">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Message Successfully Sent!</h3>
                <p className="text-slate-600 text-sm font-medium">
                  Thank you for writing. Our customer support executive will contact you shortly via email or phone.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition text-sm shadow-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-slate-400 font-medium"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number *</label>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-slate-400 font-medium"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-slate-400 font-medium"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Inquiry Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-slate-400 font-medium"
                    placeholder="e.g. Bulk purchase of Cosmic PVC mould"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Detailed Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none resize-none placeholder-slate-400 font-medium"
                    placeholder="Describe your plant size, quantities needed, shipping location..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-primary/20 transition duration-300 text-sm md:text-base flex items-center justify-center space-x-2.5 disabled:opacity-50 tracking-widest uppercase"
                >
                  <Send size={18} className="text-secondary" />
                  <span>{submitting ? 'Submitting Message...' : 'SUBMIT CONTACT FORM'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="h-[450px] w-full border-t border-slate-200 relative overflow-hidden">
        <iframe
          title="Google Map Location"
          src="https://maps.google.com/maps?q=Satwara%20Estate,%20Near%20Panchasar%20Rd,%20Rajnagar,%20Sardar%20Nagar,%20Morbi,%20Gujarat%20363641&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
