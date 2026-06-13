import React from 'react';
import { ArrowRight } from 'lucide-react';
import { news } from '../mock';

export default function News() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="gold-underline text-navy text-xl md:text-2xl font-bold tracking-[0.2em]">NEWS &amp; UPDATES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          {news.map((n, i) => (
            <div key={i} className="card-hover bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="h-36 overflow-hidden">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-gold text-xs font-semibold mb-1">{n.category}</div>
                <div className="text-navy font-semibold text-sm leading-snug whitespace-pre-line mb-3 flex-1">{n.title}</div>
                <div className="text-gray-400 text-xs">{n.date}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button className="btn-gold px-5 py-3 rounded inline-flex items-center gap-2 text-sm whitespace-nowrap">
              View All News <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
