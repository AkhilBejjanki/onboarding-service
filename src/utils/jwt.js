const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (id) =>
  jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "7d" });

module.exports = { generateToken };
