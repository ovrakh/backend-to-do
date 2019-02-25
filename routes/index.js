const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.send('I am alive!'));

router.use(require('./user'));

router.use(require('./list'));

router.use(require('./request'));

router.use(require('./task'));

router.use((req, res, next) => res.send({ success: true, data: req.dataOut }));
router.use((error, req, res, next) => res.status(error.code).send({ success: false, message: error.message }));

module.exports = router;