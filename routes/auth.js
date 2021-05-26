var express = require('express');
var jwt = require('jsonwebtoken');
var usersRepo = require('../respositories/users');


const router = express.Router();


router.post('/:email', (req, res) => {
    var secretJWT = 'bloc__ehtp--secretString-Riad';
    const email = req.params.email;
    usersRepo.getUserByEmail(email)
        .then(user => {
            if (user[0].role == 'admin' || user[0].role == 'author') {
                jwt.sign(
                    { id: user.id },
                    secretJWT,
                    { expiresIn: '12h' },
                    (err, token) => {
                      if (err) throw err;
                      res.status(200).json({
                        token,
                        user: {
                          id: user.id,
                          username: user.username,
                          email: user.email,
                          role: user.role,
                        },
                      });
                    }
                  );
            } else {
                res.status(403).json({message: "ni author ni admin"});
            }
        })
        .catch(err => res.status(404).json({message: err}));
});

module.exports = router;
