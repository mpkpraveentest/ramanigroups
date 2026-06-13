import React from 'react';
import { businesses } from '../mock';

function SectionTitle({ children }) {
  return (
    <div className="text-center mb-12">
      <h2 className="gold-underline text-navy text-xl md:text-2xl font-bold tracking-[0.2em]">{children}</h2>
    </div>
  );
}

function BrandLogo({ brand }) {
  const { text, sub, color, italic, size, tracking, bordered, stacked, font } = brand;
  const fontFamily = font === 'serif' ? 'serif' : '';
  const italicCls = italic ? 'italic' : '';
  const trackCls = tracking || '';

  if (bordered) {
    return (
      <div className="border-2 px-2 py-0.5 rounded" style={{ borderColor: color }}>
        <span className={`font-bold ${size} ${trackCls}`} style={{ color, fontFamily }}>{text}</span>
      </div>
    );
  }
  if (stacked) {
    return (
      <div className={`leading-none text-center font-bold ${italicCls} ${size}`} style={{ color, fontFamily }}>
        <div>{text}</div>
        {sub && <div className="-mt-0.5">{sub}</div>}
      </div>
    );
  }
  return (
    <div className={`text-center leading-tight`}>
      <div className={`font-bold ${size} ${italicCls} ${trackCls}`} style={{ color, fontFamily }}>{text}</div>
      {sub && <div className={`text-xs ${italicCls}`} style={{ color, fontFamily }}>{sub}</div>}
    </div>
  );
}

export default function Businesses() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionTitle>OUR BUSINESSES</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {businesses.map((b, i) => (
            <div key={i} className="card-hover bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center">
              <div className="h-14 flex items-center justify-center mb-3">
                <BrandLogo brand={b.brand} />
              </div>
              <div className="text-navy font-semibold text-sm mb-1">{b.name}</div>
              <div className="text-gray-500 text-xs whitespace-pre-line leading-snug mb-3 min-h-[40px]">{b.tagline}</div>
              <div className="w-full h-24 rounded overflow-hidden">
                <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
