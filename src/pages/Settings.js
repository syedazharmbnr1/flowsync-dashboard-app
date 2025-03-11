import React, { useState, useEffect } from 'react';
import { User, Bell, Sliders, Layers, Server, DollarSign, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserSettings, updateUserSettings } from '../api/supabase';

// Import settings components (these will be placeholder components for now)
const AccountSettings = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Account Settings</h3>
    <p className="text-gray-400">
      Here you can manage your account information, profile details, and personal preferences.
    </p>
    <div className="mt-4 p-4 bg-gray-900 rounded-md">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
    <p className="text-gray-400">
      Control how and when you receive notifications from the system.
    </p>
    <div className="mt-4 p-4 bg-gray-900 rounded-md">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
      </div>
    </div>
  </div>
);

const AppearanceSettings = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Appearance Settings</h3>
    <p className="text-gray-400">
      Customize the look and feel of the dashboard to your liking.
    </p>
    <div className="mt-4 p-4 bg-gray-900 rounded-md">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
      </div>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Security Settings</h3>
    <p className="text-gray-400">
      Manage your password, two-factor authentication, and other security features.
    </p>
    <div className="mt-4 p-4 bg-gray-900 rounded-md">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
      </div>
    </div>
  </div>
);

const ApiSettings = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">API Access</h3>
    <p className="text-gray-400">
      Manage API keys and access for integrating with other systems.
    </p>
    <div className="mt-4 p-4 bg-gray-900 rounded-md">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
      </div>
    </div>
  </div>
);

const BillingSettings = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Billing</h3>
    <p className="text-gray-400">
      Manage your subscription, payment methods, and billing information.
    </p>
    <div className="mt-4 p-4 bg-gray-900 rounded-md">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
      </div>
    </div>
  </div>
);

const HelpSupport = () => (
  <div>
    <h3 className="text-lg font-medium mb-4">Help & Support</h3>
    <p className="text-gray-400">
      Get help with using the system, contact support, and access documentation.
    </p>
    <div className="mt-4 p-4 bg-gray-900 rounded-md">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
        <div className="h-10 bg-gray-800 rounded"></div>
      </div>
    </div>
  </div>
);

const Settings = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('Account');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);

  // Fetch user settings when component mounts
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        
        if (user) {
          const data = await getUserSettings(user.id);
          setSettings(data);
        }
      } catch (error) {
        console.error('Error fetching user settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user]);

  // Handle saving settings
  const handleSaveSettings = async (sectionData) => {
    try {
      setSaveStatus('saving');
      
      // Update only the section that was changed
      const updatedSettings = {
        ...settings,
        [activeSection.toLowerCase()]: sectionData
      };
      
      await updateUserSettings(user.id, updatedSettings);
      setSettings(updatedSettings);
      setSaveStatus('saved');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  // Render the active settings section
  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        </div>
      );
    }

    switch (activeSection) {
      case 'Account':
        return <AccountSettings />;
      case 'Notifications':
        return <NotificationSettings />;
      case 'Appearance':
        return <AppearanceSettings />;
      case 'Security':
        return <SecuritySettings />;
      case 'API Access':
        return <ApiSettings />;
      case 'Billing':
        return <BillingSettings />;
      case 'Help':
        return <HelpSupport />;
      default:
        return <AccountSettings />;
    }
  };

  const settingsSections = [
    { name: 'Account', icon: <User size={16} /> },
    { name: 'Notifications', icon: <Bell size={16} /> },
    { name: 'Appearance', icon: <Sliders size={16} /> },
    { name: 'Security', icon: <Layers size={16} /> },
    { name: 'API Access', icon: <Server size={16} /> },
    { name: 'Billing', icon: <DollarSign size={16} /> },
    { name: 'Help', icon: <HelpCircle size={16} /> }
  ];

  return (
    <div className="bg-gray-800 rounded-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Settings</h2>
        <button 
          className={`flex items-center text-sm px-3 py-1.5 rounded ${
            saveStatus === 'saving' 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : saveStatus === 'saved'
                ? 'bg-green-500 hover:bg-green-600'
                : saveStatus === 'error'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {saveStatus === 'saving' 
            ? 'Saving...' 
            : saveStatus === 'saved'
              ? 'Changes Saved!'
              : saveStatus === 'error'
                ? 'Error Saving'
                : 'Save Changes'}
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 bg-gray-700 p-4 rounded-md">
          <div className="space-y-1">
            {settingsSections.map((section, index) => (
              <div 
                key={index} 
                className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
                  activeSection === section.name 
                    ? 'bg-gray-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
                onClick={() => setActiveSection(section.name)}
              >
                <span className="mr-3">{section.icon}</span>
                {section.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-3 bg-gray-700 p-4 rounded-md">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Settings;