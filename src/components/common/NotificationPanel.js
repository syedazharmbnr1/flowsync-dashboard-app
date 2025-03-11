import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotificationPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching notifications from API
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications([
        { 
          id: 1, 
          title: 'New workflow created', 
          message: 'Data import automation workflow was created successfully', 
          time: '10m ago', 
          read: false,
          link: '/workflow-templates'
        },
        { 
          id: 2, 
          title: 'Report ready', 
          message: 'Your Customer Retention report is ready to view', 
          time: '2h ago', 
          read: false,
          link: '/reports-analytics'
        },
        { 
          id: 3, 
          title: 'Team activity update', 
          message: 'Marketing team completed 15 automations today', 
          time: '5h ago', 
          read: true,
          link: '/team-activity'
        },
        { 
          id: 4, 
          title: 'System update', 
          message: 'FlowSync will be updated to v3.5.2 tonight at 2AM', 
          time: '1d ago', 
          read: true,
          link: '/settings'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Handle mark as read
  const handleMarkAsRead = (e, notificationId) => {
    e.preventDefault();
    e.stopPropagation();
    
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h3 className="font-medium">Notifications</h3>
        <button 
          className="text-xs text-green-400 hover:text-green-300"
          onClick={handleMarkAllAsRead}
        >
          Mark all as read
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {notifications.map(notification => (
              <Link 
                key={notification.id} 
                to={notification.link || '#'}
                className={`block p-3 hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-gray-750' : ''}`}
                onClick={() => {
                  // Auto mark as read when clicked
                  if (!notification.read) {
                    handleMarkAsRead({ preventDefault: () => {}, stopPropagation: () => {} }, notification.id);
                  }
                  onClose();
                }}
              >
                <div className="flex">
                  <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${!notification.read ? 'bg-green-400' : 'bg-transparent'}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{notification.message}</div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {!notification.read && (
                        <button 
                          className="text-xs text-green-400 hover:text-green-300"
                          onClick={(e) => handleMarkAsRead(e, notification.id)}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-700 text-center">
        <Link 
          to="/notifications" 
          className="text-sm text-green-400 hover:text-green-300"
          onClick={onClose}
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationPanel;