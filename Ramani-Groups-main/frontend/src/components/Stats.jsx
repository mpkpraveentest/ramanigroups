import React from 'react';
import { Sun, Users, Car, MapPin, User, Building2 } from 'lucide-react';
import { stats } from '../mock';

const iconMap = { sun: Sun, users: Users, car: Car, pin: MapPin, user: User, building: Building2 };

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="gold-underline text-navy text-xl md:text-2xl font-bold tracking-[0.2em]">OUR GROWTH IN NUMBERS</h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-8">
          {stats.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <div key={i} className={`flex items-center gap-3 ${i !== 0 ? 'lg:border-l lg:border-gray-200 lg:pl-6' : ''}`}>
                <Icon className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <div className="text-navy font-bold text-lg leading-tight">{s.value}</div>
                  <div className="text-gray-500 text-xs">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
