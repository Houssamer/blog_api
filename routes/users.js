var express = require('express');
const user = require('../models/user.js');
var router = express.Router();
const usersRepo = require('../respositories/users.js');

/* GET users listing. */

// /donne tous les utilisateur /?offset=10&limit=10 donne les 10 premiers utilisateurs
router.get('/', function(req, res) {
  if (req.query == {}){
    usersRepo.getAllUser()
      .then((users) => res.send(200).json(users))
      .catch(err => console.log(err));
  } else {
    usersRepo.getUsers(req.query.offset, req.query.limit)
      .then( (users) => res.status(200).json(users))
      .catch(err => console.log(err));
  }
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

router.get('/:id', (req, res) => {
  usersRepo.getUser(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
})

// trouver par l'email

router.get(':/email', (req, res) => {
  usersRepo.getUserByEmail(req.params.email)
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
})

// ajouter un user

router.post('/add', (req, res) => {
  const {username, email, password, role} = req.body;

  if (!username || !email) {res.status(400).json({message: "veuillez entrer toutes les champs"})}
  usersRepo.getUserByEmail(email)
    .then(user => {
      if (username == user.username) {res.status(400).json({message: "utilisateur deja existant"})}
      else {
        const NvUser = {
          username,
          email,
          password, 
          role,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      
        usersRepo.addUser(NvUser)
          .then(res.status(201).json({message: "l'utilisateur est cree"}))
          .catch(err => res.status(400).json({message: "erreur", err}));
      }
    })
    .catch(err => console.log(err));
})

router.post('/:id', (req, res) => {
  usersRepo.updateUser(req.params.id, req.body)
    .then(res.status(201).json({message: "l'utilisateur est bine modifie"}))
    .catch(err => res.status(400).json({message: "un erreur", err}));
})


router.delete('/:id', (req, res) => {
  usersRepo.deleteUser(req.params.id)
    .then(res.status(200).json({message: "l'utilisateur est supprime"}))
    .catch(err => res.status(400).json({message: "erreur", err}));
})


module.exports = router;
