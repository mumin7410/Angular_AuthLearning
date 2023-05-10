const express = require("express");
const router = express.Router();
const { SignUp, Signin, GetUser} = require('../controller/user');

router.post('/register-user',SignUp);
router.post('/signin',Signin);
router.get('/user-profile/:id',GetUser);

module.exports = router;

