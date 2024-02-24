
const router = require('express').Router();

const photos = require('./photos');

const commentaires = require('./commentaires');

router.use('/photos', photos);

router.use('/comments', commentaires);

router.get('/', (req, res) => {
  res.redirect('/photos');
});

module.exports = router;