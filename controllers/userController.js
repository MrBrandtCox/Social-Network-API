const { User, Thought } = require('../models');

module.exports = {
  //getAllUsers,
  //getUser,
  //createUser,
  //updateUser,
  //deleteUser,
  //addFriend,
  //removeFriend

  // GetAllUsers
  async getAllUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // getUser
  async getUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      if (!userData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // createUser
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // deleteUser
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });

      if (!userData) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: userData.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // updateUser
  async updateUser(req, res) {
    console.log("Update user");
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add friend
  async addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);

    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
