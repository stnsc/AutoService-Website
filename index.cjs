const express = require("express");

const users_model = require("./pg/usersModel.cjs");
const locations_model = require("./pg/locationsModel.cjs");

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

/* USERS */
// get users
app.get(`${path}/users`, (req, res) => {
  users_model
    .getUsers()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

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


app.listen(port, () => {
  console.log(`App Running on Port ${port}.`);
});
