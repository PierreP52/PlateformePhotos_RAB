// Ajout d'un écouteur d'événements sur l'objet `window` pour détecter quand le contenu du DOM est entièrement chargé.
window.addEventListener('DOMContentLoaded', () => {
    // Appel à la fonction de liaison des commentaires pour associer les événements.
    bindComment();
});

// Définition de la fonction de liaison des commentaires.
function bindComment() {   
    const elements = document.querySelectorAll('.btn-danger');
    
    const commentContainer = document.querySelector('#comment-list-container');    
    elements.forEach(e => {      
        e.addEventListener('click', ($event) => {
            const commentId = $event.target.getAttribute('commentId');
            const photoId = $event.target.getAttribute('photoId');
            axios.delete(`/comments/${commentId}?photoId=${photoId}`)
                .then(function(response) {
                    commentContainer.innerHTML = response.data.comments;
                    bindComment();
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
    });
}
