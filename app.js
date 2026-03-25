const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
 
const CatPhoto = require('./models/CatPhoto');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// MongoDB Atlas connection string (from .env file)
const dbURI = process.env.MONGODB_URI;
 
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`ISMS Backend API app listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
 
 
// Root route - Serve the CatPhotoApp form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
 
// Server status route 
app.get('/api/server/status', (req, res) => {
  res.json({ msg: 'Server is up and ready!' });
});
 
 
// CREATE - Submit a new cat photo entry (POST)
app.post('/api/submit-form', async (req, res) => {
  try {
    const body = req.body;
    console.log('Received form data:', body);
 
    const catPhoto = new CatPhoto({
      indoorOutdoor: body['indoor-outdoor'] || body.indoorOutdoor,
      personality: body.personality,
      catUrl: body.catUrl
    });
 
    const savedCatPhoto = await catPhoto.save();
 
    const responseData = {
      statusCode: 201,
      msg: 'Cat Form submission successful! Data saved to MongoDB Atlas.',
      data: savedCatPhoto
    };
 
    res.status(201).json(responseData);
  } catch (error) {
    console.error('Error saving cat photo:', error);
    res.status(400).json({ statusCode: 400, msg: error.message });
  }
});
 
// READ ALL - Get all cat photo entries (GET)
app.get('/api/cat-photos', async (req, res) => {
  try {
    const catPhotos = await CatPhoto.find();
    res.json({
      statusCode: 200,
      msg: 'All cat photos retrieved successfully',
      count: catPhotos.length,
      data: catPhotos
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, msg: error.message });
  }
});
 
// READ ONE - Get a single cat photo entry by ID (GET)
app.get('/api/cat-photos/:id', async (req, res) => {
  try {
    const catPhoto = await CatPhoto.findById(req.params.id);
    if (catPhoto) {
      res.json({
        statusCode: 200,
        msg: 'Cat photo retrieved successfully',
        data: catPhoto
      });
    } else {
      res.status(404).json({ statusCode: 404, msg: 'Cat photo not found' });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, msg: error.message });
  }
});
 
// UPDATE - Update a cat photo entry by ID (PUT)
app.put('/api/cat-photos/:id', async (req, res) => {
  try {
    const body = req.body;
    const updateData = {
      indoorOutdoor: body['indoor-outdoor'] || body.indoorOutdoor,
      personality: body.personality,
      catUrl: body.catUrl
    };
 
    const catPhoto = await CatPhoto.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
 
    if (catPhoto) {
      res.json({
        statusCode: 200,
        msg: 'Cat photo updated successfully',
        data: catPhoto
      });
    } else {
      res.status(404).json({ statusCode: 404, msg: 'Cat photo not found' });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, msg: error.message });
  }
});
 
// DELETE - Delete a cat photo entry by ID (DELETE)
app.delete('/api/cat-photos/:id', async (req, res) => {
  try {
    const catPhoto = await CatPhoto.findByIdAndDelete(req.params.id);
    if (catPhoto) {
      res.json({
        statusCode: 200,
        msg: 'Cat photo deleted successfully',
        data: catPhoto
      });
    } else {
      res.status(404).json({ statusCode: 404, msg: 'Cat photo not found' });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, msg: error.message });
  }
});
