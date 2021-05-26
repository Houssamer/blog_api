var express = require('express');
var router = express.Router();
const commentsRepo = require('../respositories/comments.js');
var { authMiddleware } =  require('../middlewares/authMiddleware');

/* GET Comments listing. */

// /donne tous les Comments /?offset=10&limit=10 donne les 10 premiers Comments
router.get('/', function(req, res) {
    commentsRepo.getComments(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((Comments) => res.status(200).json(Comments))
      .catch(err => console.log(err));
  })

router.get('/all', (req, res) => {
  commentsRepo.getAllComments()
    .then((Comments) => res.status(200).json(Comments))
    .catch(err => console.log(err));
})

// trouver par l'identifiant

router.get('/:id', (req, res) => {
  commentsRepo.getComment(req.params.id)
    .then(article => res.status(200).json(article))
    .catch(err => console.log(err));
})

// trouver par article Id

router.get('/article/:id', (req, res) => {
  commentsRepo.getCommentByArticleId(req.params.id)
    .then(Comments => res.status(200).json(Comments))
    .catch(err => console.log(err));
})

// ajouter un comment

router.post('/add', authMiddleware, (req, res) => {
  const {content, ArticleId} = req.body;

   const NvComment = {
              content,
              ArticleId,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          
            commentsRepo.addUser(NvComment);
            res.status(200).redirect("http://localhost:3000/");
})

router.post('/:id', authMiddleware, (req, res) => {
  commentsRepo.updateComment(req.params.id, req.body);
  res.status(200).redirect("http://localhost:3000/");
})


router.delete('/:id', authMiddleware, (req, res) => {
  commentsRepo.deleteComment(req.params.id);
  res.status(200).redirect("http://localhost:3000/");
})


module.exports = router;
