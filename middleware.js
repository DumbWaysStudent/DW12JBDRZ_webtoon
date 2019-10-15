const jwt = require("express-jwt");

exports.authenticated = jwt({ secret: process.env.SECRET_KEY });
