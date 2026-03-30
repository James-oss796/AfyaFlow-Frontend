import React from 'react';

type ChipVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusChipProps {
  label: string;
  variant?: ChipVariant;
  className?: string;
  dot?: boolean;
}

const StatusChip: React.FC<StatusChipProps> = ({ 
  label, 
  variant = 'neutral', 
  className = '', 
  dot = false 
}) => {
  const variants = {
    success: 'bg-secondary-container/50 text-secondary',
    warning: 'bg-tertiary-fixed text-on-tertiary-fixed',
    error: 'bg-error-container text-on-error-container',
    info: 'bg-primary-container/20 text-primary',
    neutral: 'bg-surface-container-highest text-on-surface-variant',
  };

  const dotColors = {
    success: 'bg-secondary',
    warning: 'bg-tertiary',
    error: 'bg-error',
    info: 'bg-primary',
    neutral: 'bg-outline',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}></span>}
      {label}
    </span>
  );
};

export default StatusChip;
