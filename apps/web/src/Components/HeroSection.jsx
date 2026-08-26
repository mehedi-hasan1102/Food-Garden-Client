import React from 'react'

import heroVideo from '../assets/hero.mp4'

export default function HeroSlider() {
  return (
    <section className="w-full overflow-hidden shadow-2xl mt-2">
      <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[100vh] overflow-hidden">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" /> */}
        <div className="absolute inset-0 grid place-items-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
              Fresh & Organic
            </h1>
            <p className="mt-5 text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-md">
              Discover farm-fresh ingredients delivered to your doorstep
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
