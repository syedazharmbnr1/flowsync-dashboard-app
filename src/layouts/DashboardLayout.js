import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import { useLocation, Navigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  // Get current page name from pathname
  const getPageName = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Dashboard';
    
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  // If user is not authenticated, redirect to login
  if (!loading && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-400 border-t-transparent"></div>
          <p className="mt-4 text-lg text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar 
        activeTab={getPageName()} 
        setActiveTab={(tab) => {
          // Convert tab name to path
          const path = tab === 'Dashboard' 
            ? '/' 
            : `/${tab.toLowerCase().replace(/ /g, '-')}`;
          
          window.location.href = path;
        }}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          pageName={getPageName()}
          user={user}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
        />
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;