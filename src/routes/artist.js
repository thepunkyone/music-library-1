const express = require('express');
const artistCtrl = require('../controllers/artist');
const albumCtrl = require('../controllers/album')
const router = express.Router();



router.post('/', artistCtrl.create);

router.get('/', artistCtrl.read);

router.get('/:artistId', artistCtrl.readById);

router.patch('/:artistId', artistCtrl.update);

router.delete('/:artistId', artistCtrl.delete);

router.post('/:artistId/album', albumCtrl.create);



module.exports = router;