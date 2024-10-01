const comfun = require('../../common/comfunc');
const con = require('../../common/database');
const jwt = require('jsonwebtoken');

const userModel = {

    
    userRegister : async(req, res) => {
        try {
            const reqData = req.body;

            con.query(`SELECT * FROM tbl_user WHERE email='${reqData.email}' and is_active=1`, (err, result) => {
                if(result.length > 0){
                    return res.status(500).send('User Already Exits');
                } else {
                    const objUser = {
                        email: reqData.email,
                        password: reqData.password
                       }
                       con.query(`INSERT INTO tbl_user SET ?`, objUser, (err1, result1)=>{
            
                       var token = jwt.sign({ userId: result1.insertId }, process.env.JWT_SCRET, { expiresIn: '7d' });
            
                        return res.status(200).send({access_token: token});
                       })
                }
            }) 
        } catch (e) {
            return res.status(500).send('Something went wrong');
        }
    },

    userLogin: async(req, res) => {
        try {

            const reqData = req.body;

            con.query(`SELECT * FROM tbl_user WHERE email='${reqData.email}' and is_active=1`, (err, result)=>{
                if(result.length < 1){
                    return res.status(500).send('can not find your account, please register first');
                } else{
                    if (result[0].password == reqData.password) {
                        var token = jwt.sign({ userId: result[0].id }, process.env.JWT_SCRET, { expiresIn: '7d' });
                        return res.status(200).json({msg: 'Login Success',access_token: token});
                    } else {
                        return res.status(500).send('your password is incorrect');
                    }
                }
            })
        } catch (e) {
            return res.status(500).send('Something went wrong');
        }
    }

}


module.exports = userModel;