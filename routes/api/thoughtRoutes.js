const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/students
router.route('/').get(getAllThoughts).post(createThought);

// /api/students/:studentId
router.route('/:studentId').get(getThought).delete(deleteThought);

// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeReaction);

module.exports = router;
