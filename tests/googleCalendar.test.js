const { expect } = require('chai');
const proxyquire = require('proxyquire');

// Fake implementation for googleapis
const fakeCalendar = {
  events: {
    insert: async (params) => {
      return { data: { eventId: 'test-event', calendarId: params.calendarId, resource: params.resource } };
    }
  }
};

const fakeGoogleapis = {
  google: {
    auth: {
      OAuth2: function(clientId, clientSecret, redirectUri) {
        // Simple fake OAuth2 client stub
        this.setCredentials = () => {};
      }
    },
    calendar: function(options) {
      return fakeCalendar;
    }
  }
};

// Load googleCalendar module with the fake googleapis using proxyquire
const googleCalendar = proxyquire('../calendar/googleCalendar', { 'googleapis': fakeGoogleapis });

describe('googleCalendar Module', () => {
  const originalInsert = fakeCalendar.events.insert;

  afterEach(() => {
    // Restore the original insert function after each test
    fakeCalendar.events.insert = originalInsert;
  });

  it('should successfully create a new event and return event data', async () => {
    const eventData = {
      summary: 'Test Event',
      start: { dateTime: '2023-11-01T10:00:00Z' },
      end: { dateTime: '2023-11-01T11:00:00Z' }
    };
    const response = await googleCalendar.createEvent(eventData);
    expect(response).to.have.property('eventId', 'test-event');
    expect(response).to.have.property('calendarId');
    expect(response.resource).to.deep.equal(eventData);
  });

  it('should throw an error when event creation fails', async () => {
    // Simulate failure by overriding the insert method
    fakeCalendar.events.insert = async () => { throw new Error('Insertion failed'); };
    const eventData = { summary: 'Test Event Failure' };
    try {
      await googleCalendar.createEvent(eventData);
      // Should not reach here
      throw new Error('Expected error was not thrown');
    } catch (error) {
      expect(error.message).to.equal('Insertion failed');
    }
  });
});
