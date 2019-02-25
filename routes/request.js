const express = require('express');
const router = express.Router();

const authService = require('../services/auth-service');
const requestCtrl = require('../controllers/request-controller');

router.get('/requests', authService.asAdmin.bind(authService), requestCtrl.getRequests.bind(requestCtrl));

router.get('/request', authService.asUser.bind(authService), requestCtrl.getRequest.bind(requestCtrl));

router.post('/request/add', authService.asUser.bind(authService), requestCtrl.addRequest.bind(requestCtrl));

router.put('/request', authService.asAdmin.bind(authService), requestCtrl.updateRequest.bind(requestCtrl));

router.get('/request/remove', authService.asAdmin.bind(authService), requestCtrl.removeRequest.bind(requestCtrl));

module.exports = router;