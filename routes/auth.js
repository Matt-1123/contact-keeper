const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // bcrypt is a password-hashing function which incorporates a salt to protect against rainbow table attacks. A salt is random data that is used as an additional input to a one-way function that hashes data, a password or passphrase
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth"); // protects route with a JWT
const { check, validationResult } = require("express-validator");

// import User model
const User = require("../models/User");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    // findById: find a single user document by its _id field. Exclude password.
    // User (capitalized): If the correct token is in the header (meaning the user is logged in), the request object will have a user object (found in the JWT token).
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      // payload is the object we'll send in the token
      // Get user id from User model
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
