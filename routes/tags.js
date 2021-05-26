var express = require('express');
var router = express.Router();
const tagRepo = require('../respositories/tags.js');
var { authMiddleware } =  require('../middlewares/authMiddleware');

/* GET Tags listing. */

// /donne tous les Tags /?offset=10&limit=10 donne les 10 premiers Tags
router.get('/', function(req, res) {
    tagRepo.getTags(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((Tags) => res.status(200).json(Tags))
      .catch(err => console.log(err));
  })

router.get('/all', (req, res) => {
  tagRepo.getAllTags()
    .then((Tags) => res.status(200).json(Tags))
    .catch(err => console.log(err));
})

// trouver par l'identifiant

router.get('/:id', (req, res) => {
  tagRepo.getTag(req.params.id)
    .then(Tag => res.status(200).json(Tag))
    .catch(err => console.log(err));
})

// ajouter un tag

router.post('/add', authMiddleware, (req, res) => {
  const {name} = req.body;

            const NvTag = {
              name,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          
            tagRepo.addUser(NvTag);
            res.status(200).redirect("http://localhost:3000/");
})

router.post('/:id', authMiddleware, (req, res) => {
  tagRepo.updateTag(req.params.id, req.body);
  res.status(200).redirect("http://localhost:3000/");
})


router.delete('/:id', authMiddleware, (req, res) => {
  tagRepo.deleteTag(req.params.id);
  res.status(200).redirect("http://localhost:3000/");
})


module.exports = router;
