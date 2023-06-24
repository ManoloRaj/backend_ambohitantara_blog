const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bienvenue dans mon projet Express.js !');
});

app.listen(() => {
  console.log('Le serveur est en cours d\'exécution sur le port 3000.');
});
