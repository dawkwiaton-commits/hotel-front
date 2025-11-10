import BaseLink from "./BaseLink";

interface HeaderSectionProps {
  title: string;
  href?: string; // jeśli podany, nagłówek będzie linkiem
  className?: string;
  color?: "white" | "black"; // nowy props
}

export default function HeaderSection({
  title,
  href,
  className = "",
  color = "black", // domyślnie biały
}: HeaderSectionProps) {
  const content = href ? <BaseLink href={href}>{title}</BaseLink> : title;

  // mapujemy color na klasę Tailwind
  const colorClass = color === "white" ? "text-white" : "text-black";

  return (
    <h1
      className={`text-3xl md:text-5xl font-bold mb-6 ${colorClass} ${className}`}
    >
      {content}
    </h1>
  );
}
