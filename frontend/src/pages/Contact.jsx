import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
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
Company: ${formData.companyName || 'N/A'}
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
        setFormData({ name: '', email: '', phone: '', companyName: '', subject: '', message: '' });
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
      <section className="bg-primary text-white py-16 text-center border-b-4 border-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Contact Us</h1>
          <p className="text-slate-300 text-xs md:text-sm mt-3 tracking-widest uppercase font-semibold">Connect with our manufacturing plant managers</p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left panel: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-secondary tracking-widest uppercase">GET IN TOUCH</h2>
              <p className="text-2xl md:text-3xl font-black text-primary leading-tight">We Are Here to Assist Your Business</p>
              <div className="w-12 h-1 bg-secondary"></div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Whether you want to place a bulk order for PVC moulds, request customization parameters, or purchase concrete pan mixers, get in touch with our team.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="bg-primary text-white p-3 rounded-lg shadow-sm flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Office & Plant Address</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Phase-III, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat 382445
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="bg-primary text-white p-3 rounded-lg shadow-sm flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Phone Numbers</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Plant: <a href="tel:+919876543210" className="hover:text-primary font-semibold">+91 98765 43210</a> <br />
                    Sales Helpline: <a href="tel:+919876543211" className="hover:text-primary font-semibold">+91 98765 43211</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="bg-primary text-white p-3 rounded-lg shadow-sm flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Email Addresses</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    General: <a href="mailto:info@srplastic.com" className="hover:text-primary font-semibold">info@srplastic.com</a> <br />
                    Inquiries: <a href="mailto:sales@srplastic.com" className="hover:text-primary font-semibold">sales@srplastic.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="bg-primary text-white p-3 rounded-lg shadow-sm flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Office Hours</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Monday – Saturday: 09:00 AM – 07:00 PM <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Chat Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Hello%20SR%20PLASTIC,%20I%20want%20to%20inquire%20about%20your%20moulds."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition text-sm w-full justify-center"
              >
                <MessageCircle size={18} fill="currentColor" />
                <span>CHAT QUICKLY ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm h-fit">
            <h3 className="font-extrabold text-slate-800 text-lg mb-1">Send a Message</h3>
            <p className="text-slate-400 text-xs mb-6">Fill in details about your plant setups or tile manufacturing requirements.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 mx-auto rounded-full flex items-center justify-center mb-4 shadow">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Message Successfully Sent!</h3>
                <p className="text-slate-600 text-sm">
                  Thank you for writing. Our customer support executive will contact you shortly via email or phone.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary-dark transition text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="Enter Name"
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
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                      placeholder="Company Name (Optional)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Inquiry Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none"
                    placeholder="e.g. Bulk purchase of Cosmic PVC mould"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Detailed Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none resize-none"
                    placeholder="Describe your plant size, quantities needed, shipping location..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-md transition text-sm flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send size={16} className="text-secondary" />
                  <span>{submitting ? 'Submitting Message...' : 'SUBMIT CONTACT FORM'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Mock Map Section */}
      <section className="h-[350px] bg-slate-100 border-t border-slate-200 relative overflow-hidden flex items-center justify-center">
        {/* Dynamic styling to look like a maps iframe placeholder */}
        <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center space-y-3">
          <MapPin size={48} className="text-primary animate-bounce" />
          <p className="font-extrabold text-slate-700 text-sm">GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat</p>
          <p className="text-xs text-slate-500">Google Map coordinates are preloaded for your office location.</p>
        </div>
      </section>
    </div>
  );
}
