const express = require('express');
const router = express.Router();

// In-memory store for appointments
let appointments = [];
let nextId = 1;

// Create a new appointment
router.post('/', (req, res) => {
  const appointment = req.body;
  if (!appointment || !appointment.title || !appointment.date) {
    return res.status(400).json({ error: 'Missing required appointment fields: title, date' });
  }
  appointment.id = nextId++;
  appointments.push(appointment);
  res.status(201).json(appointment);
});

// Get all appointments
router.get('/', (req, res) => {
  res.json(appointments);
});

// Get a specific appointment by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const appointment = appointments.find(app => app.id === id);
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  res.json(appointment);
});

// Update an appointment by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let appointment = appointments.find(app => app.id === id);
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  const updatedData = req.body;
  // Only update provided fields
  appointment = Object.assign(appointment, updatedData);
  appointments = appointments.map(app => app.id === id ? appointment : app);
  res.json(appointment);
});

module.exports = router;
