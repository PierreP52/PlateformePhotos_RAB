const multer = require('multer');
const path = require('path');



       const {getPhotos, createPhoto, deletePhoto, deletePhotoFile, getPhoto, updatePhoto, searchPhotosByKeyword } = require('../queries/photos.queries');
       const Photo = require('../database/models/photo.model');
       const {getComment} = require('../queries/commentaires.queries');

       
       // Contrôleur pour afficher la liste des photos.tweet
       exports.photoList = async (req, res, next) => {
         try {          
           const photos = await getPhotos();          
           res.render('photos/photo-list', { photos });
         } catch(e) {
           next(e);
         }
       }
       
       // Contrôleur pour afficher le formulaire de création de photo
       exports.photoNew = (req, res, next) => {
         res.render('photos/photo-form', {photo:{}});
       }
       

//==========================================================================================


// Настройка местоположения для сохранения загруженных фотографий
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Здесь 'public/uploads' - путь к папке, где будут сохраняться фотографии
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Настройка Multer
const upload = multer({ storage: storage });


// Contrôleur для создания новой фотографии
exports.photoCreate = async (req, res, next) => {
  try {
    upload.single('photofile')(req, res, async (err) => {

      const { motCles, description } = req.body;
      const photofile = req.file.filename; // Имя загруженного файла
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`; // Format date as "day-month-year"


      // Создание новой фотографии в базе данных
      const photoData = { date: formattedDate, motCles, description, photofile };
      const createdPhoto = await createPhoto(photoData);

      //res.status(200).render('videos/video-form', { successMessage: 'Photo téléchargée avec succès.' });
      res.redirect('/photos'); // Перенаправление на страницу списка фотографий после успешного создания
    });
  } catch (e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    res.status(400).render('photos/photo-form', { errors });
  }
};


//======


exports.photoDelete = async (req, res, next) => {
  try {
    const photoId = req.params.photoId;
    
        // Получаем имя файла фотографии, которую нужно удалить из папки проекта
        const photo = await Photo.findById(photoId);
        const fileName = photo.photofile;

    // Вызываем функцию для удаления фотографии из базы данных
    await deletePhoto(photoId);

        // Удаляем файл фотографии из папки проекта
        deletePhotoFile(fileName);

    // После удаления фотографии, получаем обновленный список фотографий
    const photos = await getPhotos();

    // Отправляем обновленный список фотографий на страницу
    res.render('photos/photo-list', { photos });
  } catch (e) {
    next(e);
  }
};


//=========

exports.photoSearch = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;

    // Выполняем поиск фотографий по ключевым словам (motCles)
    const photos = await searchPhotosByKeyword(keyword);

    // Отправляем найденные фотографии на страницу
    res.render('photos/photo-list', { photos });
  } catch (e) {
    next(e);
  }
};

//===========

// Функция для просмотра одной выбранной фотографии
exports.getPhotoById = async (req, res, next) => {
  try {
    const photoId = req.params.photoId;
    
    // Используйте метод findById для поиска фотографии по её ID в базе данных
    const photo = await Photo.findById(photoId);

    // Проверьте, найдена ли фотография
    if (!photo) {
      return res.status(404).send('Фотография не найдена');
    }

    const comments = await getComment(photoId);
    console.log('photo trouvée')
    
    // Отправьте найденную фотографию на страницу просмотра
    res.render('photos/photo', { photo, comments });
  } catch (error) {
    next(error);
  }
};





//====================================================================================



       // Exportation d'une fonction asynchrone nommée `photoEdit`
       exports.photoEdit = async (req, res, next) => {
         try {
           const photoId = req.params.photoId;
           const photo = await getPhoto(photoId);

           if (!photo) {         // =======================================
            return res.status(404).send('Photo not found');
          }

           res.render('photos/photo-edit', { photo });     
         } catch(e) {
           next(e);
         }
       }
       




       // Exportation d'une fonction asynchrone nommée `photoUpdate` &&&&&&&&&&&&&&&&&&&&&&&&????????????????????????????
       exports.photoUpdate = async (req, res, next) =>{       
       const photoId = req.params.photoId; 
       console.log('Requête POST vers /photos/update');      
         try{
           const body = req.body;
           if (req.file) {
            // Обрабатываем новый файл (например, сохраняем его в папке uploads)
            const newFileName = req.file.filename;
            body.photofile = newFileName;
          }       
           await updatePhoto(photoId, body);      
           res.redirect(`/photos/${photoId}`);       
         }catch(e){   
          next(e);  
          // const errors = Object.keys(e.errors).map(key => e.errors[key].message);       
          // const photo = await getPhoto(photoId);       
          // res.status(400).render('/photos/photo-form', {errors, photo});
         }
       }

       