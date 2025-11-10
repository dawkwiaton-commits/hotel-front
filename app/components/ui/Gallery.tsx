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
    slides: {
      perView: 1,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const prevSlide = () => slider?.current?.prev();
  const nextSlide = () => slider?.current?.next();

  return (
    <div className="w-full py-16 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-brown900 mb-6">
        {title}
      </h2>

      <div className="relative">
        {/* Strzałki */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
        >
          ▶
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
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
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
