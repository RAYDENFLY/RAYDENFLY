//models user login database
const quickdb = require('quick.db');
const fs = require('fs');
const colors = require('colors');
const bcrypt = require('bcrypt')//crypt password

//express framework
const express = require('express');
const app = express();
const session = require('express-session');

// Use the session middleware
app.use(session({
  secret: 'yoursecretkey',
  resave: false,
  saveUninitialized: true
}));
var path = require('path');
const router = express.Router();
app.listen(8080);
const port = (8080)
console.log(`AMS System : Web Server Has Been Started https://localhost:${port}`)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
//dir path
// Render Embeded JavaScript
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);


//Home page
app.get('', function(req, res) {
    res.render('home');
});
app.get('/home', function(req, res) {
    res.render('home');
});
//Profile Page
app.get('/about', function(req, res) {
    res.render('profile/azismaulana');
});

//Admin Page
app.get('/admin', function(req, res){
    res.render('admin/absen_admin');
});

app.get('/login', function(req, res){
  res.render('admin/login');
});
    app.get('/admin/logout', function(req, res){
      res.render('admin/logout');
    });
app.get('/register', function(req, res){
  res.render('admin/register');
});

app.get('/dashboard', function(req, res){
  // Get the user from the session
  const user = req.session.user;

  // Check if the user is logged in
  if (!user) {
    res.redirect('/login');
    return;
  }

  res.render('profile/dashboard', { user: { name: user.username } });
});

app.get('/profile', function(req, res){
  // Get the user from the session
  const user = req.session.user;

  // Check if the user is logged in
  if (!user) {
    res.redirect('/login');
    return;
  }

  res.render('profile/profile', { user: { name: user.username } });
});


//login & Register page
app.post('/login', (req, res) => {
  // Get the username and password from the request body
  const { username, password } = req.body;

  // Read the existing users data from the file
  let users = JSON.parse(fs.readFileSync('./users.json'));

  // Find the user by username
  const user = Object.values(users).find(user => user.username === username);

if (!user) {
  res.render('admin/login', { error: 'Invalid username or password' });
  return;
}


  // Compare the password with the hashed password stored in the file
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      console.log("Error : ",err);
    }else{
        if (!isMatch) {
        // If the password is incorrect, render the login page with an error message
        res.render('admin/login', { error: 'Invalid username or password' });
        return;
        }

        // If the username and password are correct, create a session and
        // redirect the user to the dashboard
        req.session.user = user;
        res.redirect('/dashboard');
    }
  });
});



app.post('/register', (req, res) => {
    // Get the username, password, and email from the request body
    const { username, password, email } = req.body;

    // Validate the form data
    if (!username || !password || !email) {
      // If any of the fields are empty, render the registration page with an error message
      res.render('register', { error: 'All fields are required' });
    } else {
        // Read the existing users data from the file
        let users = JSON.parse(fs.readFileSync('./users.json'));

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.log("Error : ",err);
            }else{
                // Create a new user object
                const newUser = {
                  username,
                  password: hashedPassword,
                  email
                };

                // Add the new user to the existing users data
                users[username] = newUser;

                // Write the updated users data to the file
                fs.writeFileSync('./users.json', JSON.stringify(users));

                // Then render the success page
                res.render('success');
            }
        });
    }
});
app.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy();

  // Redirect the user to the login page
  res.redirect('/login');
  req.session.destroy((err) => { error: 'All fields are required' });
});
