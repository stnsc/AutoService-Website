/*
* Ticket Model
*
* Functii care folosesc libraria Express, pentru a conecta frontend-ul cu backend-ul
* */


require('dotenv').config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

//functie pentru a crea un tichet
const createTicket = (body) => {
  const {userID, subject, message} = body;
  return new Promise(function (resolve, reject) {
    pool.query("INSERT INTO ticketRepository (user_id, subject, message) VALUES ($1, $2, $3) RETURNING *",
      [userID, subject, message],
      (error, results) => {
        if(error) reject(error);
        if(results && results.rows) {
          resolve(`Un tichet a fost adaugat: ${JSON.stringify(results.rows[0])}`)
        } else reject(new Error("Nu s-a putut adauga un tichet."))
    })
  })
}

const getTicketUser = (body) => {
  try{
    return new Promise(function (resolve, reject) {
      pool.query(`SELECT ticketrepository.ticket_id, ticketrepository.subject, ticketrepository.message
                  FROM (ticketrepository INNER JOIN users ON ticketrepository.user_id = users.user_id)
                  WHERE users.user_id = $1`, [body], (error, results) => {
        if (error) reject(error);
        if (results && results.rows && results.rows.length > 0) resolve(results.rows);
        else reject(new Error("Nu s-au gasit tichete."));
      })
    })
  } catch (err) {
    console.error(err);
    throw new Error("Eroare Server Intern, Tichete");
  }
}

module.exports = {
  createTicket,
  getTicketUser
}