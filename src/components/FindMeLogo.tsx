import React from 'react';

interface FindMePinIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * Authentic FindMe AI Location Pin Icon
 * Directly inspired by the reference brand asset:
 * Glossy cyan-to-electric-blue map pin with dark aperture and white user silhouette.
 */
export const FindMePinIcon: React.FC<FindMePinIconProps> = ({ 
  className = '', 
  size = 40,
  glow = true
}) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const gradId = `pin-gradient-${uniqueId}`;
  const rimGradId = `rim-gradient-${uniqueId}`;
  const shadowId = `shadow-${uniqueId}`;

  return (
    <svg 
      width={size} 
      height={(size * 68) / 60} 
      viewBox="0 0 60 68" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
      aria-label="FindMe AI Logo Icon"
    >
      <defs>
        {/* Main Pin Gloss Gradient */}
        <linearGradient id={gradId} x1="12" y1="4" x2="48" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="40%" stopColor="#2563EB" />
          <stop offset="90%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        {/* Outer Rim Bevel Gradient */}
        <linearGradient id={rimGradId} x1="30" y1="2" x2="30" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
        </linearGradient>

        {/* Soft Drop Shadow Filter */}
        <filter id={shadowId} x="0" y="0" width="60" height="68" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#1E3A8A" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Pin Drop Shadow & Body */}
      <g filter={glow ? `url(#${shadowId})` : undefined}>
        {/* Outer Pin Body */}
        <path
          d="M30 4C16.745 4 6 14.745 6 28C6 40.8 24.2 57.6 28.6 61.4C29.4 62.1 30.6 62.1 31.4 61.4C35.8 57.6 54 40.8 54 28C54 14.745 43.255 4 30 4Z"
          fill={`url(#${gradId})`}
        />

        {/* Beveled Rim Highlight */}
        <path
          d="M30 5C17.297 5 7 15.297 7 28C7 40.2 24.6 56.4 28.9 60.1C29.5 60.6 30.5 60.6 31.1 60.1C35.4 56.4 53 40.2 53 28C53 15.297 42.703 5 30 5Z"
          stroke={`url(#${rimGradId})`}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Top Gloss Arc Highlight */}
        <path
          d="M14 22C16 14 22.5 8 30 8C37.5 8 44 14 46 22"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Dark Navy Circular Aperture */}
        <circle cx="30" cy="27" r="16.5" fill="#0A152E" />
        <circle cx="30" cy="27" r="16.5" stroke="#1E293B" strokeWidth="1" opacity="0.6" />

        {/* Center Citizen Silhouette: White Head + Shoulder Bust */}
        {/* Head */}
        <circle cx="30" cy="20.5" r="5.5" fill="#FFFFFF" />

        {/* Shoulders / Bust */}
        <path
          d="M20 37.5C20.3 32.2 24.6 30 30 30C35.4 30 39.7 32.2 40 37.5C37 39.5 33.6 40.5 30 40.5C26.4 40.5 23 39.5 20 37.5Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
};

interface FindMeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  showTagline?: boolean;
  showVersion?: boolean;
  className?: string;
}

export const FindMeLogo: React.FC<FindMeLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showTagline = true,
  showVersion = false,
  className = ''
}) => {
  const iconSizes = {
    sm: 28,
    md: 38,
    lg: 48,
    xl: 60
  };

  const textSizes = {
    sm: {
      title: 'text-base',
      tagline: 'text-[9px]',
      badge: 'text-[9px]'
    },
    md: {
      title: 'text-xl',
      tagline: 'text-[11px]',
      badge: 'text-[10px]'
    },
    lg: {
      title: 'text-2xl',
      tagline: 'text-xs',
      badge: 'text-xs'
    },
    xl: {
      title: 'text-3xl md:text-4xl',
      tagline: 'text-sm',
      badge: 'text-xs'
    }
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Pin Marker Icon */}
      <div className="relative flex items-center justify-center">
        <FindMePinIcon size={iconSizes[size]} />
      </div>

      {/* Brand Typography & Slogan */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-bold tracking-tight ${textSizes[size].title} ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            FindMe
          </span>
          <span className={`font-extrabold tracking-tight text-blue-500 ${textSizes[size].title}`}>
            AI
          </span>
          {showVersion && (
            <span className={`ml-1 px-1.5 py-0.5 font-semibold bg-blue-500/15 text-blue-400 rounded border border-blue-500/30 ${textSizes[size].badge}`}>
              Enterprise
            </span>
          )}
        </div>

        {showTagline && (
          <p className={`font-medium tracking-wide mt-1 truncate ${textSizes[size].tagline} ${
            isLight ? 'text-slate-500' : 'text-slate-300'
          }`}>
            See. Report. Connect. Find.
          </p>
        )}
      </div>
    </div>
  );
};
