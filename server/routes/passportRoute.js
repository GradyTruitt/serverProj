const express = require('express');
const router = express.Router();

const passportCtrl = require('../controllers/passportCtrl');

router.post('/auth/:username&:password', passportCtrl.auth);

module.exports = router;