import React, { useState, useEffect } from 'react';
import { getCafes, deleteCafe, getLocations } from '../utils/api';  // Import deleteCafe from api.js
import { AgGridReact } from 'ag-grid-react';
import {  FormControl, FormLabel, MenuItem, Select, InputLabel, FormHelperText, Box, Button, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function CafePage() {
  const [cafes, setCafes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState([]);
  const [cafeId, setCafeId] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   getLocations().then(response => setLocations(response));
  // }, [locations]);

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

  useEffect(() => {
    getLocations().then(response=> setLocations(response.data));
    getCafes(location).then(response => setCafes(response.data));

  }, [location]);

  const handleEdit = (id) => {
    navigate(`/cafes/${id}`);
  };


  const handlelocationChange = async (event) => {
    const selectedLocationId = event.target.value;
    setLocation(selectedLocationId); // Update the selected cafeId

    getCafes(location).then(response => setCafes(response.data));
    // getEmployees(cafeId).then(response => setEmployees(response.data));
   
  };
  const handleDelete = (cafeId) => {
    if (window.confirm('Are you sure you want to delete this café?')) {
      deleteCafe(cafeId).then(() => {
        alert('Café deleted!');
        // Refresh the list of cafes after deletion
        getCafes(location).then(response => setCafes(response.data));
      }).catch(error => {
        alert('Error deleting cafe');
        console.error(error);
      });
    }
  };

  const columns = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Employees', field: 'emplyeeCount' },
    { headerName: 'Location', field: 'location' },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <>
        <button color="primary" onClick={() => handleEdit(params.data.id)}>Edit</button> <> </>
        <button color="secondary" onClick={() => handleDelete(params.data.id)}>Delete</button>
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
      <Typography variant="h5" gutterBottom>Cafe List</Typography>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
               
      

        <FormControl fullWidth margin="normal" required>
         <InputLabel>Select Location</InputLabel>
         <Select
           value={location}
           onChange={handlelocationChange}
           label="Location"
         >

           {locations.map((loc, index) => (
            <MenuItem key={index} value={loc}>
              {loc}
             </MenuItem>
          ))}
        </Select>
       </FormControl>



          <Grid item>
          <button variant="contained" color="primary" type='button' onClick={() => navigate('/cafes/')}>Add New Cafe</button>
              {/* <Button variant="contained" color="primary" onClick={onAddNew}>
                  Add New Employee
              </Button> */}
          </Grid>
      </Grid>
      <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
          <AgGridReact
              columnDefs={columns} rowData={cafes} 
              defaultColDef={defaultColDef}
              gridOptions={gridOptions}
              pagination={true}
              domLayout="autoHeight"
          />
      </div>
  </Box>
);
};


export default CafePage;
