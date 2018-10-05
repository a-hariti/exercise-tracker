const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const exerciseApi = require("./routes/exercise-api");

mongoose.Promise = Promise;
mongoose
  .connect(
    process.env.NODE_ENV == "production"
      ? process.env.MLAB_URI
      : process.env.LOCAL_DB
  )
  .then(_ => console.log("connected to mongodb successfully"))
  .catch(error => console.error("error connecting to mongodb: ", error));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

//api stuff
app.use("/api/exercise", cors(), exerciseApi);

// Not found middleware
app.use((req, res, next) => next({ status: 404, message: "not found" }));

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || "Internal Server Error";
  }
  res
    .status(errCode)
    .type("txt")
    .send(errMessage);
});

const listener = app.listen(process.env.PORT || 3000, _ =>
  console.log("server listening on port " + listener.address().port)
);
