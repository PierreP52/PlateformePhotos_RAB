const mongoose = require('mongoose');

const schema = mongoose.Schema;

const commentaireSchema = schema({
    ID: {
        type: mongoose.Schema.Types.ObjectId, // Используйте ObjectId для связи с фотографией
        ref: 'photo' // Ссылка на модель фотографии
    },
    date: {
        type: String,
        required: [true, 'Champ requis']
      },
    content: {
        type: String,                 
        maxlength: [40, 'Commentaires trop long' ],  
        minlength: [1, 'Commentaires trop court'],   
        required: [true, 'Champ requis']       
      }
});

const Commentaire = mongoose.model('commentaire', commentaireSchema);

// Exportation du modèle de tweet pour une utilisation ultérieure
module.exports = Commentaire;