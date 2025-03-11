import React, { useState } from 'react';
import { Bell, Download, Loader, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import NotificationPanel from './NotificationPanel';

const Header = ({ 
  pageName, 
  showNotifications, 
  setShowNotifications,
  showUserMenu,
  setShowUserMenu
}) => {
  const { user, signOut } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Welcome message for dashboard
  const getWelcomeMessage = () => {
    if (pageName === 'Dashboard') {
      const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';
      return `Welcome back, ${userName}`;
    }
    return pageName;
  };

  // Handle data export
  const exportData = (format) => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setShowExportOptions(false);
      
      // Show success toast (would be implemented with a toast library in a real app)
      alert(`Data exported as ${format} successfully`);
    }, 1500);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900">
      <h1 className="text-2xl font-medium">{getWelcomeMessage()}</h1>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="text-gray-400 hover:text-gray-100 text-sm"
            onClick={() => setShowNotifications(!showNotifications)}
          >  
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>
          
          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>
        
        {/* Export Button (only on some pages) */}
        {['Dashboard', 'Reports & Analytics', 'Task Overview'].includes(pageName) && (
          <div className="relative">
            <button 
              className="text-gray-400 hover:text-gray-100 text-sm mr-2 border border-gray-700 px-3 py-1 rounded flex items-center"
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader size={14} className="mr-1 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  Export data <Download size={14} className="inline ml-1" />
                </>
              )}
            </button>
            
            {showExportOptions && (
              <div className="absolute right-0 mt-1 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li 
                    className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                    onClick={() => exportData('CSV')}
                  >
                    Export as CSV
                  </li>
                  <li 
                    className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                    onClick={() => exportData('Excel')}
                  >
                    Export as Excel
                  </li>
                  <li 
                    className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                    onClick={() => exportData('PDF')}
                  >
                    Export as PDF
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Action Button */}
        {pageName === 'Dashboard' && (
          <button 
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
          >
            Create Report
          </button>
        )}
        
        {pageName === 'Task Overview' && (
          <button 
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
          >
            Add Task
          </button>
        )}
        
        {pageName === 'Reports & Analytics' && (
          <button 
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
          >
            New Analysis
          </button>
        )}
        
        {pageName === 'Users & Teams' && (
          <button 
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
          >
            Add User
          </button>
        )}
        
        {/* User dropdown (for mobile) */}
        <div className="relative md:hidden">
          <button
            className="p-1 rounded-full text-gray-400 hover:text-white"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <User size={20} />
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
              <div className="px-4 py-3 border-b border-gray-700">
                <div className="text-sm font-medium">{user?.user_metadata?.full_name || user?.email}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <ul className="py-1">
                <li>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    <User size={14} className="inline mr-2" /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    <Settings size={14} className="inline mr-2" /> Settings
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    <HelpCircle size={14} className="inline mr-2" /> Help & Support
                  </Link>
                </li>
                <li className="border-t border-gray-700">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    <LogOut size={14} className="inline mr-2" /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;