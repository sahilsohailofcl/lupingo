'use client';

import * as React from 'react';

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextValue>({});

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value || '');

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <SelectContext.Provider value={{ value: internalValue, onValueChange: handleValueChange }}>
      <div className="relative">
        {React.Children.map(children, (child: React.ReactNode) => {
          if (React.isValidElement(child)) {
            if (child.type === SelectTrigger) {
              return React.cloneElement(child as React.ReactElement<any>, { 
                isOpen, 
                setIsOpen,
                value: internalValue 
              });
            }
            if (child.type === SelectContent) {
              return isOpen ? React.cloneElement(child as React.ReactElement<any>, { setIsOpen }) : null;
            }
          }
          return child;
        })}
      </div>
    </SelectContext.Provider>
  );
};

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  value?: string;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className = '', children, isOpen, setIsOpen, value, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`flex h-10 w-full items-center justify-between rounded-md border border-[#e8d5c4] bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-[#8b7355] focus:outline-none focus:ring-2 focus:ring-[#b22d15] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        onClick={() => setIsOpen?.(!isOpen)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

export interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const context = React.useContext<SelectContextValue>(SelectContext);
  return <span>{context.value || placeholder}</span>;
};

export interface SelectContentProps {
  children: React.ReactNode;
  setIsOpen?: (open: boolean) => void;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, setIsOpen }) => {
  return (
    <div
      className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-[#e8d5c4] bg-white shadow-md mt-1"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-1">
        {React.Children.map(children, (child: React.ReactNode) => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            return React.cloneElement(child as React.ReactElement<any>, { setIsOpen });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  setIsOpen?: (open: boolean) => void;
}

export const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className = '', children, value, setIsOpen, ...props }, ref) => {
    const context = React.useContext<SelectContextValue>(SelectContext);
    
    return (
      <button
        ref={ref}
        type="button"
        className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-[#f0e4d7] focus:bg-[#f0e4d7] ${className}`}
        onClick={() => {
          context.onValueChange?.(value);
          setIsOpen?.(false);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SelectItem.displayName = 'SelectItem';

