const { Promise } = require('mongoose');
const Photo = require('../database/models/photo.model');
const fs = require('fs');
const path = require('path');


exports.getPhotos = () => {
    return Photo.find({}).exec();
}

exports.createPhoto = async (photoData) => {
  try {
    const newPhoto = new Photo(photoData);
    const createdPhoto = await newPhoto.save();
    return createdPhoto;
  } catch (error) {
    throw error;
  }
};

exports.deletePhotoFile = (fileName) => {
  const filePath = path.join(__dirname, '..', 'public', 'uploads', fileName);
  fs.unlinkSync(filePath); // Удаляем файл
}

// Exporte une fonction appelée `deletePhoto `
exports.deletePhoto  = (photoId) => { 
     // Метод exec() используется для выполнения запроса и возврата обещания.
    return Photo.findByIdAndDelete(photoId).exec();
}  

// Exportation de la fonction `getPhoto `
exports.getPhoto  = (photoId) => {
    return Photo.findOne({ _id: photoId }).exec();
  }

exports.updatePhoto = ( photoId, photo) => {
  return Photo.findByIdAndUpdate(photoId, { $set: photo}, {runValidators: true});
}

// Функция для поиска фотографий по ключевым словам
exports.searchPhotosByKeyword = async (keyword) => {
  try {
    const regex = new RegExp(keyword, 'i');
    const photos = await  Photo.find({ motCles: regex });

    return photos;
  } catch (error) {
    throw error;
  }
}