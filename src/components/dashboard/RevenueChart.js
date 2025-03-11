import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataTimeframe, setDataTimeframe] = useState('Last 10 months');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [quarterGrowth, setQuarterGrowth] = useState({ value: 0, percentage: 0 });

  // Simulate fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // In a real application, this would be an API call
      setTimeout(() => {
        const chartData = [
          { name: 'Jan', value: 50, expense: 30 },
          { name: 'Feb', value: 45, expense: 25 },
          { name: 'Mar', value: 60, expense: 35 },
          { name: 'Apr', value: 90, expense: 40 },
          { name: 'May', value: 120, expense: 55 },
          { name: 'Jun', value: 100, expense: 50 },
          { name: 'Jul', value: 140, expense: 60 },
          { name: 'Aug', value: 170, expense: 65 },
          { name: 'Sep', value: 190, expense: 75 },
          { name: 'Oct', value: 240, expense: 90 }
        ];
        
        setData(chartData);
        
        // Calculate total revenue
        const total = chartData.reduce((sum, item) => sum + item.value, 0);
        setTotalRevenue(total * 1000); // Assuming values are in thousands
        
        // Calculate quarter growth
        setQuarterGrowth({
          value: 325200, // Example value for Q4
          percentage: 26.5 // Example percentage growth
        });
        
        setLoading(false);
      }, 1500);
    };
    
    fetchData();
  }, [dataTimeframe]);

  // Toggle timeframe
  const toggleTimeframe = () => {
    const newTimeframe = dataTimeframe === 'Last 10 months' ? 'Last 6 months' : 'Last 10 months';
    setDataTimeframe(newTimeframe);
  };

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
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm text-gray-400 mb-1">Total revenue</div>
          {loading ? (
            <div className="animate-pulse bg-gray-700 h-7 w-32 rounded mb-1"></div>
          ) : (
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold mr-2">{formatCurrency(totalRevenue)}</h3>
              <span className="text-xs px-1.5 py-0.5 rounded bg-green-500 bg-opacity-20 text-green-400">+9.2%</span>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center text-xs">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
            <span className="text-gray-400">Revenue</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
            <span className="text-gray-400">Expenses</span>
          </div>
          <div 
            className="flex items-center text-xs border border-gray-700 rounded px-2 py-0.5 cursor-pointer"
            onClick={toggleTimeframe}
          >
            <span className="text-gray-400">24 Jan 2024 - Oct 2024</span>
            <ChevronDown size={14} className="ml-1 text-gray-500" />
          </div>
        </div>
      </div>
        
      <div className="h-64">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6B7280" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6B7280" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                itemStyle={{ color: '#E5E7EB' }}
                formatter={(value) => [`$${value}k`, undefined]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#6B7280"
                fillOpacity={0.5}
                fill="url(#colorExpense)"
                name="Expense"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
        
      <div className="mt-2 flex items-center">
        <div className="bg-gray-900 bg-opacity-60 text-white text-xs px-2 py-1 rounded">
          <div className="flex items-center">
            <span className="font-medium">{formatCurrency(quarterGrowth.value)}</span>
            <span className="mx-1">•</span>
            <span className="text-green-400">+{quarterGrowth.percentage}%</span>
            <span className="ml-1">in Q4 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;