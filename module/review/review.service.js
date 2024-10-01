const express = require('express');
const comfun = require('../../common/comfunc');
const reviewModel = require('./review.model');

const router = express.Router();

router.get('/books/:id/reviews', reviewModel.getReviewById);

router.post('/books/:id/reviews', reviewModel.addBookReview);


module.exports = router;