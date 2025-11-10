"use client";

import VideoPlayer from "@/app/components/VideoPlayer";
import FadeInUp from "@/app/components/animations/FadeInUp";
import DescriptionSection from "@/app/components/common/DescriptionSection";
import HeaderSection from "@/app/components/common/HeaderSection";

export default function NaszaHistoriaPage() {
  return (
    <div className="w-full">
      {/* Hero video */}
      <section className="w-full relative h-screen md:h-[80vh]">
        <VideoPlayer
          srcDesktop="https://wysokawies.pl/wp-content/uploads/2024/04/wysoka-wies-final-720-krotki.mp4#t=1,52"
          srcMobile="https://wysokawies.pl/wp-content/uploads/2024/04/wysoka-wies-final-720-krotki.mp4#t=1,52"
          showControls={true}
          startTime={0}
        />

        {/* Overlay z opisem */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 bg-gradient-to-t from-black/50 to-transparent text-white">
          <FadeInUp delay={0}>
            <HeaderSection title="Nasza Historia" className="text-3xl md:text-4xl" />
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-lg md:text-2xl max-w-xl mt-2">
              Odkryj historię naszego rustykalnego hotelu w sercu Bieszczad, pełną pasji i miłości do natury.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Tekst + zdjęcia */}
      <section className="w-full py-16 md:py-24 px-6 md:px-16 flex flex-col gap-16 max-w-5xl mx-auto">
        {/* Blok 1 */}
        <FadeInUp delay={0}>
          <DescriptionSection
            description={`W sercu Bieszczad powstała nasza ostoja spokoju i komfortu. Od pierwszego dnia pragniemy, aby każdy gość poczuł wyjątkową atmosferę i magię miejsca.`}
          />
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <img
            src="https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg"
            alt="Historia miejsca"
            className="w-full h-auto object-cover rounded-md shadow-md"
          />
        </FadeInUp>

        {/* Blok 2 */}
        <FadeInUp delay={0.4}>
          <DescriptionSection
            description={`Zaczynaliśmy od małych projektów, marzeń i planów. Każdy dom, który powstał, ma swoją historię i charakter. Współczesny design łączy się tu z tradycją i rustykalnym klimatem.`}
          />
        </FadeInUp>
        <FadeInUp delay={0.6}>
          <img
            src="https://wysokawies.pl/wp-content/uploads/2024/04/3s.jpg"
            alt="Historia miejsca"
            className="w-full h-auto object-cover rounded-md shadow-md"
          />
        </FadeInUp>

        {/* Blok 3 */}
        <FadeInUp delay={0.8}>
          <DescriptionSection
            description={`Dziś Ostoja Wzgórza Dylewskie to przestrzeń dla każdego, kto szuka harmonii, ciszy i komfortu. Każdy dzień tutaj to doświadczenie bliskości z naturą.`}
          />
        </FadeInUp>
      </section>
    </div>
  );
}
