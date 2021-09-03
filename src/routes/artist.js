const express = require('express');
const artistCtrl = require('../controllers/artist');
const router = express.Router();



router.post('/', artistCtrl.create);

router.get('/', artistCtrl.read);

router.get('/artist/:artistId', artistCtrl.read)




module.exports = router;