import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // State to manage form input values
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/departments')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:5000/employees/${id}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, [id])

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Custom logic to handle form submission (send data to the server)
    axios.put(`http://localhost:5000/employees/${id}`, formData)
      .then(response => console.log(response))
      .catch(error => console.error(error));
    // Reset the form after submission
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      department: '',
    });
    navigate('/employees');
};

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="middleName">
        <Form.Label>Middle Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter middle name"
          name="middleName"
          value={formData.middleName}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="department">
        <Form.Label>Department</Form.Label>
        <Form.Select
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>Select a department</option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Employee
      </Button>
      <Link to="/employees"><Button variant="secondary">Cancel</Button></Link>
    </Form>
  );
};

export default EditEmployee;
