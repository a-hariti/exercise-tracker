const User = require("../models/user-model");
const handleErrors = require("../utils/handle-errors");

const getUserNameAndId = ({ username, _id }) => ({ username, _id });

const createUser = ({ body: { username } }, res) =>
  User.create({ username }).then(user => res.json(getUserNameAndId(user)));

const getUsers = (_, res) =>
  User.find({}).then(users => res.json(users.map(getUserNameAndId)));

module.exports = {
  createUser: handleErrors(createUser),
  getUsers: handleErrors(getUsers)
};
