const express = require('express');
const router = express.Router();
const path = require('path');
const Gallery = require('../controller/GalleryController.js');
const Database = require('../controller/DatabaseController.js');

router.use(express.urlencoded());
router.use(express.json());

router.post('/data/api',Gallery.load_api)

router.post('/data/bd', Gallery.load_bd)

router.post('/data/bd_test', Database.database_test)

router.post('/data/bd_create', Database.database_create)

router.post('/data/test',Gallery.load_test)

router.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
})

module.exports = router