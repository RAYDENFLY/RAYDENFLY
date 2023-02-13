

// Create a new user
const user = new User({
  username: 'john',
  password: 'password123',
  email: 'john@example.com',
});

// Save the user to the database
user.save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User saved successfully');
  }
});
