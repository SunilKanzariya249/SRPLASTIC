import React from 'react';
import { ShieldCheck, Award, ThumbsUp, Wrench, FileText, CheckCircle2 } from 'lucide-react';

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
      <section className="bg-primary text-white py-16 text-center border-b-4 border-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">About SR PLASTIC</h1>
          <p className="text-slate-300 text-xs md:text-sm mt-3 tracking-widest uppercase font-semibold">Our Journey, Quality focus & Core Pillars</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-secondary tracking-widest uppercase">WHO WE ARE</h2>
            <p className="text-2xl md:text-3xl font-black text-primary leading-tight">
              Leading the Construction Precast Mould Industry Since 2014
            </p>
            <div className="w-12 h-1 bg-secondary"></div>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              SR PLASTIC is a premier manufacturer, supplier, and exporter of high-grade PVC moulds, rubber moulds, and cover block systems for concrete precasts. Based in Gujarat, we serve over 1,200 factories across the country with precision-engineered casting solutions.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We also fabricate heavy-duty plant mixers, color mixers, and vibratory casting tables. Our goal is to streamline the paver block manufacturing process, allowing our clients to produce highly durable, smooth-surface concrete tiles with minimal rejection rates.
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
            <h3 className="font-extrabold text-slate-800 text-lg">Our Quality Assurance Commitment</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-slate-600">
                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <span>100% inspections of polymer melt parameters to prevent cracking.</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-600">
                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <span>Heavy-duty steel plates (8mm to 10mm thickness) on vibratory machines.</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-600">
                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <span>UV-resistant color oxides that do not fade under hot sun exposure.</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-600">
                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <span>Strict weight parameters on all cement spacer cover blocks.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center font-black">M</div>
            <h3 className="font-extrabold text-slate-800 text-base">Our Mission</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To supply factory operators with high-strength moulds and robust machinery that maximize casting throughput and minimize raw material waste.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center font-black">V</div>
            <h3 className="font-extrabold text-slate-800 text-base">Our Vision</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To be India’s most trusted manufacturer for construction precast moulds, pioneering innovative polymer molds and energy-efficient mixers.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center font-black">Q</div>
            <h3 className="font-extrabold text-slate-800 text-base">Quality Values</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
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
