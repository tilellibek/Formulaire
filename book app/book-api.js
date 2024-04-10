const express = require('express');
const router = express.Router();

// This list mimics a database
let our_database = [];


// POST method: Create a new book
router.post('/', (req, res) => {
    const { isbn, title, author, publishedDate, publisher, numPages } = req.body;

    if (!isbn || !title || !author || !publishedDate || !publisher || !numPages) {
        return res.status(400).json({ error: "Please provide all the requested information." });
    }

    // Check if the book already exists to prevent duplicates
    const exists = our_database.find(book => book.isbn === isbn);
    if (exists) {
        return res.status(409).json({ error: "A book with this ISBN already exists." });
    }

    const newBook = { isbn, title, author, publishedDate, publisher, numPages };
    our_database.push(newBook);

    res.status(201).json(newBook);
});

// GET method: Retrieve all books
router.get('/', (req, res) => {
    res.json(our_database);
});

// GET method: Retrieve a specific book by ISBN
router.get('/:isbn', (req, res) => {
    const book = our_database.find(book => book.isbn === req.params.isbn);
    if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
    }
    res.json(book);
});

// PUT method: Update a book by ISBN
router.put('/:isbn', (req, res) => {
    const index = our_database.findIndex(book => book.isbn === req.params.isbn);

    if (index === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    // Update book with any provided fields
    our_database[index] = { ...our_database[index], ...req.body };
    res.json(our_database[index]);
});

// DELETE method: Delete a book by ISBN
router.delete('/:isbn', (req, res) => {
    const initialLength = our_database.length;
    our_database = our_database.filter(book => book.isbn !== req.params.isbn);

    if (our_database.length === initialLength) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    // No content to send back for a DELETE request
    res.status(204).send();
});

module.exports = router;
