"use strict";

const googleCalendar = require('./googleCalendar');

/**
 * Share an event by creating it in Google Calendar and broadcasting it to connected clients in real-time.
 * 
 * @param {Object} io - The Socket.IO instance used for broadcasting events.
 * @param {Object} eventData - The event details conforming to the Google Calendar API format.
 * @returns {Promise<Object>} The created event data as returned by Google Calendar API.
 */
async function shareEvent(io, eventData) {
  try {
    // Create the event using the Google Calendar API.
    const createdEvent = await googleCalendar.createEvent(eventData);
    
    // Broadcast the created event to all connected clients.
    io.emit('calendarShared', createdEvent);
    
    return createdEvent;
  } catch (error) {
    console.error('Error sharing calendar event:', error);
    throw error;
  }
}

module.exports = {
  shareEvent,
};
