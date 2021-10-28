const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// import User model
const User = require("../models/User");

// @route     POST api/users (type of post and endpoint)
// @desc      Register a user
// @access    Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a validate email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("Passed");
  }
);

module.exports = router;
