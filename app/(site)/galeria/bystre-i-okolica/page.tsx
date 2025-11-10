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

export default function BystreIOkolicaPage() {
  return (
    <div className="w-full">
      <Gallery title="Bystre i okolica" images={images} />
    </div>
  );
}
