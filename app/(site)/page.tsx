import Link from "next/link";
import VideoPlayer from "../components/VideoPlayer";
import HeaderSection from "../components/common/HeaderSection";
import DescriptionSection from "../components/common/DescriptionSection";
import FadeInUp from "../components/animations/FadeInUp";

const HEADER_HEIGHT = 70; // px, dostosuj do swojego headera

export default function HomePage() {
  return (
    <div className="w-full">
      {/* VIDEO SECTION */}
      <section
        className="w-full relative"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <VideoPlayer
          srcDesktop="https://wysokawies.pl/wp-content/uploads/2024/04/wysoka-wies-final-720-krotki.mp4#t=1,52"
          srcMobile="https://wysokawies.pl/wp-content/uploads/2024/04/wysoka-wies-final-720-krotki.mp4#t=1,52"
        />

        {/* Overlay z opisem */}
        <div className="absolute inset-0 flex flex-col justify-end md:justify-end p-6 md:p-16 bg-gradient-to-t from-black/50 to-transparent text-white">
          <p className="text-lg md:text-2xl max-w-xl">
            <Link
              href="/nasza-historia"
              className="underline hover:text-brown-700 transition"
            >
              Poznaj naszą historię
            </Link>{" "}
            i dowiedz się więcej o naszym rustykalnym hotelu w sercu Bieszczad.
          </p>
        </div>
      </section>

      <section
        className="w-full bg-sectionBg py-16 px-6 md:px-16 flex flex-col justify-center items-center text-center"
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <FadeInUp delay={0.2}>
          <HeaderSection title="Poznaj naszą historię" href="/nasza-historia" />
        </FadeInUp>

        <div className="max-w-3xl text-lg md:text-xl leading-relaxed text-brown900">
          <FadeInUp delay={0.4}>
            <DescriptionSection
              description={`Niektórzy twierdzą, że mazurskie Wzgórza Dylewskie to region pełen magii. I nie będziemy z tym polemizować. Tę magię czujemy tu każdego dnia – w pachnących lasach, dolinach, kolorowych wzniesieniach, rozsianych tu tajemniczych głazach i kojącej ciszy…

To tu znajduje się osada szesnastu domów położonych na wzniesieniach i w dolinach malowniczych Wzgórz Dylewskich. Każdy z domów, indywidualnie posadowiony na działce, nosi nazwę zaczerpniętą od nazw roślin w starodawnej gwarze mazurskiej. Dzięki naturalnym różnicom w wysokościach terenu, część domów ma spektakularny widok, część jest przytulnie schowana w zagłębieniach.`}
            />
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
