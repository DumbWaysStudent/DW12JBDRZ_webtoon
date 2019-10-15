const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const models = require("../models");
const User = models.user;

exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  }).then(user => {
    if (user) {
      const authorize = bcrypt.compareSync(req.body.password, user.password);

      if (authorize) {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

        res.send({
          email: user.email,
          token
        });
      } else {
        res.status(401).send({
          message: "Validation error: Wrong password!"
        });
      }
    } else {
      res.status(401).send({
        message: "Validation error: Unregistered email!"
      });
    }
  });
};

exports.register = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  User.create({ email: req.body.email, password: hash })
    .then(user => {
      if (user) {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

        res.send({
          email: user.email,
          token
        });
      }
    })
    .catch(Sequelize.ValidationError, err => {
      // Respond with validation errors
      return res.status(406).send({ message: err.message });
    })
    .catch(err => {
      // Every other error
      return res.status(400).send({
        message: err.message
      });
    });
};
