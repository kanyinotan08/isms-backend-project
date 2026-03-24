// models/CatPhoto.js
const mongoose = require('mongoose');

const catPhotoSchema = new mongoose.Schema({
  indoorOutdoor: {
    type: String,
    enum: ['indoor', 'outdoor'],
    required: true
  },
  personality: {
    type: [String],
    required: true
  },
  catUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
});

const CatPhoto = mongoose.model('CatPhoto', catPhotoSchema);

module.exports = CatPhoto;
