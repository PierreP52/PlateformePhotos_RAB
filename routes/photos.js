//const express = require('express');


const router = require('express').Router();

const{photoList, photoNew, photoCreate, photoDelete, photoEdit, photoUpdate, photoSearch, getPhotoById } = require('../controllers/photos.controller');



router.get('/', photoList); 

router.get('/upload', photoNew);
                                              
router.post('/', photoCreate);//

router.post('/:photoId/update', photoUpdate);  

router.delete('/:photoId', photoDelete); 

router.get('/edit/:photoId', photoEdit); // ИЗМЕНЕНИЕ ДАННЫХ ????? Имя Маршрута

router.get('/search', photoSearch); //!!!!!!!!!!!!!!!!!!!!!!!!

// Маршрут для просмотра одной выбранной фотографии
router.get('/:photoId', getPhotoById); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


module.exports = router;