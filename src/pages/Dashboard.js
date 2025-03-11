import React from 'react';
import MetricsRow from '../components/dashboard/MetricsRow';
import RevenueChart from '../components/dashboard/RevenueChart';
import SatisfactionChart from '../components/dashboard/SatisfactionChart';
import ReportsOverview from '../components/dashboard/ReportsOverview';
import TeamPerformance from '../components/dashboard/TeamPerformance';

const Dashboard = () => {
  return (
    <>
      {/* Metrics Row */}
      <MetricsRow />
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueChart />
        <SatisfactionChart />
      </div>
      
      {/* Reports Overview */}
      <ReportsOverview />
      
      {/* Team Performance */}
      <TeamPerformance />
    </>
  );
};

export default Dashboard;