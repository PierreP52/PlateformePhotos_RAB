const Comment = require('../database/models/commentaires.model');

exports.getComment = (photoId) => {
    return Comment.find({ ID: photoId }).exec();
}

exports.createComment = async (commentData) => {
  try {
    const newComment = new Comment(commentData);
    const createdComment = await newComment.save();

    console.log('Commentaire créer');

    return createdComment;
  } catch (error) {
    throw error;
  }
};

exports.deleteComment =(commentId) => {
    return Comment.findByIdAndDelete(commentId).exec();
}