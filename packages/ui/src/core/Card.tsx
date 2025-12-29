import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-lg border border-[#e8d5c4] bg-white shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
