const express = require('express');
const router = express.Router();
const albumCtrl = require('../controllers/album')



router.post('/artist/:artistId/album', albumCtrl.create);


module.exports = router;