const router = require('express').Router();

const Book = require('../models/Book.model');

// ************************************************
// GET ALL BOOKS ROUTE
// ************************************************
router.get('/books', (req, res, next) => {
  // .find() --> always returns an array
  Book.find()
    .then((allBooksFromDB) => {
      // allBooksFromDB is just a placeholder, you can name it however
      res.status(200).json(allBooksFromDB);
    })
    .catch((err) => {
      console.log(
        'An error occurred while getting all othe books from DB: ',
        err
      );
      res.status(500).json({ message: 'Can not connect' });
    });
});

// ************************************************
// CREATE A NEW BOOK ROUTE
// ************************************************

router.post('/books/newbook', (req, res) => {
  // console.log("this is what user added in the form: ", req.body);

  const { title, description, author, rating } = req.body;

  Book.create({ title, description, author, rating })
    .then((newSavedBookFromDB) => {
      // console.log("this is new book: ", newSavedBookFromDB);

      res.status(200).json(newSavedBookFromDB);
    })
    .catch((err) =>
      console.log('Error while saving a new book in the DB: ', err)
    );
});

// ************************************************
// GET A BOOK DETAILS ROUTE
// ************************************************
router.get('/books/:bookId', (req, res) => {
  console.log('The ID is: ', req.params.bookId);

  Book.findById(req.params.bookId)
    .then((bookFromDB) => {
      res.status(200).json(bookFromDB);
    })
    .catch((err) =>
      console.log('Error while getting a book details from the DB: ', err)
    );
});

// ************************************************
// POST Route: SAVE THE CHANGES AFTER EDITING THE BOOK ROUTE
// ************************************************
router.post('/books/:bookID', (req, res) => {
  // console.log("updated book: ", req.body);

  const { title, description, author, rating } = req.body;

  // Book.findByIdAndUpdate(req.params.bookID, req.body)
  Book.findByIdAndUpdate(
    req.params.bookID,
    { title, description, author, rating },
    { new: true }
  )
    .then((updatedBookFromDB) => {
      // console.log(updatedBookFromDB);

      res.status(201).json(updatedBookFromDB);
    })
    .catch((err) =>
      console.log('Error while saving the updates in the book to the DB: ', err)
    );
});

// ************************************************
// POST Route: DELETE THE BOOK ROUTE
// ************************************************
router.delete('/books/:bookID', (req, res) => {
  Book.findByIdAndDelete(req.params.bookID)
    .then(() => res.status(200).json({ message: 'Book deleted successfully' }))
    .catch((err) =>
      console.log('Error while deleting a book from the DB: ', err)
    );
});

// any new routes file you create you have to EXPORT and you have to link to
// app.js (after: "// 👇 Start handling routes here") so the application knows that new file
// is created and some routes will be there too
module.exports = router;
