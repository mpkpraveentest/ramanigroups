import React from 'react';
import { Quote } from 'lucide-react';
import { leaders } from '../mock';

export default function Leadership() {
  return (
    <section className="py-20 bg-navy text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <div className="text-gold tracking-[0.2em] text-sm font-semibold mb-2">OUR LEADERSHIP</div>
            <h2 className="text-3xl md:text-4xl font-bold">Meet Our Leaders</h2>
          </div>
          <p className="text-white/70 max-w-lg text-sm leading-relaxed">
            The vision and leadership of our founders and executives drive Ramani Groups towards sustainable growth and excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {leaders.map((l, i) => (
            <div key={i} className="border border-gold/40 rounded-lg p-5 flex gap-5 bg-navy-dark/30 card-hover">
              <div className="w-32 md:w-40 flex-shrink-0">
                <img src={l.image} alt={l.name} className="w-full h-44 object-cover rounded" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gold text-[10px] tracking-[0.15em] font-semibold mb-1">{l.role}</div>
                <div className="font-bold text-white mb-3 text-base">{l.name}</div>
                <Quote className="w-4 h-4 text-gold mb-1" />
                <p className="text-white/75 text-xs leading-relaxed mb-3">{l.quote}</p>
                <div className="text-gold text-xs font-medium">{l.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
