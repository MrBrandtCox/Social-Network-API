const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  //Drop existing users
  await User.deleteMany({});

  //Drop existing thoughts
  await Thought.deleteMany({});

  //Create empty array to hold the students
  const users = [
    {
      username: "Brandt",
      email: "brandt@gmail.com"
    },
    {
      username: "Brian",
      email: "brian@gmail.com"
    }
  ];

  await User.collection.insertMany(users);


  //Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
