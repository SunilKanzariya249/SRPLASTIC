import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Award, ShieldCheck, Zap, Users } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const slides = [
    {
      title: "PREMIUM PVC & RUBBER MOULDS",
      subtitle: "Precision Engineered Paver Block Moulds",
      description: "Manufactured using high-strength polymers that deliver pristine dimensional accuracy, smooth concrete surface finishes, and long lifecycle endurance.",
      image: "/paver block mould banner.png",
      link: "/products?category=PVC Mould"
    },
    {
      title: "HEAVY-DUTY INDUSTRIAL MACHINERY",
      subtitle: "Vibrator Tables, Roller Pan Mixers & Mixers",
      description: "Engineered for harsh factory workloads, high capacities (up to 4000 units/shift), and minimal power consumption.",
      image: "/paver block machinery banner.png",
      link: "/products?category=Machinery"
    },
    {
      title: "HIGH-QUALITY CHEMICALS & HARDENERS",
      subtitle: "Dual-Action Concrete Strength Enhancers",
      description: "Advanced superplasticizers and strengthening additives that boost concrete tensile strength and speed up demoulding cycles.",
      image: "/paver block chemicals hardner banner.png",
      link: "/products?category=Chemicals & Colors"
    },
    {
      title: "VIBRANT IRON OXIDE COLORS",
      subtitle: "Premium UV-Resistant Coloring Pigments",
      description: "UV-stable iron oxide pigments with high dispersing capability that maintain bright concrete luster for years.",
      image: "/iron oxide color banner.png",
      link: "/products?category=Chemicals & Colors"
    }
  ];

  const categories = [
    {
      name: "PVC Paver Moulds",
      count: "30+ Models",
      desc: "Prismatic molds like Colorado, Cosmic, Damru, and Hexagon for premium concrete blocks.",
      image: "/product_images/p3_cosmic_paver.png",
      query: "PVC Mould"
    },
    {
      name: "Rubber Moulds",
      count: "40+ Models",
      desc: "Flexible, long-life, tear-resistant rubber molds for heavy-duty paving tiles.",
      image: "/product_images/p30_zigzag_a_rubber_mould.png",
      query: "Rubber Mould"
    },
    {
      name: "Cover Blocks",
      count: "10+ Sizes",
      desc: "Round and square concrete spacer cover blocks from 20mm to 50mm.",
      image: "/product_images/p78_cover_block_square_2025_mm_(36_kvt).png",
      query: "Cover Block"
    },
    {
      name: "Machinery & Mixers",
      count: "6+ Machines",
      desc: "Vibratory table layouts, pan concrete mixers, and color layer mixers.",
      image: "/product_images/p87_vibrator_table_machine_for_paver_block.png",
      query: "Machinery"
    }
  ];

  const stats = [
    { value: "1,200+", label: "Happy Client Factories" },
    { value: "95+", label: "Product Catalogue Size" },
    { value: "12+", label: "Years Manufacturing Exp." },
    { value: "24/7", label: "Client Support & Guidance" }
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
      q: "What materials are used in SR PLASTIC's PVC & Rubber moulds?",
      a: "Our PVC moulds are manufactured from premium virgin polypropylene/plastic polymers, which offer high flexural strength and surface gloss. Our rubber moulds are engineered from premium vulcanized rubber for excellent flexibility and easy demoulding."
    },
    {
      q: "How many cycles can we expect from a single paver block mould?",
      a: "With proper care, cleaning, and demoulding agents, our PVC moulds easily deliver 150 to 200+ cast cycles. Our heavy-duty rubber moulds can withstand 300+ casting cycles."
    },
    {
      q: "Do you supply machinery for starting a new paver block factory?",
      a: "Yes! We provide the full machinery package including Vibrator Tables, Roller Pan Mixers, Color Mixers, and raw materials like iron oxide colors, hardener chemicals, and recycling stacking pallets."
    },
    {
      q: "What is your typical order delivery time?",
      a: "For catalog moulds, orders are dispatched within 2-4 business days. For customized machinery, delivery time ranges between 7 to 10 working days, depending on current orders."
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
      <section className="relative h-[450px] md:h-[calc(100vh-76px)] bg-slate-900 overflow-hidden text-white">
        {slides.map((slide, idx) => (
          <div
            key={idx}
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
          </div>
        ))}

        {/* Slide Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 p-2.5 rounded-full text-white transition focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 p-2.5 rounded-full text-white transition focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'bg-secondary w-7' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
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

      {/* Categories Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-secondary tracking-widest uppercase mb-2">PRODUCT SHOWCASE</h2>
            <p className="text-3xl font-black text-primary leading-tight">Explore Our Manufacturing Categories</p>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden card-glow flex flex-col border border-slate-200">
                <div className="h-48 overflow-hidden bg-slate-100 flex items-center justify-center p-4">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full max-w-[90%] object-contain hover:scale-105 transition duration-300"
                    onError={(e) => { e.target.src = '/product_images/page_1.png'; }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-slate-100 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base mb-2">{cat.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-6">{cat.desc}</p>
                  <Link
                    to={`/products?category=${cat.query}`}
                    className="text-primary hover:text-secondary-dark text-xs font-bold flex items-center space-x-1.5 self-start group"
                  >
                    <span>View Products</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-4xl md:text-5xl font-black text-secondary">{stat.value}</p>
              <p className="text-xs md:text-sm text-slate-300 tracking-wider uppercase font-semibold">{stat.label}</p>
            </div>
          ))}
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

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-secondary tracking-widest uppercase mb-2">HELP CENTER</h2>
            <p className="text-3xl font-black text-primary">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-slate-800 hover:text-primary transition focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-secondary ml-4">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="p-5 border-t border-slate-100 bg-slate-50 text-slate-600 text-xs md:text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
