'use client';

import React from 'react';

interface WolfButtonProps {
  onPress?: () => void;
  onClick?: () => void; // web-friendly alias
  disabled?: boolean;
  children: React.ReactNode;
  className?: string; // Optional class for custom styling
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'icon' | 'sm' | 'md' | 'lg' | string;
  title?: string;
}

export const WolfButton: React.FC<WolfButtonProps> = ({ 
  onPress, 
  onClick,
  children, 
  className = '', 
  variant = 'primary',
  size,
  title,
  disabled = false,
}) => {
  const baseClasses = 'py-3 px-6 rounded-full font-bold transition duration-150 active:scale-95';

  let variantClasses = '';
  switch (variant) {
    case 'primary':
      // Using custom colors defined in tailwind.config.ts
      variantClasses = 'bg-wolf-red text-white shadow-md hover:bg-wolf-gold'; 
      break;
    case 'secondary':
      variantClasses = 'bg-white text-wolf-red border-2 border-wolf-red hover:bg-wolf-red/10';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent text-wolf-brown-light hover:text-wolf-brown-dark';
      break;
  }

  // Combine base, variant, and any custom classes
  const sizeClasses = size === 'icon' ? 'p-2 rounded-full' : '';
  const finalClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <button
      onClick={onPress ?? onClick}
      disabled={disabled}
      title={title}
      className={`${finalClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} text-center text-lg`}
    >
      {children}
    </button>
  );
};

// Index file to export the component
// `foclupus-next-native/packages/ui/index.ts`
export * from './WolfButton';