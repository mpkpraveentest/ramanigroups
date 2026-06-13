import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, ArrowRight } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: 'Subscribed!', description: `Thanks for joining our newsletter, ${email}` });
    setEmail('');
  };

  return (
    <footer className="bg-navy-dark text-white pt-14 pb-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 border-2 border-gold rounded flex items-center justify-center">
              <span className="serif text-gold text-2xl font-bold">R</span>
            </div>
            <div className="leading-tight">
              <div className="text-gold font-bold tracking-wider text-lg">RAMANI</div>
              <div className="text-gold tracking-[0.3em] text-[10px]">GROUPS</div>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Driven by trust.<br/>Powered by growth.<br/>Inspired by excellence.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <button key={i} className="w-9 h-9 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-navy flex items-center justify-center transition-colors">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-gold font-semibold mb-4 text-sm tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-white/75 text-sm">
            {['About Us', 'Our Journey', 'Businesses', 'Leadership', 'Life at Ramani', 'News', 'Contact Us'].map((l) => (
              <li key={l}><a href="#" className="hover:text-gold transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-semibold mb-4 text-sm tracking-wider">Our Businesses</h4>
          <ul className="space-y-2 text-white/75 text-sm">
            {['Volkswagen', 'Mahindra', 'MG Motor', 'Kia', 'CarMonkey', 'The Baking Society'].map((l) => (
              <li key={l}><a href="#" className="hover:text-gold transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-semibold mb-4 text-sm tracking-wider">Corporate Office</h4>
          <p className="text-white/75 text-sm leading-relaxed mb-3">
            Ramani Groups<br/>
            No. 123, Avinashi Road,<br/>
            Coimbatore – 641018,<br/>
            Tamil Nadu, India
          </p>
          <div className="flex items-center gap-2 text-white/75 text-sm mb-2">
            <Phone className="w-4 h-4 text-gold" /> +91 422 123 4567
          </div>
          <div className="flex items-center gap-2 text-white/75 text-sm">
            <Mail className="w-4 h-4 text-gold" /> info@ramanigroup.com
          </div>
        </div>

        <div>
          <h4 className="text-gold font-semibold mb-4 text-sm tracking-wider">Newsletter</h4>
          <p className="text-white/75 text-sm mb-4">Stay updated with our latest news and updates.</p>
          <form onSubmit={subscribe} className="flex bg-white/10 rounded overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/50"
            />
            <button type="submit" className="btn-gold px-4 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
        <div>© 2024 Ramani Groups. All Rights Reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gold">Privacy Policy</a>
          <a href="#" className="hover:text-gold">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}
