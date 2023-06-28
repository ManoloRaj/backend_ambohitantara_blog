const express = require('express');

const serverless = require('serverless-http')
const app = express();

const router = express.Router()
router.use(express.json());

const User_model = require('./model/user_model');
const Article_model = require('./model/article_model');
router.get('/', (req, res) => {
  res.json({
    "hello": "hi!"
  })
})

// Récupérer tous les utilisateurs
router.get('/users', (req, res) => {
  const users = User_model.getAll();
  res.json(users);
});

// Récupérer un utilisateur par son ID
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = User_model.getById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
});

// Ajouter un nouvel utilisateur
router.post('/users', (req, res) => {
  const newUser = req.body;
  const userId = User_model.add(newUser);
  res.json({ id: userId });
});

// Mettre à jour un utilisateur par son ID
router.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const success = User_model.update(userId, updatedUser);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
});

// Supprimer un utilisateur par son ID
router.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const success = User_model.remove(userId);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
});




router.get('/articles', (req, res) => {
  const articles = Article_model.getAll();
  res.json(articles);
});

// Récupérer un article par son ID
router.get('/articles/:id', (req, res) => {
  const articleId = parseInt(req.params.id);
  const article = Article_model.getById(articleId);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ error: 'Article non trouvé' });
  }
});

// Ajouter un nouvel article
router.post('/articles', (req, res) => {
  const newArticle = req.body;
  const articleId = Article_model.add(newArticle);
  if (articleId !== null) {
    res.json({ success: true, id: articleId });
  } else {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'article' });
  }
});

// Mettre à jour un article
router.put('/articles/:id', (req, res) => {
  const articleId = parseInt(req.params.id);
  const updatedArticle = req.body;
  const success = Article_model.update(articleId, updatedArticle);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Article non trouvé' });
  }
});

// Supprimer un article
router.delete('/articles/:id', (req, res) => {
  const articleId = parseInt(req.params.id);
  const success = Article_model.delete(articleId);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Article non trouvé' });
  }
});


app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)