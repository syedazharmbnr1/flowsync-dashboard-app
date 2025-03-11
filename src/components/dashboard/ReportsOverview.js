import React, { useState, useEffect } from 'react';
import { Download, Loader, ChevronRight, Filter, ChevronDown } from 'lucide-react';
import { supabase } from '../../api/supabase';

const ReportsOverview = () => {
  const [savedReports, setSavedReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch reports from the database
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be a call to Supabase
        // For now, we'll simulate with mock data
        setTimeout(() => {
          setSavedReports([
            { id: 1, name: 'Q4 2024 Revenue Analysis', date: '2024-11-02', status: 'Completed' },
            { id: 2, name: 'User Growth Metrics', date: '2024-10-28', status: 'Completed' },
            { id: 3, name: 'Workflow Automation Impact', date: '2024-11-05', status: 'In Progress' }
          ]);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
      }
    };
    
    fetchReports();
  }, []);

  // Toggle select all reports
  const toggleSelectAllReports = () => {
    if (selectedReports.length === savedReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(savedReports.map(report => report.id));
    }
  };

  // Toggle individual report selection
  const toggleReportSelection = (reportId) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  // Handle report creation
  const handleReportCreate = () => {
    setIsCreatingReport(true);
    
    // Simulate report creation process
    setTimeout(() => {
      // Generate a new report
      const newReport = {
        id: savedReports.length + 1,
        name: 'New Custom Report',
        date: new Date().toISOString().split('T')[0],
        status: 'In Progress'
      };
      
      // Add to the list
      setSavedReports([newReport, ...savedReports]);
      setIsCreatingReport(false);
    }, 2000);
  };

  // Handle data export
  const exportData = (format) => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setShowExportOptions(false);
      
      // Show success message (in a real app, this would use a toast notification)
      alert(`Data exported as ${format} successfully`);
    }, 1500);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-800 rounded-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Reports overview</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <button 
              className="text-gray-400 hover:text-gray-100 text-sm border border-gray-700 px-3 py-1 rounded flex items-center"
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
          
          <button 
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded flex items-center"
            onClick={handleReportCreate}
            disabled={isCreatingReport}
          >
            {isCreatingReport ? (
              <>
                <Loader size={14} className="mr-1 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Report'
            )}
          </button>
        </div>
      </div>
        
      <div className="text-gray-400 text-sm">
        <div className="flex items-center border-b border-gray-700 pb-3">
          <input 
            type="checkbox" 
            className="mr-3"
            checked={selectedReports.length === savedReports.length && savedReports.length > 0}
            onChange={toggleSelectAllReports}
          />
          <div className="flex-1">
            Select All
          </div>
          <Filter size={16} className="mr-2 cursor-pointer" />
          <ChevronDown size={16} className="cursor-pointer" />
        </div>
          
        {loading ? (
          <div className="animate-pulse space-y-4 py-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 rounded mr-3"></div>
                <div className="flex-1">
                  <div className="bg-gray-700 h-5 w-3/4 rounded mb-1"></div>
                  <div className="bg-gray-700 h-3 w-1/3 rounded"></div>
                </div>
                <div className="bg-gray-700 h-5 w-16 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : savedReports.length > 0 ? (
          <div className="divide-y divide-gray-700">
            {savedReports.map(report => (
              <div key={report.id} className="flex items-center py-3">
                <input 
                  type="checkbox" 
                  className="mr-3"
                  checked={selectedReports.includes(report.id)}
                  onChange={() => toggleReportSelection(report.id)}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-200">{report.name}</div>
                  <div className="text-xs text-gray-500">Created: {formatDate(report.date)}</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  report.status === 'Completed' 
                    ? 'bg-green-500 bg-opacity-20 text-green-400' 
                    : 'bg-blue-500 bg-opacity-20 text-blue-400'
                }`}>
                  {report.status}
                </div>
                <ChevronRight size={16} className="ml-2 cursor-pointer text-gray-500" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reports created yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsOverview;