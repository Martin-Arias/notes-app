const { Router } = require('express');

const router = Router();

const { signin, signup, renderSigninForm, renderSignUpForm, logOut } = require('../controllers/users.controllers')


///Sign Up
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup',signup);

///Sign In
router.get('/users/signin', renderSigninForm);
router.post('/users/signin',signin);


//Log Out
router.get('/users/logout', logOut)







module.exports = router;