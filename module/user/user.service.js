const express = require('express');
const userModel = require('./user.model');

const router = express.Router();

router.post('/auth/register', userModel.userRegister);

router.post('/auth/login', userModel.userLogin);

module.exports = router;