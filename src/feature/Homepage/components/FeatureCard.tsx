// app/(marketing)/components/commitment/FeatureCard.tsx

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  export default function FeatureCard({
    icon,
    title,
    description,
  }: FeatureCardProps) {
    return (
      <div className="text-center px-4">
        <div className="w-16 h-16 mx-auto rounded-full border border-[#C8A96A]/40 flex items-center justify-center mb-6">
          {icon}
        </div>
  
        <h3 className="text-xl font-semibold text-[#C8A96A] mb-4">
          {title}
        </h3>
  
        <p className="text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    );
  }