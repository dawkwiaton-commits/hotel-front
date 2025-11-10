import Gallery from "@/app/components/ui/Gallery";

const images = [
  "https://wysokawies.pl/wp-content/uploads/2024/04/bystre1.jpg",
  "https://wysokawies.pl/wp-content/uploads/2024/04/bystre2.jpg",
  "https://wysokawies.pl/wp-content/uploads/2024/04/bystre3.jpg",
];

export default function BystreIOkolicaPage() {
  return (
    <div className="w-full">
      <Gallery title="Bystre i okolica" images={images} />
    </div>
  );
}
