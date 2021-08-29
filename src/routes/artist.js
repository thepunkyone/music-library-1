const express = require('express');
const artistCtrl = require('../controllers/artist');
const router = express.Router();



router.post('/', artistCtrl.create);






module.exports = router;