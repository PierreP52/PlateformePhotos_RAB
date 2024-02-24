
window.addEventListener('DOMContentLoaded', () => {
    bindPhoto();
  });


  function bindPhoto() {

    const elements = document.querySelectorAll('.btn-danger');  
    const photoContainer = document.querySelector('#photo-list-container');
    
    // Pour chaque élément avec la classe '.btn-danger'...
    elements.forEach(e => {
        e.addEventListener('click', ($event) => {                     
            const photoId = $event.target.getAttribute('photoId');                
            axios.delete('/photos/' + photoId)
            .then(function(response) {
                photoContainer.innerHTML = response.data;
                bindPhoto();
                location.reload();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });
  }
  
  