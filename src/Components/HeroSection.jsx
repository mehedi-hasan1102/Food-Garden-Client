import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

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
  ];

  return (
    <div className="rounded-2xl w-full h-[70vh] max-h-[700px] overflow-hidden shadow-2xl mt-2 ">
      <Swiper
        spaceBetween={30}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full ">
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out scale-100 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
                <h2 className="text-white text-3xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="mt-4 text-white text-lg md:text-2xl font-light max-w-2xl drop-shadow-sm">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
