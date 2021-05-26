var express = require('express');
var router = express.Router();
const articlesRepo = require('../respositories/articles.js');
var { authMiddleware } =  require('../middlewares/authMiddleware');

/* GET Articles listing. */

// /donne tous les articles /?offset=10&limit=10 donne les 10 premiers articles
router.get('/', function(req, res) {
    articlesRepo.getArticles(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((Articles) => res.status(200).json(Articles))
      .catch(err => console.log(err));
  })

router.get('/all', (req, res) => {
  articlesRepo.getAllArticles()
    .then((Articles) => res.status(200).json(Articles))
    .catch(err => console.log(err));
})

// trouver par le titre

router.get('/:title', (req, res) => {
        articlesRepo.getArticlesByTitle(req.params.title)
          .then(articles => res.status(200).json(articles))
          .catch(err => console.log(err));
 
    })

// trouver par l'identifiant

router.get('/:id', (req, res) => {
  articlesRepo.getArticle(req.params.id)
    .then(article => res.status(200).json(article))
    .catch(err => console.log(err));
})

// trouver par user Id

router.get('/user/:id', (req, res) => {
  articlesRepo.getArticleByUserId(req.params.id)
    .then(articles => res.status(200).json(articles))
    .catch(err => console.log(err));
})

// ajouter un article

router.post('/add', authMiddleware,  (req, res) => {
  const {title, content, UserId} = req.body;

  if (!title) {res.status(400).json({message: "veuillez entrer toutes les champs"})}
  else {
            const NvArticle = {
              title,
              content,
              UserId,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          
            articlesRepo.addUser(NvArticle);
            res.status(200).redirect("http://localhost:3000/");
  }
})

router.post('/:id', authMiddleware, (req, res) => {
  articlesRepo.updateArticle(req.params.id, req.body);
  res.status(200).redirect("http://localhost:3000/");
})


router.delete('/:id', authMiddleware, (req, res) => {
  articlesRepo.deleteArticle(req.params.id);
  res.status(200).redirect("http://localhost:3000/");
})


module.exports = router;
