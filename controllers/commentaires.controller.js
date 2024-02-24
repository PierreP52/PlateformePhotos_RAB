
const {createComment, deleteComment, getComment} = require('../queries/commentaires.queries');


exports.commentList = async (req, res, next) => {

    try {
  
        const photoId = req.params.photoId;
        // Tentative de récupération de tous les tweets à l'aide de la fonction getTweets
        const comments = await getComment(photoId);
  
        // Si la récupération est réussie, on renvoie la vue 'photos/photo' avec les tweets récupérés comme données
        res.render('photos/photo', { comments });
  
    } catch(e) {
        // En cas d'erreur lors de la récupération des tweets, on passe l'erreur au middleware suivant
        // pour qu'il puisse gérer l'erreur (par exemple, renvoyer une réponse d'erreur au client)
        next(e);
    }
  }
  
  exports.createComment = async (req, res, next) => {
    try {
      const photoId = req.body.photoId;
      const comment = req.body.comment;
    
      console.log('Requête POST vers /photos/comments');
      console.log('Données du commentaire :', { photoId, comment });
      // Création du commentaire associé à la photo
      const commentData = { 
        ID: photoId, 
        date: new Date().toLocaleString(), 
        content: comment 
      };



      await createComment(commentData);

      console.log('Données du commentaire à enregistrer :', commentData);
  
      res.redirect(`/photos/${photoId}`); // Rediriger vers la page de la photo après la création réussie du commentaire
    } catch (e) {
      const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
      res.status(400).render('photos/photo', { errors });
    }
  };
  
    exports.deleteComment = async (req, res, next) => {
      try {
        // Extraire l'ID du tweet depuis les paramètres de la requête
        const commentId = req.params.commentId;

        const photoId = req.query.photoId;
       
        // Appeler la fonction pour supprimer le tweet en utilisant l'ID fourni
        await deleteComment(commentId);
        
        // Récupérer la liste mise à jour des tweets
        const comments = await getComment(photoId);
        
        // Rendre (afficher) la liste des tweets mise à jour
        res.json({ comments });
      } catch(e) {
        // En cas d'erreur, passer à la gestion d'erreur middleware suivante
        next(e);
      }
    }
  