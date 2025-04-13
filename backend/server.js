const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://ayltonof36:Banestes2@cluster0.0ecpyke.mongodb.net/favoritesDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.log('Erro ao conectar no MongoDB', err));

// Modelo
const FavoriteSchema = new mongoose.Schema({
  name: String,
  url: String
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

//Rotas
app.get('/favorites', async (req, res) => {
  const list = await Favorite.find();
  res.json(list);
});

app.post('/favorites', async (req, res) => {
  const newFavorite = new Favorite(req.body);
  await newFavorite.save();
  res.status(201).json(newFavorite);
});

app.delete('/favorites/:name', async (req, res) => {
  await Favorite.deleteOne({ name: req.params.name });
  res.status(204).end();
});

// Porta
app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
