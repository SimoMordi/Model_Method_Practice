const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //

// find   - finds everything
// findById
app.get('/books/:id', async (req, res) => {
    let bookId = req.params.id;
    let book = await Book.findById(bookId);
            res.send(book);
  })
// findOne
app.get('/books/title/:title', async (req, res) => {
    let title = req.params.title
    let bookTitle = await Book.findOne({title: title})
    res.send(bookTitle)
})
// .find()
app.get('/books', async (req, res) => {
  let response = await Book.find()
        res.send(response);
      
})
    
//delete
app.delete('/books/:Id', async (req, res) =>{
    
let deleted = await Book.findByIdAndDelete(req.params.Id)
res.send(deleted)
})



// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})



// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port: http://localhost:${PORT}`);
});


