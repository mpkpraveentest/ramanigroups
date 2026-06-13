import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Businesses from '../components/Businesses';
import Journey from '../components/Journey';
import Leadership from '../components/Leadership';
import Stats from '../components/Stats';
import LifeAtRamani from '../components/LifeAtRamani';
import News from '../components/News';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <Businesses />
      <Journey />
      <Leadership />
      <Stats />
      <LifeAtRamani />
      <News />
      <Footer />
    </div>
  );
}
