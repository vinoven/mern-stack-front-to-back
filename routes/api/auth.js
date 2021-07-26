const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ erorrs: [{ msg: "Invalid credentials" }] });
      }

      // check if password matches the username

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid credentials" }] });
      }

      // return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
