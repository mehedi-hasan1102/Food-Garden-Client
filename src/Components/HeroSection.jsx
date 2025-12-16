
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules'

export default function HeroSlider() {
  const slides = [
    {
      img: 'https://i.ibb.co/m5JqJSfR/meet1.jpg',
      title: 'Fresh & Organic',
      subtitle: 'Discover farm-fresh ingredients delivered to your doorstep',
    },
    {
      img: 'https://i.ibb.co/VcchrpqJ/482009379-1070919158389822-1583818902997518636-n.jpg',
      title: 'Healthy Recipes',
      subtitle: 'Tasty and nutritious meals made easy for every day',
    },
    {
      img: 'https://i.ibb.co/FLNKfBQF/484072515-948743677452277-438710571920415173-n.jpg',
      title: 'Meal Planning Made Simple',
      subtitle: 'Plan your weekly meals effortlessly with our expert tips',
    },
    {
      img: 'https://i.ibb.co/C3F12DrW/meet6.jpg',
      title: 'Snack Smart',
      subtitle: 'Healthy and delicious snacks for any time of the day',
    },
    {
      img: 'https://i.ibb.co/ZphCg4Lc/meet8.jpg',
      title: 'Family-Friendly Meals',
      subtitle: 'Simple recipes the whole family will love',
    },
    {
      img: 'https://i.ibb.co/zhjXMDtg/487976956-961168309543147-6284679182393018791-n.jpg',
      title: 'Quick & Easy',
      subtitle: 'Delicious meals ready in under 30 minutes',
    },
    {
      img: 'https://i.ibb.co/ccDD7vSR/488549398-961171166209528-7591433434064531556-n.jpg',
      title: 'Food for Every Mood',
      subtitle: 'Comfort foods to brighten your day and satisfy cravings',
    },
  ]

  return (
    <section className="w-full overflow-hidden shadow-2xl mt-2">
      <Swiper
        spaceBetween={30}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Fixed Height Hero */}
            <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[100vh] overflow-hidden">
              {/* Zooming Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-[25000ms] ease-in-out hover:scale-105 swiper-slide-active:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />

              {/* Centered Content */}
              <div className="absolute inset-0 grid place-items-center text-center px-6">
                <div className="max-w-4xl">
                  <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
