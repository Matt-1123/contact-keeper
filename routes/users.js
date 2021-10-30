const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        res.status(400).json({ msg: "User already exists." });
      }

      // use User model to create a new user instance
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      // Hash password
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // payload is the object we'll send in the token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generate a token by signing it
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
