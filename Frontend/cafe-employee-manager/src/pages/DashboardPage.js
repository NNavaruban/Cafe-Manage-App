import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material'; // Material UI components
import { AgGridReact } from 'ag-grid-react'; // AgGridReact for table
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import EmployeePage from './EmployeePage';
import CafePage from './CafePage';


const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Manage active tab state

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Dashboard Tabs">
        <Tab label="Cafes" />
        <Tab label="Employees" />
      </Tabs>

      {/* Display Content Based on Active Tab */}
      {selectedTab === 0 && <CafePage />}   {/* Cafe Page content */}
      {selectedTab === 1 && <EmployeePage />} {/* Employee Page content */}
    </Box>
  );
};

export default DashboardPage;
