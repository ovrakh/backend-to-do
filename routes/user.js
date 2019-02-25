const express = require('express');
const router = express.Router();

const authService = require('../services/auth-service');

const userCtrl = require('../controllers/user-controller');

router.get('/users', authService.asUser.bind(authService), userCtrl.getAll.bind(userCtrl));

router.get('/user', authService.asUser.bind(authService), userCtrl.getUser.bind(userCtrl));

router.get('/user/check', userCtrl.checkEmail.bind(userCtrl));

router.post('/user/sign-up', userCtrl.signUp.bind(userCtrl));

router.post('/user/sign-in', userCtrl.signIn.bind(userCtrl));

router.get('/user/sign-out', userCtrl.signOut.bind(userCtrl));

router.post('/user/update', userCtrl.updateUser.bind(userCtrl));

router.get('/user/password/recovery', userCtrl.resetPasswordMail.bind(userCtrl));

router.get('/user/password/reset', userCtrl.resetPassword.bind(userCtrl));

router.get('/user/remove', authService.asAdmin.bind(authService), userCtrl.removeUser.bind(userCtrl));

module.exports = router;