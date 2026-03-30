import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import { useAuth } from '../../context/AuthContext';

const AppLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased font-manrope">
      <SideNavBar />
      <TopNavBar 
        user={user ? {
          name: user.fullName,
          role: user.role,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=006a6a&color=fff`
        } : undefined} 
      />
      <main className="pl-64 pt-16 min-h-screen">
        <div className="p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

