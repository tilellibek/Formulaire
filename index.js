const express = require('express');
// Import the book router from the file where it's defined
const bookRouter = require('./book-api');

const app = express();

// Define the port number, defaulting to 3000 if not specified in the environment variables
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Mount the book router at the '/our_database' path
app.use('/our_database', bookRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
