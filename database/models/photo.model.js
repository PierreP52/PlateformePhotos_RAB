
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const photoSchema = schema({
  date: {
    type: String,
    required: [true, 'Champ requis']
  },
  motCles: {
    type: String,                  // Le type est String
    maxlength: [20, 'Nom de la photo trop long' ],   // Le contenu du nom de la vidéo, avec un message d'erreur personnalisé en cas de dépassement
    minlength: [2, 'Nom de la photo trop court'],    // Le contenu du nom de la vidéo doit comporter au moins 2 caractère, avec un message d'erreur personnalisé en cas de non-respect
    required: [true, 'Champ requis']       // Le contenu du nom de la vidéo est obligatoire, avec un message d'erreur personnalisé en cas d'absence
  },
  description: {
    type: String,
    maxlength: [50, 'La description de la photo est trop longue'],
    minlength: [2, 'La description de la photo est trop courte'],
    required: [true, 'Champ requis']
  },
  photofile: {
    type: String,
    required: [true, 'Champ requis']
  }

});

const Photo = mongoose.model('photo', photoSchema);

// Exportation du modèle de tweet pour une utilisation ultérieure
module.exports = Photo;

