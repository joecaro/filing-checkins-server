const passport = require("passport");
const { genPassword } = require("../lib/passwordUtils");
const User = require("../models/user.model");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//get
router.get("/update", (req, res) => {
  if (
    jwt.verify(
      req.headers.authorization.split(",")[0],
      process.env.TOKEN_SECRET
    )
  ) {
    const token = jwt.sign(
      { email: thisUser.email, id: thisUser._id },
      "test",
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ token });
  }
});

//post
router.post("/login", passport.authenticate("local"), (req, res) => {
  thisUser = req.body;
  const token = jwt.sign({ email: thisUser.email, id: thisUser._id }, "test", {
    expiresIn: "15m",
  });
  res.status(200).json({ result: thisUser, token });
});

router.post("/register", async (req, res, next) => {
  let isExists = await User.findOne({ username: req.body.username });
  if (!isExists) {
    const { salt, hash } = genPassword(req.body.password);

    const newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      hash: hash,
      salt: salt,
    });

    newUser.save().then((user) => {
      console.log(user);
      res.send("User Created!");
    });
  } else res.send("User With This Username Already Exists");
});

router.get("/list", async (req, res) => {
  if (
    jwt.verify(
      req.headers.authorization.split(",")[0],
      process.env.TOKEN_SECRET
    )
  ) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  } else res.status(401).json("Error: Token not Verified");
});
module.exports = router;
