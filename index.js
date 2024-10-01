require("dotenv").config();
const express = require("express");

const app = express();

const book = require('./module/book/book.service')
const user = require('./module/user/user.service')
const review = require('./module/review/review.service')

app.use(express.json());

console.log('================')
app.use('', book);
app.use('', user);
app.use('', review);


try {
    app.listen(8989,()=>{
        console.log("APP RUNNING ON 8989")
    });
    
} catch (error) {
    console.log('APP NOT RUNNING')
}

