const common = require('../../common/comfunc')

const bookModel = {

    getAllBook: async(req, res) => {
        try {
            console.log('======get====')
          const result = common.CON_SELECT(`SELECT * FROM tbl_book WHERE is_active=1 and is_delete=0`, 'Multi');
           
           return res.status(200).json(result);
    
        } catch (e) {
           return res.status(500).send('Something went wrong');
        }
    },

    getBookById : async(req, res) => {
        console.log('=============get book by id', req.params.id)
        try {

            const result = await common.CON_SELECT(`SELECT * FROM tbl_book WHERE id='${req.params.id}' and is_active=1 and is_delete=0`,'Single',false);

            return res.status(200).send(result);
            
        } catch (e) {
            return res.status(500).send('Something went wrong');
        }
    },

    bookCreate: async(req, res) => {
        try {
            const bodys = req.body;
            
            const objBook = {
                title: bodys.title,
                author: bodys.author,
                publish_date: bodys.publish_date,
                genre: bodys.genre
            }

            await common.CON_INSERT(`INSERT INTO tbl_book SET ?`, objBook);

            return res.status(201).send('Book Create Success');

        } catch (e) {
            return res.status(500).send('Something went wrong');
        }
    },

    bookUpdateById: async(req, res) => {
        try {
            const bookId = req.params.id;
            const bodys = req.body;

            const objBook = {
                title: bodys.title,
                author: bodys.author,
                publish_date: bodys.publish_date,
                genre: bodys.genre
            }

            await common.CON_UPDATE(`UPDATE tbl_book SET ? WHERE id='${bookId}' and is_active=1 and is_delete=0`, objBook);

            return res.status(201).send('Book Update Success');

        } catch (e) {
            return res.status(500).send('Something went wrong');
        }
    },

    bookDeleteById: async(req, res) => {
        try {
            const bookId = req.params.id;

            await common.CON_UPDATE(`UPDATE tbl_book SET is_active=0, is_delete=1 WHERE id='${bookId}'`,{})

            return res.status(201).send('Book Delete Success');

        } catch (e) {
            return res.status(500).send('Something went wrong');
        }
    },

    jsonPlaceHolder : async(req, res) => {
        try {
          const axios = require('axios')
            axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
            .then(response => {
                return res.status(200).send(response.data);
            })
            .catch(err => {
                return res.status(500).send('Something went wrong'); 
            })
        } catch (e) {
           return res.status(500).send('Something went wrong');
        }
    },

    searhBookName: async(req, res)=> {
        console.log('==========', req.params)
        try {
            const bookTtl = req.params.title
            const bookath = req.params.author

            const result = common.CON_SELECT(`SELECT * FROM tbl_book WHERE title LIKE '%${bookTtl}%' and author LIKE '%${bookath}%' and is_active=1 and is_delete=0`,'Multi',false);
            
            if(result.length == 0){
                return res.status(404).send('No Book Found');
            } else{
            return res.status(200).send(result);
            }
        } catch (e) {
            console.log(e)
            return res.status(500).send('Something went wrong');
        }
    },

    searhBookGenre : async(req, res)=> {
        console.log('==========', req.params)
        try {
            const genre = req.params.genre
            const start = req.params.startDate
            const end = req.params.endDate

            const result = common.CON_SELECT(`SELECT * FROM tbl_book WHERE genre='${genre}' and publish_date between DATE(${start}) and DATE(${end})`,'Multi',false);
            
            if(result.length == 0){
                return res.status(404).send('No Book Found');
            } else{
            return res.status(200).send(result);
            }
        } catch (e) {
            console.log(e)
            return res.status(500).send('Something went wrong');
        }
    },
}


module.exports = bookModel;