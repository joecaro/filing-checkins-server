const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri, dbOptions);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------PASSPORT AUTH---------------

require("./config/passport");

app.use(passport.initialize());

// ----------------ROUTES-------------
app.get("/", (req, res) => {
  res.send("This Test Works!");
});

const committeesRouter = require("./routes/committees");
const userRouter = require("./routes/user");
const eventRouter = require("./routes/events");
app.use("/committees", committeesRouter);
app.use("/users", userRouter);
app.use("/events", eventRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
