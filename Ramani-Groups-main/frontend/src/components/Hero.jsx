import React from 'react';
import { ArrowRight, Building2, BadgeCheck, Smile, MapPin, Users } from 'lucide-react';
import { heroStats } from '../mock';

const iconMap = { building: Building2, badge: BadgeCheck, smile: Smile, pin: MapPin, users: Users };

export default function Hero() {
  return (
    <section className="bg-navy text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-10 pb-0 grid lg:grid-cols-2 gap-8 items-center">
        <div className="fade-in py-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            DRIVEN BY TRUST.<br/>
            POWERED BY <span className="text-gold">GROWTH.</span><br/>
            INSPIRED BY <span className="text-gold">EXCELLENCE.</span>
          </h1>
          <p className="mt-6 text-white/80 max-w-md text-sm md:text-base leading-relaxed">
            Ramani Groups is a diversified business conglomerate with strong presence in automotive and consumer businesses across Tamil Nadu.
          </p>
          <button className="btn-gold mt-8 px-6 py-3 rounded inline-flex items-center gap-3 text-sm">
            Discover Our Journey <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative h-[280px] md:h-[360px] lg:h-[420px] rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1574023278969-abb7ab49945c?w=1200"
            alt="Ramani Groups Showroom"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f3d] via-transparent to-transparent" />
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-navy-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-5 gap-6">
          {heroStats.map((s, i) => {
            const Icon = iconMap[s.icon] || Building2;
            return (
              <div key={i} className={`flex items-center gap-4 ${i !== 0 ? 'md:border-l md:border-white/15 md:pl-6' : ''}`}>
                <div className="text-gold">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold text-base md:text-lg">{s.value}</div>
                  <div className="text-white/70 text-xs md:text-sm">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
