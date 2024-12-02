import React, { useEffect, useState } from 'react';
import {  FormControl, FormLabel, MenuItem, Select, InputLabel, FormHelperText, Box, Button, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllCafes, deleteCafe, getEmployees, deleteEmployee } from '../utils/api';  // Import deleteCafe from api.js
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



const EmployeePage = () => {
  // const [employees, setEmployees] = useState([]);
  const [employees, setEmployees] = useState('');
  const [cafes, setCafes] = useState([]);
  const [cafeId, setCafeId] = useState('');
  const navigate = useNavigate();

  const defaultColDef = {
    resizable: true,
    flex: 1,
    minWidth: 150,
};

// Grid Options
const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
};

  // useEffect(() => {
  //   getEmployees(cafe).then(response => setEmployees(response.data));
  // }, [cafe]);

  useEffect(() => {
    getAllCafes().then(response=> setCafes(response.data));

   // getEmployees(cafeId).then(response => setEmployees(response.data));
  }, [cafeId]);



  const handleEdit = (id) => {
    navigate(`/cafes/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id).then(() => {
        alert('Employee deleted!');
        // Refresh the list of cafes after deletion
        getEmployees(cafeId).then(response => setEmployees(response.data));
      }).catch(error => {
        alert('Error deleting cafe');
        console.error(error);
      });
    }
  };


  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/employees');
  //       setEmployees(response.data);
  //     } catch (error) {
  //       console.error("There was an error fetching the employees!", error);
  //     }
  //   };
    
  //   fetchEmployees();
  // }, []);

  const handleEditEmployee = (id) => {
    navigate(`/edit-employee/${id}`);
  };




  const handleCafeChange = async (event) => {
    const selectedCafeId = event.target.value;
    console.log(event.target.value);
    setCafeId(selectedCafeId); // Update the selected cafeId

    getEmployees(selectedCafeId).then(response => setEmployees(response.data));
    // const fetchEmployees = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:5000/api/employees');
    //     setEmployees(response.data);
    //   } catch (error) {
    //     console.error("There was an error fetching the employees!", error);
    //   }
    // };



    // // Fetch employees for the selected cafe
    // const fetchEmployees = async () => {
    //   // Example: Replace with your actual API call to fetch employees for the selected cafeId
    //   if (selectedCafeId) {
    //     const employeeData = [
    //       { id: 'emp1', name: 'John Doe', email: 'john@example.com', phone: '91234567', cafe: selectedCafeId },
    //       { id: 'emp2', name: 'Jane Smith', email: 'jane@example.com', phone: '98765432', cafe: selectedCafeId },
    //     ];
    //     setEmployees(employeeData); // Set the employees for the selected cafeId
    //   } else {
    //     setEmployees([]); // Clear employees if no cafe is selected
    //   }
    // };

    // await fetchEmployees();
  };

  const columns = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'emailAddress' },
    { headerName: 'PhoneNumber', field: 'phoneNumber' },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <>
        <button onClick={() => handleEditEmployee(params.data.id)}>Edit</button><>  </>
        <button onClick={() => handleDelete(params.data.id)}>Delete</button>
        </>
      )
    }
  ];



  





  return (
    <Box sx={{
        width: '100%',
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
        '@media (max-width: 600px)': {
            padding: 1,
        },
    }}>
        <Typography variant="h5" gutterBottom>Employee List</Typography>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
            
  
  
        <FormControl fullWidth margin="normal" required>
        <InputLabel>Select Cafe</InputLabel>
          <Select
            value={cafeId}
            // onChange={(e) => setCafeId(e.target.value)}
            onChange={handleCafeChange}
          >
            {cafes.map(cafe => (
              
              <MenuItem key={cafe.id} value={cafe.id}>
                {cafe.name}
              </MenuItem>
            ))}
          </Select>
         
        </FormControl>
  
  
  
            <Grid item>
            <button variant="contained" color="primary" type='button' onClick={() => navigate('/add-employee')}>Add New Employee</button>
                
            </Grid>
        </Grid>
        <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
            <AgGridReact
                columnDefs={columns} rowData={employees}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
                pagination={true}
                domLayout="autoHeight"
            />
        </div>
    </Box>
  );











};

export default EmployeePage;