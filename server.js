const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const socketHandler = require('./sockets/socketHandler');
const googleCalendar = require('./calendar/googleCalendar');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware to parse JSON bodies
app.use(express.json());

// Setup Socket.IO: handle connection events
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  // Delegate socket event handling to the socketHandler module
  socketHandler(socket, io);
});

// Route to create a new Google Calendar event
app.post('/calendar/event', async (req, res) => {
  try {
    const eventData = req.body;
    const result = await googleCalendar.createEvent(eventData);
    res.json(result);
  } catch (error) {
    console.error('Error creating calendar event', error);
    res.status(500).json({ error: 'Failed to create calendar event' });
  }
});

// Appointment routes for creating, fetching and updating appointments
app.use('/appointments', appointmentRoutes);

// Server listening on designated port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
