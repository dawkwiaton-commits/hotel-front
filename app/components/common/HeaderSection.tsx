import BaseLink from "./BaseLink";

interface HeaderSectionProps {
  title: string;
  href?: string; // jeśli podany, nagłówek będzie linkiem
  className?: string;
}

export default function HeaderSection({ title, href, className = "" }: HeaderSectionProps) {
  const content = href ? <BaseLink href={href}>{title}</BaseLink> : title;

  return (
    <h1
      className={`text-3xl md:text-5xl font-bold text-brown900 mb-6 ${className}`}
    >
      {content}
    </h1>
  );
}
