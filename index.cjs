require('dotenv').config();

const express = require("express");
const jwt = require("jsonwebtoken")

const users_model = require("./pg/usersModel.cjs");
const locations_model = require("./pg/locationsModel.cjs");
const appointments_model = require("./pg/appointmentsModel.cjs");

const app = express();
const port = 3001;
const path = "/api";

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers",
  );
  next();
});

/* SESSION TOKEN */

function generateToken(id){
  return jwt.sign({id}, process.env.TOKEN_KEY, { expiresIn: '24h' });
}

/* USERS */
// create user
app.post(`${path}/users/create`, (req, res) => {
  users_model.createUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//login user
app.post(`${path}/users/login`, (req, res) => {
  const {email, password} = req.body;

  users_model.loginUser(email, password)
    .then((response) => {
      console.log(response);

      const token = generateToken(response.user_id);

      console.log(token);

      res.status(200).json({message: response, token, name: response.name, id: response.user_id});
    })
    .catch((error) => {
      res.status(500).send(error.message);
    })
})

/* LOCATIONS */
//get locations
app.get(`${path}/locations`, (req, res) => {
  locations_model.getLocations()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

/* APPOINTMENTS */
//add appointment
app.post(`${path}/appointments/create`, (req, res) => {
  appointments_model.createAppointment(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})


app.listen(port, () => {
  console.log(`App Running on Port ${port}.`);
});
