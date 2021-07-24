const express=require('express');
const router=express.Router();

const {
    registerController,
    activationController,
    loginController,
    forgetController,
    resetController,
    googleController,
    facebookController
}=require('../controllers/auth.controller.js');

const {
    validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')


router.post('/register',validRegister,registerController);
router.post('/activation',activationController);
router.post('/login',validLogin,loginController);
router.put('/password/forget',forgotPasswordValidator,forgetController);
router.put('/password/reset', resetPasswordValidator, resetController);
router.post('/googlelogin',googleController);
router.post('/facebooklogin',facebookController);
module.exports =router;