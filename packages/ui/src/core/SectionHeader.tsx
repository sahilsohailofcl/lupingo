import * as React from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: React.ComponentType<any> | React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon, className = '' }) => {
  // Check if Icon is a React component (function or forwardRef)
  const isComponent = Icon && (typeof Icon === 'function' || (typeof Icon === 'object' && '$$typeof' in Icon));
  
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-3">
        {isComponent ? (
          React.createElement(Icon as React.ComponentType<any>, {
            className: "w-6 h-6 text-wolf-red"
          })
        ) : Icon ? (
          <span className="w-6 h-6 text-wolf-red">{Icon}</span>
        ) : null}
        <h2 className="text-2xl font-semibold text-wolf-brown-dark">{title}</h2>
      </div>
    </div>
  );
};

export default SectionHeader;
