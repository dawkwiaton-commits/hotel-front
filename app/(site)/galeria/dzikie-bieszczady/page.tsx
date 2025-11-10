import Gallery from "@/app/components/ui/Gallery";

const images = [
    "https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg",
    "https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg",
    "https://wysokawies.pl/wp-content/uploads/2024/04/3s.jpg",
    "https://wysokawies.pl/wp-content/uploads/2024/04/4s.jpg",
    "https://wysokawies.pl/wp-content/uploads/2024/04/2s.jpg",
    "https://wysokawies.pl/wp-content/uploads/2024/04/3s.jpg",
    "https://wysokawies.pl/wp-content/uploads/2024/04/4s.jpg",
];

export default function DzikieBieszczadyPage() {
  return (
    <div className="w-full">
      <Gallery title="Dzikie bieszczady" images={images} />
    </div>
  );
}
