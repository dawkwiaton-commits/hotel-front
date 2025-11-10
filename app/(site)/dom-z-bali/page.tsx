import HeaderSection from "../../components/common/HeaderSection";
import DescriptionSection from "../../components/common/DescriptionSection";
import FadeInUp from "../../components/animations/FadeInUp";
import Gallery from "@/app/components/ui/Gallery";

export default function DomZBaliPage() {
  return (
    <div className="w-full">
      {/* Hero section */}
      <section className="w-full relative h-[50vh]">
        <img
          src="https://wysokawies.pl/wp-content/uploads/2025/07/32.jpg"
          alt="Domy na Wzgórzach Dylewskich"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white text-center px-6">
          <FadeInUp delay={0}>
            <HeaderSection title="Domy na sprzedaż na Wzgórzach Dylewskich" color="white"/>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-lg md:text-2xl">Poczuj przestrzeń</p>
          </FadeInUp>
        </div>
      </section>

      {/* Sekcja 1: Tekst po lewej, obraz po prawej */}
      <section className="w-full py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        {/* Tekst z paddingiem */}
        <FadeInUp delay={0}>
          <div className="flex flex-col justify-center px-6 md:px-16">
            <HeaderSection
              title="Twoje miejsce na tworzenie wyjątkowych wspomnień"
              className="text-2xl md:text-3xl"
            />
            <DescriptionSection
              description={`W domach w Wysokiej Wsi Ostoja Wzgórza Dylewskie zapraszamy Cię do rozkoszowania się chwilą – każdego dnia. Pozwól, aby czas płynął powoli i twórz wspomnienia na całe życie. W każdym pomieszczeniu napawaj oczy widokami, odpręż się we własnej saunie, rozsiądź z książką przy kominku lub podziwiaj zachód słońca na tarasie. Słyszysz? To otaczająca Cię cisza…`}
            />
          </div>
        </FadeInUp>

        {/* Obraz pełna szerokość kolumny */}
        <img
          src="https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg"
          alt="Wnętrze domu"
          className="w-full h-full object-cover rounded-md shadow-lg"
        />
      </section>

      {/* Sekcja 2: Obraz po lewej, tekst po prawej */}
      <section className="w-full py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        {/* Obraz pełna szerokość kolumny */}
        <img
          src="https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg"
          alt="Wnętrze domu"
          className="w-full h-full object-cover rounded-md shadow-lg"
        />

        {/* Tekst z paddingiem */}
        <FadeInUp delay={0.2}>
          <div className="flex flex-col justify-center px-6 md:px-16">
            <HeaderSection
              title="Twój dom, Twój azyl"
              className="text-2xl md:text-3xl"
            />
            <DescriptionSection
              description={`W każdym domu poczujesz spokój, komfort i wyjątkowy klimat. Duże okna wpuszczają naturalne światło, tarasy otwierają widoki na Wzgórza Dylewskie, a wnętrza są dopracowane w każdym szczególe.`}
            />
          </div>
        </FadeInUp>
      </section>

      <Gallery
        title="Galeria"
        images={[
          "https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg",
          "https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg",
          "https://wysokawies.pl/wp-content/uploads/2024/04/3s.jpg",
          "https://wysokawies.pl/wp-content/uploads/2024/04/4s.jpg",
          "https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg",
          "https://wysokawies.pl/wp-content/uploads/2024/04/3s.jpg",
          "https://wysokawies.pl/wp-content/uploads/2024/04/4s.jpg",
        ]}
      />
    </div>
  );
}
