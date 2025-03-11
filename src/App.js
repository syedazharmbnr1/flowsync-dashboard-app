import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
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
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Placeholder components for pages that are not fully implemented yet
const TaskOverview = () => (
  <div className="bg-gray-800 rounded-md p-6">
    <h2 className="text-xl font-medium mb-4">Task Overview</h2>
    <p className="text-gray-400">This page will display tasks and their status.</p>
  </div>
);

const ReportsAnalytics = () => (
  <div className="bg-gray-800 rounded-md p-6">
    <h2 className="text-xl font-medium mb-4">Reports & Analytics</h2>
    <p className="text-gray-400">This page will provide detailed analytics and reporting tools.</p>
  </div>
);

const TeamActivity = () => (
  <div className="bg-gray-800 rounded-md p-6">
    <h2 className="text-xl font-medium mb-4">Team Activity</h2>
    <p className="text-gray-400">This page will show all recent team activity and collaboration metrics.</p>
  </div>
);

const WorkflowTemplates = () => (
  <div className="bg-gray-800 rounded-md p-6">
    <h2 className="text-xl font-medium mb-4">Workflow Templates</h2>
    <p className="text-gray-400">This page will display available workflow templates and allow for customization.</p>
  </div>
);

const Features = () => (
  <div className="bg-gray-800 rounded-md p-6">
    <h2 className="text-xl font-medium mb-4">Features</h2>
    <p className="text-gray-400">This page will showcase available features and upcoming functionality.</p>
  </div>
);

const UsersTeams = () => (
  <div className="bg-gray-800 rounded-md p-6">
    <h2 className="text-xl font-medium mb-4">Users & Teams</h2>
    <p className="text-gray-400">This page will allow for user and team management.</p>
  </div>
);

const Pricing = () => (
  <div className="bg-gray-800 rounded-md p-6">
    <h2 className="text-xl font-medium mb-4">Pricing</h2>
    <p className="text-gray-400">This page will display available pricing plans and billing information.</p>
  </div>
);

const Integrations = () => (
  <div className="bg-gray-800 rounded-md p-6">
    <h2 className="text-xl font-medium mb-4">Integrations</h2>
    <p className="text-gray-400">This page will show available integrations and connection status.</p>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/task-overview" element={
            <ProtectedRoute>
              <DashboardLayout>
                <TaskOverview />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports-analytics" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ReportsAnalytics />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/team-activity" element={
            <ProtectedRoute>
              <DashboardLayout>
                <TeamActivity />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/workflow-templates" element={
            <ProtectedRoute>
              <DashboardLayout>
                <WorkflowTemplates />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/features" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Features />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/users-teams" element={
            <ProtectedRoute>
              <DashboardLayout>
                <UsersTeams />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/pricing" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Pricing />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/integrations" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Integrations />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;