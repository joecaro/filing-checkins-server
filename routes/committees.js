const router = require("express").Router();
const jwt = require("jsonwebtoken");
let Committee = require("../models/committees.model");
require("dotenv").config();

// -------------------get routes----------------------

router.route("/").get((req, res) => {
  if (
    jwt.verify(
      req.headers.authorization.split(",")[0],
      process.env.TOKEN_SECRET
    )
  ) {
    Committee.find()
      .then((committees) => res.json(committees))
      .catch((err) => res.status(400).json("Error: " + err));
  } else res.status(401).json("Something Went Wrong...");
});

router.route("/:id").get((req, res) => {
  Committee.findById(req.params.id)
    .then((committee) => res.json(committee))
    .catch((err) => res.status(400).json("Error: " + err));
});

// -----------------------post routes-------------------
router.route("/add").post((req, res) => {
  if (
    jwt.verify(
      req.headers.authorization.split(",")[0],
      process.env.TOKEN_SECRET
    )
  ) {
    console.log(req.body);
    const newCommittee = new Committee({
      committeeName: req.body.committeeName,
      status: 1,
      committeeFecId: req.body.committeeFecId,
      poc: req.body.poc,
      filingFrequency: req.body.filingFrequency,
    });
    console.log(newCommittee);
    newCommittee
      .save()
      .then((committee) => {
        res.status(200).json("committee created updated");
        console.log(committee);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } else res.status(401).json("Something Went Wrong...");
});

router.route("/update/:id").post((req, res) => {
  Committee.findById(req.params.id)
    .then((committee) => {
      committee.status = req.body.status;

      committee
        .save()
        .then(() => res.status(200).json("committee status updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update-status/:id").post((req, res) => {
  Committee.findById(req.params.id)
    .then((committee) => {
      committee.status = req.body.status;

      committee
        .save()
        .then(() => res.status(200).json("committee status updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update-committee/:id").post((req, res) => {
  Committee.findById(req.params.id)
    .then((committee) => {
      committee.committeeName = req.body.committeeName;
      committee.filingFrequency = req.body.filingFrequency;
      committee.poc = req.body.poc;
      committee.pocEmail = req.body.pocEmail;

      committee
        .save()
        .then(() => res.status(200).json("committee info updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update-report/:id").post((req, res) => {
  Committee.findById(req.params.id)
    .then((committee) => {
      committee.notes = req.body.notes;
      committee.reportId = req.body.reportId;
      committee.dateFiled = req.body.dateFiled;

      committee
        .save()
        .then(() => res.status(200).json("committee report updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").post((req, res) => {
  Committee.findById(req.params.id)
    .then((committee) => {
      committee
        .remove()
        .then(() => res.status(200).json("committee deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/reset").post((req, res) => {
  console.log(req.body);
  Committee.updateMany({filingFrequency: `${req.body.filingFrequency}`}, {$set:{status: 1}})
  .then(() =>res.status(200).json(`${filingFrequency} reset`))
  .catch((err) => res.status(400).json("Error: " + err));
})


module.exports = router;
