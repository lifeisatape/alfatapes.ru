interface SectionBackdropProps {
  opacity?: 'light' | 'medium' | 'heavy';
  className?: string;
}

export function SectionBackdrop({ opacity = 'medium', className = '' }: SectionBackdropProps) {
  const opacityClasses = {
    light: 'bg-gradient-to-b from-black/25 via-black/25 to-black/25',
    medium: 'bg-gradient-to-b from-black/40 via-black/40 to-black/40',
    heavy: 'bg-gradient-to-b from-black/60 via-black/60 to-black/60',
  };

  return (
    <div 
      className={`absolute inset-0 ${opacityClasses[opacity]} pointer-events-none -z-[5] ${className}`}
      aria-hidden="true"
    />
  );
}
