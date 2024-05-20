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

//functie pentru a prelua tichetele create de un utilizator
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

//functie pentru a prelua toate tichetele (admin)
const getAllTickets = () => {
  try{
    return new Promise(function (resolve, reject) {
      pool.query(`SELECT * FROM ticketrepository`, (error, results) => {
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

//functie care sterge tichetul unui utilizator
const deleteTicket = async (body) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const deleteChats = await client.query("DELETE FROM ticketchats WHERE ticket_id = $1 RETURNING *", [body.ticketID]);

    const deleteTicket = await client.query("DELETE FROM ticketrepository WHERE ticket_id = $1", [body.ticketID]);

    await client.query('COMMIT');
    return deleteTicket.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

//functie pentru a prelua un tichet al unui admin
const claimTicket = (body) => {
  console.log(body);
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE ticketrepository SET admin_id = $1 WHERE ticket_id = $2`, [body.userID, body.ticketID], (error, results) => {
      if (error) reject(error);
      if (results && results.rows && results.rows.length > 0) resolve(results.rows);
      else reject(new Error("Nu s-a putut prelua tichetul."));
    })
  })
}

//functie pentru adaugarea unui chat intr-un tichet
const addChat = (body) => {
  const date = new Date();
  const date_day = date.toDateString();
  const date_timestamp = date.getHours() + ":" + date.getMinutes();
  const date_unix = Math.floor(date.getTime() / 1000);
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO ticketchats
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [body.ticketID, body.userID, body.name, body.inputValue, date_day, date_timestamp, date_unix],
      (error, results) => {
        if (error) reject(error);
        if (results && results.rows && results.rows.length > 0) resolve(results.rows);
        else reject(new Error("Nu s-a putut trimite mesajul."));
      })
  })
}

const getChatsFromTicket = (body) => {
  console.log(body);
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ticketchats WHERE ticket_id = $1`, [body], (error, results) => {
      if (error) reject(error);
      if (results && results.rows && results.rows.length > 0) resolve(results.rows);
      else reject(new Error("Nu s-au prelua mesajele din acest tichet."));
    })
  })
}

module.exports = {
  createTicket,
  getTicketUser,
  getAllTickets,
  deleteTicket,
  claimTicket,
  addChat,
  getChatsFromTicket
}