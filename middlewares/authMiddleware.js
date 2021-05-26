var express = require('express');
var jwt = require('jsonwebtoken');

var secretJWT = 'bloc__ehtp--secretString-Riad';

function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(400).json({ message: 'no token, access denied' });
  }

  jwt.verify(token, secretJWT, (err, decoded) => {
    if (err) throw err;

    req.user = decoded;
  });

  next();
}

module.exports = {authMiddleware};
