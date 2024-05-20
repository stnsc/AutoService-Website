/*
* EXPRESS INDEX
*
* Fisierul care gestioneaza toate fetch-urile API
* */

require('dotenv').config();

const express = require("express");
const jwt = require("jsonwebtoken")

const users_model = require("./pg/usersModel.cjs");
const locations_model = require("./pg/locationsModel.cjs");
const appointments_model = require("./pg/appointmentsModel.cjs");
const ticket_model = require("./pg/ticketModel.cjs");

const app = express();
const port = 3001;
const path = "/api";

//orice funcionalitate express neceita permisuni pentru a fi executat cu succes
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

//functie pentru a genera o cheie criptata cu scopul de a tine utilizatorul
//logat chiar daca pagina a fost inchisa, expira dupa 24 de ore
function generateToken(id){
  return jwt.sign({id}, process.env.TOKEN_KEY, { expiresIn: '24h' });
}

/*
* Modul in care API-urile sunt create si executate sunt asemanatoare
* prin toate modelele:
*
* Un status code de 200, daca request-ul a fost executat cu succes din model
* Un status code de 500, daca request-ul nu s-a executat
* */

//network testing
app.get('/', (req, res) => {
  res.send(`Connected successfully to port ${port}`);
})

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

//get username
app.get(`${path}/users/getUsername`, (req, res) => {
  const userID = req.query.userID;
  if(!userID) return res.status(400).send("Missing user parameter.");

  users_model.getUsername(userID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//get email
app.get(`${path}/users/getEmail`, (req, res) => {
  const userID = req.query.userID;
  if(!userID) return res.status(400).send("Missing user parameter.");

  users_model.getEmail(userID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//set username
app.post(`${path}/users/setUsername`, (req, res) => {
  console.log(req.body);

  const userID = req.body.userID;
  const newUsername = req.body.name;

  if(!userID || !newUsername) return res.status(400).send("Missing parameters.");

  users_model.setUsername(userID, newUsername)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//set email
app.post(`${path}/users/setEmail`, (req, res) => {
  const userID = req.body.userID;
  const newEmail = req.body.newEmail;

  if(!userID || !newEmail) return res.status(400).send("Missing parameters.");

  users_model.setEmail(userID, newEmail)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//set password
app.post(`${path}/users/setPassword`, async (req, res) => {
  const userID = req.body.userID;
  const newPassword = req.body.newPassword;

  if(!userID || !newPassword) return res.status(400).send("Missing parameters.");

  users_model.setPassword(userID, newPassword)
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

//get appointments for a user
app.get(`${path}/appointments/user`, (req, res) => {
  const userID = req.query.userID;
  if(!userID) return res.status(400).send("Missing user parameter.")

  appointments_model.getAppointments(userID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//delete appointment
app.post(`${path}/appointments/delete`, (req, res) => {
  appointments_model.deleteAppointment(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//get all appointments (admin command)
app.get(`${path}/appointments/getAll`, (req, res) => {
  appointments_model.getAllAppointments()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

/* TICKETS */

//submit ticket
app.post(`${path}/tickets/add`, (req, res) => {
  ticket_model.createTicket(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//get tickets from a user
app.get(`${path}/tickets/user`, (req, res) => {
  const userID = req.query.userID;
  if(!userID) return res.status(400).send("Missing user parameter.")

  ticket_model.getTicketUser(userID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//get all tickets (admin command)
app.get(`${path}/tickets/all`, (req, res) => {
  ticket_model.getAllTickets()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//delete ticket
app.post(`${path}/tickets/delete`, (req, res) => {
  ticket_model.deleteTicket(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//add chat message
app.post(`${path}/tickets/addChat`, (req, res) => {
  ticket_model.addChat(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//get all chat messages from a ticket
app.get(`${path}/tickets/getChats`, (req, res) => {
  const ticketID = req.query.ticketID;
  if(!ticketID) return res.status(400).send("Missing user parameter.")

  ticket_model.getChatsFromTicket(ticketID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

//claim a ticket
app.post(`${path}/tickets/claim`, (req, res) => {
  ticket_model.claimTicket(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.listen(port, process.env.VITE_HOST_IP, () => {
  console.log(`App Running on Port ${port}.`);
});
