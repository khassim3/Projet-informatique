const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }
});

module.exports = mongoose.model('Category', categoriesSchema);
