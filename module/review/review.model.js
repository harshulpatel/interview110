const comfun = require('../../common/comfunc');
const con = require('../../common/database')
const jwt = require('jsonwebtoken')

const reviewModel = {

    getReviewById : async(req, res) => {
        try {
            const bookId = req.params.id;

            con.query(`SELECT * FROM tbl_review WHERE book_id = '${bookId}'`,(err,result)=>{
                if (result.length < 1) {
                    return res.status(404).send('No review found');
                } else {
                    return res.status(200).send(result);
                }
            })
            
        } catch (e) {
            return res.status(500).send('Something went wrong');
        }
    },

    addBookReview : async(req, res) => {
        try {
            const bookId = req.params.id;
            const bodyss = req.body;

            var decoded = jwt.verify(req.headers.token, process.env.JWT_SCRET);

            const addBookReview = {
                book_id: bookId,
                user_id: decoded.userId,
                rating: bodyss.rating,
                comment: bodyss.comment 
            }

            con.query(`INSERT INTO tbl_review SET ?`,addBookReview,(err,result)=>{
                if (err) {
                    return res.status(404).send('No review found');
                } else {
                    return res.status(201).send('Review Add Success');
                }
            })
            
        } catch (e) {
            console.log(e)
            return res.status(500).send('Invalid Access Token');
        }
    },

}


module.exports = reviewModel;