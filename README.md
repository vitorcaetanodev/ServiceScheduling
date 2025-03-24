# ServiceScheduling
 
Aqui está o **README.md** pronto para você copiar e colar no GitHub:

```markdown
# Service Scheduling

**Version:** 1.0.0

**Description:**  
A system to manage service provider schedules and client appointments with real-time updates and Google Calendar integration.

## 📝 Overview

This project provides a platform for service providers to manage their schedules and allows clients to book appointments. It also integrates with Google Calendar to sync appointments in real-time.

## 🚀 Getting Started

### Prerequisites
Before running the project, ensure you have the following software installed:

- **Node.js** (v16.x or later)
- **Google Cloud Project** with the **Google Calendar API** enabled
- **npm** (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/service-scheduling.git
   cd service-scheduling
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Google API credentials:
   - Follow the instructions to set up Google Calendar API and obtain your `credentials.json` file from Google Cloud Console.
   - Place this file in the root directory of the project.

4. Start the server:
   ```bash
   npm start
   ```

5. The application should now be running locally on `http://localhost:3000`.

## 🛠 Technologies Used

- **Backend:** Node.js
- **Web Framework:** Express
- **Real-Time Communication:** Socket.IO
- **Google Calendar API:** For synchronizing appointments with Google Calendar

## 🧪 Running Tests

To run the tests with Mocha, use the following command:

```bash
npm test
```

## 📂 Project Structure

- **server.js** - The main entry point of the application, handling API routes and real-time connections.
- **public/** - Frontend files (HTML, CSS, JS).
- **routes/** - Contains API route definitions for appointments and scheduling.
- **models/** - Defines the schema and database logic for appointments.
- **services/** - Helper functions for Google Calendar integration and real-time updates.

## ⚙️ Scripts

- **`npm start`** - Starts the server.
- **`npm test`** - Runs the tests using Mocha.

## 🔧 Dependencies

- **express:** ^4.18.0  
  Web framework for Node.js.
- **socket.io:** ^4.5.0  
  Real-time bi-directional communication.
- **googleapis:** ^105.0.0  
  Google's API client for accessing Google Calendar.

### Dev Dependencies:
- **mocha:** ^10.0.0  
  Testing framework.
- **chai:** ^4.3.6  
  Assertion library for Mocha.
- **proxyquire:** ^2.1.3  
  For testing and mocking dependencies.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📄 Author

Vitor Caetano
```

Agora você pode copiar e colar este conteúdo diretamente no seu repositório no GitHub!
