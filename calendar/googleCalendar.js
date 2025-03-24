const { google } = require('googleapis');

// Set up OAuth2 client using environment variables
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID, 
  process.env.GOOGLE_CLIENT_SECRET, 
  process.env.GOOGLE_REDIRECT_URI
);

// Use a refresh token to obtain new access tokens automatically
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

// Initialize Google Calendar API client
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

/**
 * Create a new event in the configured Google Calendar.
 * @param {Object} eventData - The event details conforming to Google Calendar API format.
 * @returns {Object} The created event data as returned by Google.
 */
async function createEvent(eventData) {
  try {
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: eventData,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
}

module.exports = {
  createEvent,
};
