import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, ThumbsUp, Wrench, FileText, CheckCircle2, Target, Eye, Gem } from 'lucide-react';

export default function About() {
  const benefits = [
    {
      icon: <ShieldCheck size={28} className="text-secondary" />,
      title: "Virgin Polymer Polymers",
      desc: "We use only top-tier virgin polypropylene and plastic elastomers to manufacture PVC moulds, ensuring excellent elasticity and load release cycles."
    },
    {
      icon: <Wrench size={28} className="text-secondary" />,
      title: "Customized Designs",
      desc: "We create tailor-made moulds matching your unique dimensions, thickness, and patterns to differentiate your bricks in the market."
    },
    {
      icon: <Award size={28} className="text-secondary" />,
      title: "ISO Certification Standards",
      desc: "Our quality checkpoints adhere to strict ISO 9001:2015 management guidelines to guarantee flawless production batches."
    },
    {
      icon: <ThumbsUp size={28} className="text-secondary" />,
      title: "End-to-End Plant Consultations",
      desc: "For new factories, we consult and supply the complete vibratory table and pan mixer setup to align your machinery layout correctly."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
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
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md animate-fade-in">About SR PLASTIC</h1>
            <p className="text-secondary text-xs md:text-sm mt-3 tracking-widest uppercase font-bold drop-shadow-md">Our Journey, Quality focus & Core Pillars</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             {/* Left Poster Column */}
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

            {/* Right Content Column */}
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

      {/* Vision Mission Values */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 border-b-4 border-b-secondary shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-tr from-secondary to-amber-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-secondary/25 mb-6 group-hover:rotate-6 transition duration-300">
              <Target size={24} className="stroke-[2]" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg mb-2">Our Mission</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To supply factory operators with high-strength moulds and robust machinery that maximize casting throughput and minimize raw material waste.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 border-b-4 border-b-secondary shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-tr from-secondary to-amber-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-secondary/25 mb-6 group-hover:rotate-6 transition duration-300">
              <Eye size={24} className="stroke-[2]" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg mb-2">Our Vision</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To be India’s most trusted manufacturer for construction precast moulds, pioneering innovative polymer molds and energy-efficient mixers.
            </p>
          </div>

          {/* Quality Values Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 border-b-4 border-b-secondary shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-tr from-secondary to-amber-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-secondary/25 mb-6 group-hover:rotate-6 transition duration-300">
              <Gem size={24} className="stroke-[2]" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg mb-2">Quality Values</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Zero tolerance for material impurities, prompt shipments, absolute integrity in business deals, and continuous customer help.
            </p>
          </div>

        </div>
      </section>

      {/* Benefits Matrix */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-secondary tracking-widest uppercase mb-2">ADVANTAGES</h2>
            <p className="text-3xl font-black text-primary">Why Paver Manufacturers Choose SR PLASTIC</p>
            <div className="w-12 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex space-x-5 p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow transition duration-300">
                <div className="bg-primary text-white p-3.5 rounded-lg flex-shrink-0 h-fit shadow-md">
                  {benefit.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-800 text-base">{benefit.title}</h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Certification Grid */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-center font-bold text-slate-400 text-xs uppercase tracking-widest mb-10">REGISTRATIONS & TRUST SIGNALS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-lg p-5 flex items-center space-x-4 shadow-sm">
              <FileText size={32} className="text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-800 text-sm">ISO 9001:2015</p>
                <p className="text-[10px] text-slate-400">Quality Management System</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-5 flex items-center space-x-4 shadow-sm">
              <FileText size={32} className="text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-800 text-sm">MSME Registered</p>
                <p className="text-[10px] text-slate-400">Ministry of Micro/Small/Medium Enterprises</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-5 flex items-center space-x-4 shadow-sm">
              <FileText size={32} className="text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-800 text-sm">GST Registered</p>
                <p className="text-[10px] text-slate-400">Government of India GSTIN Compliance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
