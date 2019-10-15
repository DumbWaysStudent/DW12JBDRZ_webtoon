//jshint esversion:6

const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.user;

exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email, password: req.body.password }
  }).then(user => {
    if (user) {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

      res.send({
        email: user.email,
        token
      });
    } else {
      res.send({
        error: true,
        message: "Wrong Email or Password!"
      });
    }
  });
};
