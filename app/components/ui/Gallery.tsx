"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface GalleryProps {
  title: string;
  images: string[];
}

export default function Gallery({ title, images }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 10 },
    breakpoints: { "(min-width: 768px)": { slides: { perView: 3, spacing: 10 } } },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const prevSlide = () => slider?.current?.prev();
  const nextSlide = () => slider?.current?.next();

  return (
    <div className="w-full py-16 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-brown900 mb-6">{title}</h2>

      <div className="relative">
        {/* Strzałki */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full p-3 cursor-pointer z-10 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brown900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full p-3 cursor-pointer z-10 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brown900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slider miniaturek */}
        <div ref={sliderRef} className="keen-slider">
          {images.map((src, i) => (
            <div
              key={i}
              className="keen-slider__slide cursor-pointer"
              onClick={() => setIndex(i)}
            >
              <img
                src={src}
                alt={`Galeria ${i + 1}`}
                className="w-full h-40 md:h-48 object-cover rounded-md shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Kropki */}
      <div className="flex justify-center gap-2 mt-10">
  {images.map((_, i) => (
    <span
      key={i}
      className={`w-3.5 h-3.5 rounded-full border border-gray-300 ${
        currentSlide === i ? "bg-brown900" : "bg-gray-300"
      }`}
    ></span>
  ))}
</div>

      {/* Lightbox */}
      {index !== null && (
        <Lightbox
          slides={images.map((src) => ({ src }))}
          open={index !== null}
          index={index}
          close={() => setIndex(null)}
          controller={{ closeOnBackdropClick: true }}
        />
      )}
    </div>
  );
}
