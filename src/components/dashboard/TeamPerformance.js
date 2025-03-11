import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

const TeamPerformance = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define colors for pie chart segments
  const COLORS = ['#10B981', '#3482F6', '#6366F1', '#EC4899', '#F59E0B'];

  // Simulate fetching team performance data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // In a real application, this would be an API call
      setTimeout(() => {
        setTeamData([
          { name: 'Marketing', value: 30 },
          { name: 'Sales', value: 25 },
          { name: 'Development', value: 18 },
          { name: 'Customer Support', value: 15 },
          { name: 'Finance', value: 12 }
        ]);
        
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, []);

  // Calculate the maximum value for scaling the progress bars
  const maxValue = Math.max(...teamData.map(team => team.value));

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-300">{`${payload[0].value} workflows`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Team Performance</h2>
        <div className="text-xs text-gray-400">
          Last 30 days
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="h-48">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={teamData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {teamData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        
        <div className="col-span-2">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="flex justify-between mb-1">
                    <div className="bg-gray-700 h-4 w-20 rounded"></div>
                    <div className="bg-gray-700 h-4 w-16 rounded"></div>
                  </div>
                  <div className="bg-gray-700 h-2 w-full rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {teamData.map((team, index) => (
                <div key={team.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">{team.name}</span>
                      <span className="text-sm text-gray-300">{team.value} workflows</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="rounded-full h-2" 
                        style={{ 
                          width: `${(team.value / maxValue) * 100}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <button className="text-xs text-green-400 hover:text-green-300 flex items-center">
              View Full Report <ArrowUpRight size={12} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;