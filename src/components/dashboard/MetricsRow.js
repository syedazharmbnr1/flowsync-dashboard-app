import React, { useState, useEffect } from 'react';
import { Zap, Users, Activity, Clock, MoreHorizontal } from 'lucide-react';

const MetricsRow = () => {
  const [metrics, setMetrics] = useState({
    workflowsExecuted: { value: 0, change: 0 },
    activeUsers: { value: 0, change: 0 },
    tasksAutomated: { value: 0, change: 0 },
    timeSaved: { value: '0hrs 0mins', change: 0 }
  });
  
  const [loading, setLoading] = useState(true);

  // Simulate fetching metrics from API
  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      
      // In a real application, this would be an API call
      // For now, we'll simulate with a timeout
      setTimeout(() => {
        setMetrics({
          workflowsExecuted: { value: 32, change: 8.4 },
          activeUsers: { value: 23600, change: 6.8 },
          tasksAutomated: { value: 756, change: 10.5 },
          timeSaved: { value: '12hrs 47mins', change: 12.4 }
        });
        
        setLoading(false);
      }, 1000);
    };
    
    fetchMetrics();
  }, []);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const metricCards = [
    {
      title: 'Workflows Executed',
      icon: <Zap size={16} className="mr-1" />,
      value: metrics.workflowsExecuted.value,
      change: metrics.workflowsExecuted.change,
      formatter: formatNumber
    },
    {
      title: 'Active Users',
      icon: <Users size={16} className="mr-1" />,
      value: metrics.activeUsers.value,
      change: metrics.activeUsers.change,
      formatter: formatNumber
    },
    {
      title: 'Tasks Automated',
      icon: <Activity size={16} className="mr-1" />,
      value: metrics.tasksAutomated.value,
      change: metrics.tasksAutomated.change,
      formatter: formatNumber
    },
    {
      title: 'Time Saved',
      icon: <Clock size={16} className="mr-1" />,
      value: metrics.timeSaved.value,
      change: metrics.timeSaved.change,
      formatter: (value) => value
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metricCards.map((metric, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-md">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center text-sm text-gray-400">
              {metric.icon} {metric.title}
            </div>
            <MoreHorizontal size={16} className="text-gray-500 cursor-pointer" />
          </div>
          
          {loading ? (
            <div className="h-8 flex items-center">
              <div className="animate-pulse bg-gray-700 h-5 w-24 rounded"></div>
            </div>
          ) : (
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold mr-2">
                {metric.formatter(metric.value)}
              </h3>
              <span className="text-xs px-1.5 py-0.5 rounded bg-green-500 bg-opacity-20 text-green-400">
                +{metric.change}%
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsRow;