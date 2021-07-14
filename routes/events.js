const router = require("express").Router();
const jwt = require("jsonwebtoken");
let Event = require("../models/event.model");
require("dotenv").config();

router.route("/").get((req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const newEvent = new Event({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    day: req.body.day,
  });

  newEvent
    .save()
    .then((event) => {
      res.send("User Created!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
