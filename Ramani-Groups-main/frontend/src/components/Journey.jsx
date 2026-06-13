import React from 'react';
import { Flag, Car } from 'lucide-react';
import { journey } from '../mock';

export default function Journey() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="gold-underline text-navy text-xl md:text-2xl font-bold tracking-[0.2em]">OUR JOURNEY</h2>
        </div>

        <div className="relative">
          <div className="hidden md:block timeline-line" />
          <div className="grid grid-cols-2 md:grid-cols-7 gap-6 relative z-10">
            {journey.map((j, i) => {
              const Icon = j.icon === 'flag' ? Flag : Car;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-gold flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-navy font-bold text-sm mb-2">{j.year}</div>
                  <div className="text-gray-500 text-xs whitespace-pre-line leading-snug">{j.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
