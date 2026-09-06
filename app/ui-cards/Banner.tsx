"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import image1 from "../../public/image1.png";
import image2 from "../../public/image2.png";
import image3 from "../../public/image3.png";
import image4 from "../../public/image4.png";

const images = [image1, image2, image3, image4];
const AUTOPLAY_MS = 3500;
export const Banner = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Stable autoplay interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const jumpTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#f5f5f6] mt-4"
      aria-label="Hero carousel"
    >
      <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] 2xl:h-[80vh] cursor-pointer group">
        {/* Slides */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover sm:object-fill lg:object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
              decoding="async"
              draggable={false}
              sizes="100vw"
              width="1920"
              height="900"
            />
          </div>
        ))}

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-500 ease-out ${
                index === current
                  ? "w-3 h-3 bg-white border border-gray-300 shadow-md scale-110"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
