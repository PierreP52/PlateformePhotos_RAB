// Importation des modules nécessaires
const express = require('express');
 // Express est un framework web pour Node.js
 const morgan = require('morgan'); // Morgan est un middleware de logging pour Express
 const path = require('path'); // Le module 'path' fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires
 const errorHandler = require('errorhandler');
 
 // Importation des routes définies dans le fichier './routes.js'
 const index = require('./routes');
 
 // Initialisation de la base de données
 require('./database'); 
 
 
 // Création de l'application Express
 const app = express();



 
 
 // Définition du numéro de port sur lequel l'application va écouter
 const port = process.env.PORT || 3000;
 // Le code utilise la variable d'environnement 'PORT' si elle existe, sinon il utilise le port 3000 par défaut
 
 
 // Configuration des paramètres de l'application
 app.set('views', path.join(__dirname, 'views')); // Définit le dossier 'views' comme emplacement des fichiers de vue (pug)
 app.set('view engine', 'pug'); // Définit le moteur de rendu de vue à utiliser (pug dans ce cas)
 
 // Utilisation des middlewares
 app.use(morgan('short')); // Utilise le middleware de logging Morgan pour enregistrer les requêtes entrantes
 app.use(express.static(path.join(__dirname, 'public'))); // Définit le dossier 'public' pour servir les fichiers statiques (css, images, etc.)
 app.use(express.json()); // Le middleware pour analyser les corps de requête au format JSON
 app.use(express.urlencoded({ extended: true })); // Le middleware pour analyser les corps de requête au format x-www-form-urlencoded
 
 // Utilise les routes définies dans le fichier './routes.js'
 app.use(index);
 
 // Gestion des erreurs basée sur l'environnement de l'application
 if (process.env.NODE_ENV === 'development') {
     app.use(errorHandler()); // En mode développement, utilise un gestionnaire d'erreurs complet
 } else {
     // En production, fournit une réponse d'erreur plus générique
     app.use((err, req, res, next) => {
       const code = err.code || 500;
       res.status(code).json({
         code: code,
         message: code === 500 ? null : err.message
       });
     })
 }
 
 
 // Démarre le serveur en écoutant les requêtes sur le port spécifié
 app.listen(port);
 