const mongoose = require('mongoose');
const uri = "mongodb+srv://UserPierre:bDVh9Rr9OwoZQ7nt@cluster0.jjrw2nf.mongodb.net/Photo?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB', error);
  });
