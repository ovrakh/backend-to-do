const express = require('express');
const router = express.Router(); 

const authService = require('../services/auth-service');
const companyCtrl = require('../controllers/list-controller');

router.get('/lists', authService.asUser.bind(authService), companyCtrl.getAll.bind(companyCtrl));

router.post('/list/add', authService.asUser.bind(authService), companyCtrl.addList.bind(companyCtrl));

router.post('/list/update', /*authService.asAdmin.bind(authService),*/ companyCtrl.update.bind(companyCtrl));

router.get('/list/remove', authService.asUser.bind(authService), companyCtrl.remove.bind(companyCtrl));

module.exports = router;