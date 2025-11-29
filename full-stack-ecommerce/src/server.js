require('dotenv').config(); // TICKET 1.1: Student must create the .env file

const app = require('./app');

// BUG: If PORT is undefined, it crashes with a cryptic error later
// Student should add: const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT; 

if (!PORT) {
    // Ideally this should log a clear error, but for the task, let it throw
    throw new Error("Configuration Error: System Port is missing.");
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
