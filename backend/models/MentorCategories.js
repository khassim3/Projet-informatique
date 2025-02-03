const mongoose = require('mongoose');

const mentorCategoriesSchema = mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  
});

module.exports = mongoose.model('MentorCategory', mentorCategoriesSchema);
