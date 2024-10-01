const express = require('express');
const comfun = require('../../common/comfunc');
const bookModel = require('./book.model');

const router = express.Router();

router.get('/books', bookModel.getAllBook);

router.get('/books/:id', bookModel.getBookById);

router.post('/books', bookModel.bookCreate);

router.put('/books/:id',bookModel.bookUpdateById);

router.delete('/books/:id', bookModel.bookDeleteById);

router.get('/books/search/:title/:author', bookModel.searhBookName);

router.get('/books/:genre/:startDate/:endDate', bookModel.searhBookGenre);


router.get('/jsonplace', bookModel.jsonPlaceHolder);

module.exports = router;