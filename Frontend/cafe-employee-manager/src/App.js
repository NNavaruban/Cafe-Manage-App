import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CafePage from './pages/CafePage';
import EmployeePage from './pages/EmployeePage';
import AddEditCafePage from './pages/AddEditCafePage';
import AddEditEmployeePage from './pages/AddEditEmployeePage';
 import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/cafesList" element={<CafePage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/cafes/:id" element={<AddEditCafePage />} />
        <Route path="/cafes" element={<AddEditCafePage />} />
        <Route path="/edit-employee/:id" element={<AddEditEmployeePage />} />
        <Route path="/add-employee" element={<AddEditEmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;