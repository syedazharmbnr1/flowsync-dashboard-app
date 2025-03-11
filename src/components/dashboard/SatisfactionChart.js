import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const SatisfactionChart = () => {
  const [loading, setLoading] = useState(true);
  const [satisfactionData, setSatisfactionData] = useState([]);
  const [workflowData, setWorkflowData] = useState([]);
  const [metrics, setMetrics] = useState({
    csiValue: 0,
    csiChange: 0,
    workflowExecutions: 0,
    workflowChange: 0
  });

  // Simulate fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // In a real application, this would be an API call
      setTimeout(() => {
        // Customer Satisfaction Index data
        setSatisfactionData([
          { name: '10 AM', value: 5 },
          { name: '12 PM', value: 8 },
          { name: '2 PM', value: 12 },
          { name: '4 PM', value: 9 },
          { name: '6 PM', value: 15 },
          { name: '8 PM', value: 10 },
          { name: '10 PM', value: 7 }
        ]);
        
        // Workflow execution data
        setWorkflowData([
          { name: 'Mon', value: 10 },
          { name: 'Tue', value: 15 },
          { name: 'Wed', value: 12 },
          { name: 'Thu', value: 18 },
          { name: 'Fri', value: 25 },
          { name: 'Sat', value: 20 },
          { name: 'Sun', value: 15 }
        ]);
        
        // Summary metrics
        setMetrics({
          csiValue: 12600,
          csiChange: 8.3,
          workflowExecutions: 32,
          workflowChange: 6.8
        });
        
        setLoading(false);
      }, 1200);
    };
    
    fetchData();
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 1,
      notation: 'compact',
    }).format(value);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <div className="flex justify-between items-start mb-1">
        <div>
          <div className="text-sm text-gray-400 mb-1">CSI Satisfaction</div>
          {loading ? (
            <div className="animate-pulse bg-gray-700 h-7 w-32 rounded mb-1"></div>
          ) : (
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold mr-2">{formatCurrency(metrics.csiValue)}</h3>
              <span className="text-xs px-1.5 py-0.5 rounded bg-green-500 bg-opacity-20 text-green-400">
                +{metrics.csiChange}%
              </span>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-400">
          Last 12 months
        </div>
      </div>
        
      <div className="h-36 mt-4">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={satisfactionData}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                itemStyle={{ color: '#E5E7EB' }}
                formatter={(value) => [`${value}`, 'Value']}
              />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
        
      <div className="mt-2 flex justify-end">
        <button className="text-xs text-green-400 hover:text-green-300">
          View Report
        </button>
      </div>
        
      <div className="mt-4">
        <div className="text-sm text-gray-400 mb-2">Your Workflow Executions</div>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="bg-gray-700 h-4 w-24 rounded"></div>
            <div className="bg-gray-700 h-20 w-full rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center text-xs text-gray-400 mb-1">
              <span className="text-green-400 font-medium text-sm">{metrics.workflowExecutions}</span>
              <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-green-500 bg-opacity-20 text-green-400">
                +{metrics.workflowChange}%
              </span>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workflowData}>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                    itemStyle={{ color: '#E5E7EB' }}
                    formatter={(value) => [`${value}`, 'Executions']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
              
            <div className="mt-2 flex justify-end">
              <button className="text-xs text-green-400 hover:text-green-300">
                View Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SatisfactionChart;