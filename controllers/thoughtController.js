const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
  // getAllThoughts,
  // getThought,
  // createThought,
  // updateThought,
  // deleteThought,
  // addReaction,
  // removeReaction,

  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Student.find();

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.studentId })
        .select('-__v');

      if (!student) {
        return res.status(404).json({ message: 'No student with that ID' })
      }

      res.json({
        student,
        grade: await grade(req.params.studentId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const student = await Thought.create(req.body);
      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought and remove them from the user
  async deleteThought(req, res) {
    try {
      const student = await Thought.findOneAndRemove({ _id: req.params.studentId });

      if (!student) {
        return res.status(404).json({ message: 'No such student exists' });
      }

      const course = await Course.findOneAndUpdate(
        { students: req.params.studentId },
        { $pull: { students: req.params.studentId } },
        { new: true }
      );

      if (!course) {
        return res.status(404).json({
          message: 'Thought deleted, but no users found',
        });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a Reaction
  async addReaction(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);

    try {
      const student = await Thought.findOneAndUpdate(
        { _id: req.params.studentId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove Reaction
  async removeReaction(req, res) {
    try {
      const student = await Thought.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
