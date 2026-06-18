export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-[60px] px-4 text-center max-md:mb-10">
      <h2 className="relative mb-4 inline-block text-[clamp(2rem,5vw,2.8rem)] after:absolute after:-bottom-2.5 after:left-1/2 after:h-0.5 after:w-10 after:-translate-x-1/2 after:bg-gold after:content-['']">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-6 max-w-[600px] text-[clamp(1rem,3vw,1.1rem)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
