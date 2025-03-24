const request = require('supertest');
const express = require('express');
const appointmentRoutes = require('../routes/appointmentRoutes');

const app = express();
app.use(express.json());
app.use('/appointments', appointmentRoutes);

// Tests for appointment routes

describe('Appointment Routes', () => {
  // Since appointments are stored in-memory, tests may affect each other. In real applications, use a test database or reset state between tests.

  test('POST /appointments - successfully create an appointment', async () => {
    const appointmentData = { title: 'Test Appointment', date: '2023-10-10' };
    const response = await request(app)
      .post('/appointments')
      .send(appointmentData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(appointmentData.title);
    expect(response.body.date).toBe(appointmentData.date);
  });

  test('GET /appointments - returns an array of appointments', async () => {
    const response = await request(app)
      .get('/appointments');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('GET /appointments/:id - returns 404 for non-existent appointment', async () => {
    const response = await request(app)
      .get('/appointments/9999');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Appointment not found');
  });

  test('GET /appointments/:id - successfully retrieve a specific appointment', async () => {
    // Create an appointment first
    const postResponse = await request(app)
      .post('/appointments')
      .send({ title: 'Appointment 2', date: '2023-10-15' });
    const id = postResponse.body.id;

    const getResponse = await request(app)
      .get(`/appointments/${id}`);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.id).toBe(id);
    expect(getResponse.body.title).toBe('Appointment 2');
  });

  test('PUT /appointments/:id - successfully update an appointment', async () => {
    // Create an appointment first
    const postResponse = await request(app)
      .post('/appointments')
      .send({ title: 'Appointment 3', date: '2023-11-11' });
    const id = postResponse.body.id;

    // Update the appointment
    const updatedData = { title: 'Updated Appointment 3' };
    const putResponse = await request(app)
      .put(`/appointments/${id}`)
      .send(updatedData);
    expect(putResponse.statusCode).toBe(200);
    expect(putResponse.body.id).toBe(id);
    expect(putResponse.body.title).toBe('Updated Appointment 3');
  });

  test('POST /appointments - fails when required fields are missing', async () => {
    const response = await request(app)
      .post('/appointments')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Missing required appointment fields: title, date');
  });
});
