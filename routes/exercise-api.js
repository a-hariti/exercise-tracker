const { Router } = require("express");

const { createUser, getUsers } = require("./users-handler");
const { addExercise, logExercises } = require("./exercise-handler");

module.exports = new Router()
  .post("/new-user", createUser)
  .get("/users", getUsers)
  .post("/add", addExercise)
  .get("/log", logExercises);
