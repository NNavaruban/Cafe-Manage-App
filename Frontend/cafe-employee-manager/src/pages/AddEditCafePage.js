import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { addCafe, updateCafe, getCafe, getLocations } from '../utils/api';

function AddEditCafePage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    getLocations().then(response => setLocations(response.data));
    if (id) {
      // Fetch existing cafe data to prefill form
      getCafe(id).then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
        setLocation(response.data.location);
      });
    }
  }, [id]);

  const handleSubmit = () => {
    const data = { name, description, location };

    if (!name || !description || !location) {
      setError('All fields are required');
      return;
    }

    if (id) {
      updateCafe({ ...data, id }).then(() => {
        alert('Cafe updated');
        navigate('/');
      });
    } else {
      addCafe(data).then(() => {
        alert('Cafe added');
        navigate('/');
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  }


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
      <Typography variant="h5" gutterBottom>Edit Cafe</Typography>
      <form >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cafe Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />

          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description" value={description} onChange={(e) => setDescription(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
          </Grid>


          <Grid item xs={12}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Location</InputLabel>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                label="Location"
              >

                {locations.map((loc, index) => (
                  <MenuItem key={index} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

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
              onClick={handleCancel}
            >
              Cancel
            </button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default AddEditCafePage;
