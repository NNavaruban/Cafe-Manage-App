import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7185/api', // Adjust with the API base URL
});

export const getCafes = (location) => api.get(`/Cafes/cafes?location=${location}`);
export const getCafeById = (id) => api.get(`/Cafes/cafe?id=${id}`);
export const getEmployees = (cafe) => api.get(`Employees/employees?cafeId=${cafe}`);
export const getEmployee = (id) => api.get(`Employees/employee?id=${id}`);
export const addCafe = (data) => api.post('/Cafes/cafe', data);
export const addEmployee = (data) => api.post('Employees/employee', data);
export const updateCafe = (data) => api.put('/Cafes/cafe', data);
export const updateEmployee = (data) => api.put('Employees/employee', data);
export const deleteEmployee = (id) => api.delete(`Employees/employee?id=${id}`);
export const deleteCafe = (id) => api.delete(`/Cafes/cafe?id=${id}`);
export const getCafe = (id) => api.get(`/Cafes/cafe?id=${id}`);
export const getAllCafes = () => api.get(`/Cafes/allCafes`);
export const getLocations = ()=> api.get(`/Cafes/locations`);



