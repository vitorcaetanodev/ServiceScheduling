const { expect } = require('chai');
const proxyquire = require('proxyquire');

// Create a fake for googleCalendar module
const fakeEvent = { eventId: 'shared-test-event', details: 'Test event details' };

let createEventStub = async (eventData) => {
  return { ...fakeEvent, resource: eventData };
};

const fakeGoogleCalendar = {
  createEvent: async (eventData) => createEventStub(eventData)
};

// Import sharedCalendar module using proxyquire to inject our fake googleCalendar
const sharedCalendar = proxyquire('../calendar/sharedCalendar', {
  './googleCalendar': fakeGoogleCalendar
});

describe('sharedCalendar Module', () => {
  let fakeIO;

  beforeEach(() => {
    // Reset stub to default successful behavior
    createEventStub = async (eventData) => {
      return { ...fakeEvent, resource: eventData };
    };
    
    // Create a fake IO object to capture emitted events
    fakeIO = {
      emittedEvent: null,
      emittedData: null,
      emit(event, data) {
        this.emittedEvent = event;
        this.emittedData = data;
      }
    };
  });

  it('should create a calendar event and broadcast it via io.emit', async () => {
    const eventData = {
      summary: 'Shared Event',
      start: { dateTime: '2023-11-01T12:00:00Z' },
      end: { dateTime: '2023-11-01T13:00:00Z' }
    };

    const result = await sharedCalendar.shareEvent(fakeIO, eventData);

    // Verify that the created event matches expected values
    expect(result).to.have.property('eventId', 'shared-test-event');
    expect(result).to.have.property('resource').that.deep.equals(eventData);

    // Verify that io.emit was called with correct event name and data
    expect(fakeIO.emittedEvent).to.equal('calendarShared');
    expect(fakeIO.emittedData).to.deep.equal(result);
  });

  it('should throw an error and not emit when googleCalendar.createEvent fails', async () => {
    // Overwrite the createEvent stub to simulate an error
    createEventStub = async () => { throw new Error('Creation failed'); };
    
    const eventData = { summary: 'Failing Event' };
    
    try {
      await sharedCalendar.shareEvent(fakeIO, eventData);
      throw new Error('Test failed: error was not thrown');
    } catch (error) {
      expect(error.message).to.equal('Creation failed');
      // Ensure that no event was emitted
      expect(fakeIO.emittedEvent).to.be.null;
      expect(fakeIO.emittedData).to.be.null;
    }
  });
});
