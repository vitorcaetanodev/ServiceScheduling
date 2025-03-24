const { expect } = require('chai');
const socketHandler = require('../sockets/socketHandler');

// Helper function to capture console.log output
function captureConsoleLog(callback) {
  const originalLog = console.log;
  let output = '';
  console.log = (msg, ...args) => { 
    output += msg + ' ' + args.join(' ') + '\n';
  };
  try {
    callback();
  } finally {
    console.log = originalLog;
  }
  return output;
}

describe('socketHandler Module', () => {
  let fakeSocket;
  let fakeIO;
  let disconnectCallback;
  let updateScheduleCallback;

  beforeEach(() => {
    // Create a fake socket that stores event callbacks
    fakeSocket = {
      id: 'test-socket',
      on: function(event, callback) {
        if (event === 'disconnect') {
          disconnectCallback = callback;
        } else if (event === 'updateSchedule') {
          updateScheduleCallback = callback;
        }
      }
    };

    // Create a fake IO with an 'emit' function that captures its arguments
    fakeIO = {
      emittedEvent: null,
      emittedData: null,
      emit: function(event, data) {
        this.emittedEvent = event;
        this.emittedData = data;
      }
    };
  });

  it('should log disconnect and include socket id when disconnect event is triggered', () => {
    const logOutput = captureConsoleLog(() => {
      // Initialize the socket handler to register events
      socketHandler(fakeSocket, fakeIO);
      // Simulate disconnect
      if (disconnectCallback) disconnectCallback();
    });
    expect(logOutput).to.contain('test-socket');
  });

  it('should broadcast schedule update when updateSchedule event is triggered', () => {
    const testData = { appointment: 'sample appointment', time: '10:00 AM' };
    // Initialize the socket handler
    socketHandler(fakeSocket, fakeIO);
    // Simulate updateSchedule event
    if (updateScheduleCallback) updateScheduleCallback(testData);

    expect(fakeIO.emittedEvent).to.equal('scheduleUpdated');
    expect(fakeIO.emittedData).to.deep.equal(testData);
  });
});
