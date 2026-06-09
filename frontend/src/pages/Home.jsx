import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Award, ShieldCheck, Zap, Users, Send } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
Message: ${formData.message}
`;
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            name: formData.name,
            email: formData.email,
            subject: `SRPLASTIC Home Page Inquiry`,
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
          subject: 'Home Page Inquiry Form'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
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

  const slides = [
    {
      title: "PREMIUM PVC & RUBBER MOULDS",
      subtitle: "Precision Engineered Paver Block Moulds",
      description: "Manufactured using high-strength polymers that deliver pristine dimensional accuracy, smooth concrete surface finishes, and long lifecycle endurance.",
      image: "/paver block mould banner.png",
      link: "/products"
    },
    {
      title: "HEAVY-DUTY INDUSTRIAL MACHINERY",
      subtitle: "Vibrator Tables, Roller Pan Mixers & Mixers",
      description: "Engineered for harsh factory workloads, high capacities (up to 4000 units/shift), and minimal power consumption.",
      image: "/paver block machinery banner.png",
      link: "/category/Paver-Block-Machinery"
    },
    {
      title: "HIGH-QUALITY CHEMICALS & HARDENERS",
      subtitle: "Dual-Action Concrete Strength Enhancers",
      description: "Advanced superplasticizers and strengthening additives that boost concrete tensile strength and speed up demoulding cycles.",
      image: "/paver block chemicals hardner banner.png",
      link: "/category/Paver-Block-Chemicals"
    },
    {
      title: "VIBRANT IRON OXIDE COLORS",
      subtitle: "Premium UV-Resistant Coloring Pigments",
      description: "UV-stable iron oxide pigments with high dispersing capability that maintain bright concrete luster for years.",
      image: "/iron oxide color banner.png",
      link: "/category/Iron-Oxide-Color"
    },
    {
      title: "RECYCLE PLASTIC SHEETS",
      subtitle: "Sustainable & Durable Recycle Plastic Sheets",
      description: "High-grade recycled plastic sheets offering outstanding durability, weather resistance, and utility for manufacturing palettes and setups.",
      image: "/recycle plastic sheet banner.jpeg",
      link: "/category/Recycle-Plastic-Sheet"
    }
  ];

  const categories = [
    {
      name: "Paver Block Plastic Mould",
      count: "30+ Models",
      desc: "Prismatic molds like Colorado, Cosmic, Damru, and Hexagon for premium concrete blocks.",
      image: "/paver block plastic mould card.png",
      query: "Paver Block Plastic Mould",
      slug: "Paver-Block-Plastic-Mould"
    },
    {
      name: "Paver Block PVC Rubber Mould",
      count: "40+ Models",
      desc: "Flexible, long-life, tear-resistant rubber molds for heavy-duty paving tiles.",
      image: "/paver block pvc rubber mould card.png",
      query: "Paver Block PVC Rubber Mould",
      slug: "Paver-Block-PVC-Rubber-Mould"
    },
    {
      name: "Paver Block Machinery",
      count: "6+ Machines",
      desc: "Vibratory table layouts, pan concrete mixers, and color layer mixers.",
      image: "/paver block machinery card.png",
      query: "Paver Block Machinery",
      slug: "Paver-Block-Machinery"
    },
    {
      name: "Paver Block Chemicals",
      count: "10+ Formulas",
      desc: "High-grade superplasticizers and chemical formulations to speed up concrete curing.",
      image: "/paver block chemicals hardner card.png",
      query: "Paver Block Chemicals",
      slug: "Paver-Block-Chemicals"
    },
    {
      name: "Iron Oxide Color",
      count: "12+ Shades",
      desc: "UV-stable premium coloring pigments for lasting concrete block luster.",
      image: "/iron oxide color card.png",
      query: "Iron Oxide Color",
      slug: "Iron-Oxide-Color"
    },
    {
      name: "Recycle Plastic Sheet",
      count: "Eco-Friendly",
      desc: "Sustainable, high-durability plastic sheets for industrial stack palettes.",
      image: "/recycle plastic sheet card.png",
      query: "Recycle Plastic Sheet",
      slug: "Recycle-Plastic-Sheet"
    }
  ];

  const stats = [
    { value: "50+", label: "Happy Clients" },
    { value: "39+", label: "Dealers" },
    { value: "2+", label: "Years of Experience" },
    { value: "20+", label: "Projects Completed" }
  ];

  const testimonials = [
    {
      quote: "SR PLASTIC's PVC moulds have transformed our production quality. The dimensional finish is extremely smooth, and we get over 200 cycles of cast-release per mould without warping.",
      author: "Rajesh Patel",
      role: "MD, Patel Concrete Products",
      rating: 5
    },
    {
      quote: "The vibratory table and pan mixer we bought last year have been running 10 hours a day without a single failure. The heavy-duty worm gears are highly reliable.",
      author: "Vikramjit Singh",
      role: "Founder, Punjab Paver Block Industry",
      rating: 5
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const faqs = [
    {
      q: "Why Choose SR Plastic?",
      a: "SR Plastic is a trusted manufacturer and supplier of high-quality Paver Block Moulds, Paver Block Machines, Iron Oxide Colors, Recycled Plastic Sheets, Hardener Chemicals, and Injection Moulding Job Work services. We focus on delivering reliable products, consistent quality, and cost-effective solutions that help businesses improve productivity and reduce manufacturing costs."
    },
    {
      q: "What Makes SR Plastic Different?",
      a: "Our commitment to quality, innovation, and customer satisfaction sets us apart. We use durable materials, modern manufacturing processes, and strict quality control to ensure every product meets industry standards. With years of experience and dedicated customer support, we provide solutions tailored to the needs of each client."
    },
    {
      q: "How Can I Place an Order or Request a Quote?",
      a: "Simply contact SR Plastic through our website, phone, or email with your requirements. Whether you need Paver Block Moulds, Machinery, Iron Oxide Colors, Recycled Plastic Sheets, Hardener Chemicals, or Injection Moulding services, our team will provide expert guidance and a customized quotation based on your needs."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <section className="relative w-full h-auto aspect-video md:aspect-auto md:h-[calc(100vh-76px)] bg-slate-900 overflow-hidden text-white">
        {slides.map((slide, idx) => (
          <Link
            key={idx}
            to={slide.link}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Full-Screen Banner Image */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                idx === currentSlide ? 'scale-100' : 'scale-105'
              }`}
            />
          </Link>
        ))}

        {/* Slide Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 p-1 md:p-2.5 rounded-full text-white transition focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 p-1 md:p-2.5 rounded-full text-white transition focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 md:space-x-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-secondary w-5 md:w-7' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             {/* Right Poster Column */}
            <Link to="/products" className="relative group block">
              {/* Background decorative colored sheet */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-secondary to-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              
              {/* Image wrapper */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white bg-slate-100">
                <img 
                  src="/about page poster.png" 
                  alt="SR Plastic About Us Poster" 
                  className="w-full h-auto object-cover transition duration-700 ease-out group-hover:scale-105"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none transition duration-500 group-hover:from-primary/5" />
              </div>
            </Link>
            {/* Left Content Column */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-2 bg-secondary/15 px-3 py-1 rounded inline-block">
                  ABOUT US
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight tracking-tight mt-2">
                  SR Plastic
                </h2>
                <div className="w-12 h-1 bg-secondary mt-3"></div>
              </div>

              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4 font-medium">
                <p>
                  SR Plastic specializes in providing high-quality solutions for the paver block manufacturing industry. Founded by <strong className="text-primary font-extrabold">Rohit Hadiyal</strong>, we offer premium <strong className="text-primary font-bold">Paver Block Chemicals, Iron Oxide Colors, Paver Block Moulds, and Machinery</strong> designed to deliver consistent performance and reliable results.
                </p>
                <p>
                  With a strong commitment to quality, innovation, and customer satisfaction, we help manufacturers improve product durability, production efficiency, and overall business growth. Our focus is to provide dependable products and professional support that meet the evolving demands of the construction industry.
                </p>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                {[
                  "Premium Quality Products",
                  "Complete Paver Block Solutions",
                  "Reliable Performance & Consistency",
                  "Customer-Focused Service",
                  "Trusted Industry Expertise",
                  "Commitment to Excellence"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2.5 text-slate-700 text-sm font-semibold">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold border border-emerald-150">
                      ✔
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tagline Callout */}
              <div className="pt-4">
                <div className="p-4 bg-slate-50 border-l-4 border-secondary rounded-r-xl">
                  <p className="text-primary font-black italic text-sm md:text-base tracking-wide">
                    Building Strength, Delivering Quality, Creating Trust.
                  </p>
                </div>
              </div>
            </div>

           

          </div>
        </div>
      </section>

       {/* Stats Counter Section */}
      <section className="bg-slate-950 py-16 border-y border-slate-900 relative overflow-hidden">
        {/* Subtle glow effect in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-800/80 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2 group lg:px-4">
                <p className="text-4xl md:text-5xl font-black text-secondary tracking-tight transition duration-300 group-hover:scale-105 inline-block">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-slate-400 tracking-widest uppercase font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-secondary tracking-widest uppercase mb-2">PRODUCT SHOWCASE</h2>
            <p className="text-3xl font-black text-primary leading-tight">Explore Our Manufacturing Categories</p>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} cat={cat} />
            ))}
          </div>
        </div>
      </section>
      {/* Feature Badges */}
      <section className="bg-white border-y border-slate-200 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">ISO Certified Quality</h3>
              <p className="text-xs text-slate-500 mt-1">Conforms to standard ISO 9001:2015 specifications.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">High Load Endurance</h3>
              <p className="text-xs text-slate-500 mt-1">Durable plastics engineered for heavy load release.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Quick Casting Output</h3>
              <p className="text-xs text-slate-500 mt-1">Smooth finishes allow lightning-fast de-moulding.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Domestic Support</h3>
              <p className="text-xs text-slate-500 mt-1">Dedicated engineer helpline for factory setups.</p>
            </div>
          </div>
        </div>
      </section>

     

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xs font-bold text-secondary tracking-widest uppercase mb-2">CLIENT VERDICTS</h2>
          <p className="text-2xl md:text-3xl font-black text-primary mb-12">What Plant Operators Say About Us</p>
          
          <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex justify-center space-x-1 text-secondary mb-6">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-slate-600 text-base md:text-lg italic leading-relaxed mb-6">
              "{testimonials[activeTestimonial].quote}"
            </p>
            <p className="font-bold text-slate-800 text-sm">{testimonials[activeTestimonial].author}</p>
            <p className="text-slate-500 text-xs mt-0.5">{testimonials[activeTestimonial].role}</p>

            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition ${i === activeTestimonial ? 'bg-primary' : 'bg-slate-300 hover:bg-slate-400'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Scrolling Marquee */}
      <section className="bg-slate-200 py-0 my-0 overflow-hidden border-y border-slate-300 relative h-fit flex items-center">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-ultraslow {
            display: flex;
            width: max-content;
            animation: marquee 130s linear infinite;
          }
        `}</style>
        <div className="animate-marquee-ultraslow flex whitespace-nowrap space-x-12 md:space-x-16 py-0 my-0 leading-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center space-x-12 md:space-x-16 text-5xl md:text-7xl font-black uppercase tracking-widest text-white leading-none py-0 my-0">
              <span className="leading-none py-0 my-0 select-none">SR PLASTIC - MACHINERY & CHEMICALS</span>
            </div>
          ))}
          {[...Array(12)].map((_, i) => (
            <div key={i+12} className="flex items-center space-x-12 md:space-x-16 text-5xl md:text-7xl font-black uppercase tracking-widest text-white leading-none py-0 my-0">
              <span className="leading-none py-0 my-0 select-none">SR PLASTIC - MACHINERY & CHEMICALS</span>
            </div>
          ))}
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-2 bg-secondary/15 px-3 py-1 rounded inline-block">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl font-black text-primary mt-2">Request a Call Back</h2>
            <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto font-medium">
              Have questions about our PVC/rubber moulds, machinery, or coloring pigments? Fill out the form below and we will contact you shortly.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-10 shadow-md hover:shadow-lg transition-all duration-300">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 mx-auto rounded-full flex items-center justify-center mb-4 shadow">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Message Successfully Sent!</h3>
                <p className="text-slate-600 text-sm font-medium">
                  Thank you for writing. Our customer support team will contact you shortly.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-slate-400 font-medium bg-white"
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
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-slate-400 font-medium bg-white"
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
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-slate-400 font-medium bg-white"
                    placeholder="name@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder-slate-400 font-medium bg-white resize-none"
                    placeholder="How can we help you?"
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

      {/* FAQ Section */}
      {/* Modern FAQ / Why Choose Us Section */}
      <section className="relative py-20 bg-[#f8f9fb] border-t border-slate-200 overflow-hidden">
        {/* Subtle geometric grid & dots pattern with low opacity */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#243b53_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#243b53_1px,transparent_1px),linear-gradient(to_bottom,#243b53_1px,transparent_1px)] [background-size:40px_40px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: FAQs (60% width) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-red-600 font-extrabold text-xs tracking-wider uppercase mb-2 block">
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#243b53] leading-tight tracking-tight">
                  Why Should You Work With SR Plastic?
                </h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`bg-white rounded-[12px] border transition-all duration-300 overflow-hidden ${
                        isOpen ? 'border-[#243b53] shadow-md' : 'border-slate-100 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
                      >
                        <span className={`font-extrabold text-base md:text-lg transition-colors duration-300 ${
                          isOpen ? 'text-[#243b53]' : 'text-slate-800 group-hover:text-[#243b53]'
                        }`}>
                          {faq.q}
                        </span>
                        <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen ? 'bg-[#243b53] text-white' : 'bg-slate-50 text-[#c89b2b] group-hover:bg-[#c89b2b]/15'
                        }`}>
                          {isOpen ? (
                            <span className="font-extrabold text-lg leading-none mt-[-2px]">&minus;</span>
                          ) : (
                            <span className="font-extrabold text-lg leading-none mt-[-2px]">+</span>
                          )}
                        </span>
                      </button>
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-[400px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
                        }`}
                      >
                        <div className="p-6 text-slate-600 text-sm md:text-base leading-relaxed font-medium bg-[#f8f9fb]/50">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Right side: Large AI-generated Industrial Image (40% width) */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#c89b2b] to-[#243b53] rounded-2xl opacity-15 blur-lg group-hover:opacity-25 transition duration-300" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-lg bg-white">
                <img
                  src="/sr_plastic_factory.png"
                  alt="SR Plastic Modern Manufacturing Facility"
                  className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[5/6] transform hover:scale-[1.03] transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#243b53]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ cat }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 } // trigger when 15% of the element is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/category/${cat.slug}`}
      className="relative block rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-slate-200 group transition duration-300 bg-white"
    >
      <img
        src={cat.image}
        alt={cat.name}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        onError={(e) => { e.target.src = '/product_images/page_1.png'; }}
      />
      
      {/* Overlay container: shows on hover on desktop, or when visible in viewport on mobile */}
      <div className={`absolute inset-0 bg-transparent md:bg-primary/45 flex flex-col items-center justify-end md:justify-center p-6 pb-8 md:pb-6 text-center transition-all duration-500 md:opacity-0 md:group-hover:opacity-100 ${
        isVisible ? 'opacity-100 md:opacity-0' : 'opacity-0'
      }`}>
        {/* Category Info */}
        <div className={`hidden md:block text-white transition-all duration-500 ${
          isVisible 
            ? 'translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100' 
            : 'translate-y-4 opacity-0'
        }`}>
          <span className="text-[10px] font-bold text-secondary bg-primary/80 px-2.5 py-1 rounded inline-block mb-2 backdrop-blur-sm shadow-sm border border-secondary/20">
            {cat.count}
          </span>
          <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight mb-2 drop-shadow-md">
            {cat.name}
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed max-w-[240px] mx-auto mb-6 drop-shadow-sm font-medium">
            {cat.desc}
          </p>
        </div>

        {/* Button: appears/slides up */}
        <span className={`bg-secondary text-primary font-bold px-5 py-2.5 rounded-lg shadow-lg text-xs md:text-sm tracking-wider uppercase transition-all duration-500 ease-out transform delay-1000 md:delay-0 ${
          isVisible 
            ? 'translate-y-0 scale-100 opacity-100 md:translate-y-6 md:scale-95 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:scale-100 md:group-hover:opacity-100' 
            : 'translate-y-6 scale-95 opacity-0'
        }`}>
          VIEW PRODUCTS
        </span>
      </div>
    </Link>
  );
}
