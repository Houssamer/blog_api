var express = require('express');
const user = require('../models/user.js');
var router = express.Router();
const usersRepo = require('../respositories/users.js');
var { authMiddleware } = require('../middlewares/authMiddleware');

/* GET users listing. */

// /donne tous les utilisateur /?offset=10&limit=10 donne les 10 premiers utilisateurs
router.get('/', function(req, res) {
    usersRepo.getUsers(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((users) => res.status(200).json(users))
      .catch(err => console.log(err));
  })

router.get('/all', (req, res) => {
  usersRepo.getAllUsers()
    .then((users) => res.status(200).json(users))
    .catch(err => console.log(err));
})

// trouver par le role

router.get('/:role', (req, res) => {
    switch (req.params.role) {
      case "admin":
        usersRepo.getAdmins()
          .then(users => res.status(200).json(users))
          .catch(err => console.log(err));
        break;
      case "author":
        usersRepo.getAuthors()
          .then(users => res.status(200).json(users))
          .catch(err => console.log(err));
        break;
      case "guest":
        usersRepo.getGuests()
          .then(users => res.status(200).json(users))
          .catch(err => console.log(err));
        break;
    } 
})

// trouver par l'identifiant

router.get('/id/:id', (req, res) => {
  usersRepo.getUser(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
})

// trouver par l'email

router.get('/email/:email', (req, res) => {
  usersRepo.getUserByEmail(req.params.email)
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
})

// ajouter un user

router.post('/add', authMiddleware, (req, res) => {
  const {username, email, password, role} = req.body;

  if (!username || !email) {res.status(400).json({message: "veuillez entrer toutes les champs"})}
  else {
            const NvUser = {
              username,
              email,
              password, 
              role,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          
            usersRepo.addUser(NvUser);
            res.status(200).redirect("http://localhost:3000/");
  }
})

router.post('/:id', authMiddleware, (req, res) => {
  usersRepo.updateUser(req.params.id, req.body);
  res.status(200).redirect("http://localhost:3000/");
})


router.delete('/:id', authMiddleware, (req, res) => {
  usersRepo.deleteUser(req.params.id);
  res.status(200).redirect("http://localhost:3000/");
})


module.exports = router;
