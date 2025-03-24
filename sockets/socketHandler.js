module.exports = (socket, io) => {
  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  // Example event handling: Update Schedule
  socket.on('updateSchedule', (data) => {
    console.log(`Received updateSchedule event from ${socket.id}`, data);
    // Broadcast schedule update to all connected clients
    io.emit('scheduleUpdated', data);
  });

  // Additional event handlers can be added here as needed
};
