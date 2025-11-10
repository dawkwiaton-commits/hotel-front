interface DescriptionSectionProps {
  description: string;
  className?: string;
}

export default function DescriptionSection({
  description,
  className = "",
}: DescriptionSectionProps) {
  return (
    <p
      className={`text-brown900 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${className}`}
    >
      {description}
    </p>
  );
}
