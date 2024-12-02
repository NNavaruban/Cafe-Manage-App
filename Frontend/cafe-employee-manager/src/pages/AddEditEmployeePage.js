import React, { useState, useEffect } from 'react';
import { TextField, FormLabel, FormHelperText, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCafes,getEmployee,updateEmployee, addEmployee } from '../utils/api'

const AddEditEmployeePage = () => {
  const [name, setName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [cafeId, setCafeId] = useState('');
  const [cafes, setCafes] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();  // For editing, get the employee ID from the URL

  useEffect(() => {
    // Fetch cafes list to populate the dropdown
    getAllCafes().then(response => setCafes(response.data))
      .catch(error => console.error('Error on fetching cafes', error));

    if (id) {
      // If editing an employee, fetch the existing data

      getEmployee(id)
        .then(response => {
          const employee = response.data;
          console.log('hi');
          console.log(employee);
          setName(employee.name);
          setEmail(employee.emailAddress);
          setPhoneNumber(employee.phoneNumber);
          setGender(employee.gender);
          setCafeId(employee.cafeId);  // Assuming 'cafe' is an object with 'id'
        })
        .catch(error => console.error('Error fetching employee details', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!name || !emailAddress || !phoneNumber || !cafeId) {
      setError('All fields are required');
      return;
    }

    const employeeData = { Name: name, EmailAddress: emailAddress, PhoneNumber: phoneNumber, Gender: gender, CafeId: cafeId };

    try {
      if (id) {
        // If editing, update the existing employee

        updateEmployee({ ...employeeData, id }).then(() => {
          alert('Employee updated');
          navigate('/employees');
        });


        // employeeData.id = id;
        // await axios.put(`https://localhost:7185/api/Employees/employee`, employeeData);


      } else {
        // If adding new, create the employee



        addEmployee(employeeData).then(() => {
          alert('Employee added');
          navigate('/employees');
        });
        
        // await axios.post('https://localhost:7185/api/Employees/employee', employeeData);
      }
      navigate('/employees'); // Redirect to the employees list after submitting
    } catch (error) {
      console.error('Error saving employee data', error);
      setError('There was an error saving the employee data');
    }
  };

  return (
    <Box sx={{
      maxWidth: 800,
      margin: '2rem auto',
      padding: '2rem',
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: 'white',
      '@media (max-width: 600px)': {
        padding: '1rem',
        maxWidth: '100%',
      },
    }}>
      <Typography variant="h5" gutterBottom> <h1>{id ? 'Edit Employee' : 'Add New Employee'}</h1></Typography>
      <form >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Employee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address" value={emailAddress} onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
          </Grid>


          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Select Cafe</InputLabel>
            <Select
              value={cafeId}
              onChange={(e) => setCafeId(e.target.value)}
            >
              {cafes.map(cafe => (
                <MenuItem key={cafe.id} value={cafe.id}>
                  {cafe.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid item xs={6} sm={3}>
            <button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              {id ? 'Update' : 'Add'}
            </button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={() => navigate('/employees')}
            >
              Cancel
            </button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );

};

export default AddEditEmployeePage;