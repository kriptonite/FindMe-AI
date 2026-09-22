import React from 'react';
import { 
  Home, 
  Navigation, 
  Activity, 
  Bell, 
  User, 
  History
} from 'lucide-react';
import { FieldScreen } from './types';

interface FieldBottomNavProps {
  currentScreen: FieldScreen;
  onNavigate: (screen: FieldScreen) => void;
  unreadCount?: number;
  hasActiveResponse?: boolean;
}

export const FieldBottomNav: React.FC<FieldBottomNavProps> = ({
  currentScreen,
  onNavigate,
  unreadCount = 2,
  hasActiveResponse = true
}) => {
  // Hide bottom nav on login screen
  if (currentScreen === 'login') return null;

  const navItems: { screen: FieldScreen; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    {
      screen: 'home',
      label: 'Cases',
      icon: Home
    },
    {
      screen: 'navigation',
      label: 'Map',
      icon: Navigation
    },
    {
      screen: 'action-in-progress',
      label: 'Active',
      icon: Activity,
      badge: hasActiveResponse ? '●' : undefined
    },
    {
      screen: 'case-history',
      label: 'History',
      icon: History
    },
    {
      screen: 'notifications',
      label: 'Alerts',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    {
      screen: 'profile-settings',
      label: 'Officer',
      icon: User
    }
  ];

  return (
    <div className="bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shrink-0 z-40 select-none shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.screen;

        return (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`min-h-[48px] px-2 py-1 flex flex-col items-center justify-center relative rounded-xl transition-all cursor-pointer ${
              isActive 
                ? 'text-blue-600 font-black' 
                : 'text-slate-400 hover:text-slate-700 font-semibold'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {item.badge !== undefined && (
                <span className={`absolute -top-1.5 -right-2 min-w-[14px] h-[14px] px-1 rounded-full flex items-center justify-center text-[9px] font-black ${
                  item.badge === '●' 
                    ? 'bg-emerald-500 text-white animate-pulse' 
                    : 'bg-rose-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
