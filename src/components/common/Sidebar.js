import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Grid,
  FileText,
  BarChart2,
  Activity,
  Zap,
  PlusCircle,
  Users,
  DollarSign,
  Server,
  Settings,
  Search,
  LogOut,
  Layers
} from 'lucide-react';

const Sidebar = ({ 
  activeTab, 
  setActiveTab,
  showUserMenu,
  setShowUserMenu
}) => {
  const { user, signOut } = useAuth();
  
  // Convert tab name to URL path
  const getPathFromTab = (tab) => {
    if (tab === 'Dashboard') return '/';
    return `/${tab.toLowerCase().replace(/ /g, '-')}`;
  };
  
  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: <Grid size={18} />, path: '/' },
    { name: 'Task Overview', icon: <FileText size={18} />, path: '/task-overview' },
    { name: 'Reports & Analytics', icon: <BarChart2 size={18} />, path: '/reports-analytics' },
    { name: 'Team Activity', icon: <Activity size={18} />, path: '/team-activity' },
    { name: 'Workflow Templates', icon: <Zap size={18} />, path: '/workflow-templates' },
    { name: 'Features', icon: <PlusCircle size={18} />, path: '/features' },
    { name: 'Users & Teams', icon: <Users size={18} />, path: '/users-teams' },
    { name: 'Pricing', icon: <DollarSign size={18} />, path: '/pricing' },
    { name: 'Integrations', icon: <Server size={18} />, path: '/integrations' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/settings' }
  ];
  
  // User menu items
  const userMenuItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
    { name: 'Help & Support', path: '/help' }
  ];
  
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
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center border-b border-gray-800">
        <div className="bg-green-500 p-1 rounded mr-2">
          <Layers size={20} className="text-gray-900" />
        </div>
        <Link to="/" className="font-bold text-lg">FlowSync</Link>
      </div>

      {/* Search */}
      <div className="p-3">  
        <div className="relative">  
          <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />  
          <input   
            type="text"   
            placeholder="Search for..."   
            className="w-full bg-gray-800 text-sm rounded py-2 pl-9 pr-3 focus:outline-none border border-gray-700"  
          />  
        </div>  
      </div>  
        
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">  
        <nav className="mt-2">  
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-2.5 text-sm cursor-pointer ${  
                activeTab === item.name   
                  ? 'bg-green-500 bg-opacity-20 text-green-400 border-l-2 border-green-400'   
                  : 'text-gray-400 hover:bg-gray-800'  
              }`}
              onClick={() => setActiveTab(item.name)}
            >  
              <span className="mr-3">{item.icon}</span>  
              {item.name}  
            </Link>  
          ))}  
        </nav>  
      </div>  
        
      {/* User profile */}
      <div className="p-4 border-t border-gray-800">  
        <div className="flex items-center mb-3">  
          <div 
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium mr-2 cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {user?.user_metadata?.full_name 
              ? user.user_metadata.full_name.charAt(0) 
              : user?.email?.charAt(0) || 'U'}
          </div>  
          <div className="relative flex-1">  
            <div className="text-sm font-medium">
              {user?.user_metadata?.full_name || user?.email || 'User'}
            </div>  
            <div className="text-xs text-gray-500">Account settings</div>
            
            {showUserMenu && (
              <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {userMenuItems.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.path}
                        className="px-3 py-2 text-sm hover:bg-gray-700 cursor-pointer block"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-gray-700 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 text-sm hover:bg-gray-700 cursor-pointer flex items-center text-red-400 w-full text-left"
                    >
                      <LogOut size={14} className="mr-2" /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>  
        </div>  
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center">  
          <PlusCircle size={16} className="mr-1" />  
          AI Suggestions  
        </button>  
      </div>  
    </div>
  );
};

export default Sidebar;