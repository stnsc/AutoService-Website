/*
* Users Model
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

//functie pentru a crea un utilizator
const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const {name, email, password, gender} = body;
    pool.query(
      "INSERT INTO users (name, email, password, gender) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, gender],
      (error, results) => {
        if (error) reject(error);
        if (results && results.rows) {
          resolve(`Un utilizator a fost adaugat: ${JSON.stringify(results.rows[0])}`);
        } else reject(new Error("Nu s-a putut adauga utilizatorul."));
      });
  });
}

//functie pentru validarea si autenficicarea utilizatorului
const loginUser = async (email, password) => {
  try {
    const user = await new Promise((resolve, reject) => {
      //se selecteaza randul tabelului care contine emailul dat
      pool.query("SELECT * FROM users WHERE email = $1", [email], (error, results) => {
        if(error) reject(error);
        if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
        else reject(new Error("Utilizatorul nu exista."));
      })
    });

    //daca parola data de utilizator coincide cu cel din baza de date
    //se valideaza incercare de autentificare
    if(user.password === password) {
      const {user_id, name, email} = user;
      return {user_id, name, email, message: "Logat cu succes!"};
    } else throw new Error("Parola incorecta.");

  } catch (error) {
    console.error(error);
    throw new Error("Eroare la autentificare.");
  }
}

module.exports = {
  createUser,
  loginUser,
};
