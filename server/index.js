const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { default: mongoose } = require("mongoose");
const signupSchema = require('./models/signupSchema');
var localStorage = require('localStorage');
const cookie = require('cookie');
const app = express();
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


//connecting to database
mongoose.connect('mongodb+srv://lssuccess:1234@cluster0.e8jgo2a.mongodb.net/auth?retryWrites=true&w=majority', {        
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Our Profile..." });
});




// signup user
app.post('/insertData', async (req, res) => {

  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    res.status(401).json({ error: "kindly fill all fields!" })
  }
  else {
    await signupSchema.findOne({ email: email }).then(userExist => {
      if (userExist) {
        res.status(401).json({ message: "user already registered" })
      }
      else {
        const user = new signupSchema({ firstname, lastname, email, password });

        user.save().then(() => {

          res.status(200).json({ message: "user registered successfully" })
        }).catch(() => {

          res.status(401).json({ error: "Failed to register!" })
        })

      }
    })

  }
})




let email1 = null;


app.get('/getData', async (req, res) => {

  const userData = await signupSchema.findOne({ email: email1 });
  // const userData = await signupSchema.find();
  if (email1 != null) {
    res.json(userData);
    // console.log("userData FROM GETDATA: " + userData);
  }
  // res.send(userData);
  else {
    res.send("userData can't found")
  }

})

// signin user
app.post('/login', async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(405).json({ error: "Email or Password missing..." });
    }

    const userLogin = await signupSchema.findOne({ email: email });

    if (userLogin) {

      email1 = email;

      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials!" })
      } else {

        const token = await userLogin.generateAuthToken();

        res.send({
          status: 200,
          token: token

        })
      }

    }
    else {
      res.status(404).json({ error: "invalid credentials!" })
    }

  } catch (err) {
    console.log(err);
  }


})




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
