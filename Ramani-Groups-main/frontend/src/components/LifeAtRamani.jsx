import React from 'react';
import { ArrowRight } from 'lucide-react';
import { lifeImages } from '../mock';

export default function LifeAtRamani() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="gold-underline text-navy text-xl md:text-2xl font-bold tracking-[0.2em]">LIFE AT RAMANI</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {lifeImages.map((img, i) => (
            <div key={i} className="relative h-32 md:h-36 rounded-lg overflow-hidden group cursor-pointer">
              <img src={img} alt={`Life at Ramani ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors" />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="bg-navy text-white px-6 py-3 rounded inline-flex items-center gap-3 text-sm hover:bg-navy-dark transition-colors">
            Join Our Team <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      </div>
    </section>
  );
}
