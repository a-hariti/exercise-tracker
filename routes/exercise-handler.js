const Exercise = require('../models/exercise-model')
const User = require('../models/user-model')
const handleErrors = require('../utils/handle-errors')
const getExerciseInfo = ({ description, duration, date }) => ({
  description,
  duration,
  date
})

const addExercise = async (req, res) => {
  const newExercise = await Exercise.create({
    ...req.body,
    date: req.body.date ? req.body.date : new Date()
  })

  const { username, _id } = await User.findById(newExercise.userId).exec()

  res.json({
    username,
    _id,
    exercise: getExerciseInfo(newExercise)
  })
}
const logExercises = async (
  { query: { userId, from, to, limit = 10000 } },
  res
) => {
  const { username, _id } = await User.findById(userId)
  const exercises = await Exercise.find({
    userId,
    ...((from || to) && {
      date: {
        ...(from && { $gt: new Date(from) }),
        ...(to && { $lt: new Date(to) })
      }
    })
  }).limit(+limit)
  res.json({
    username,
    _id,
    count: exercises.length,
    log: exercises.map(getExerciseInfo)
  })
}

module.exports = {
  addExercise: handleErrors(addExercise),
  logExercises: handleErrors(logExercises)
}
