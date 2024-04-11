require('dotenv').config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

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
        } else reject(new Error("Nu s-a putut executa adaugarea."));
      });
  });
}

const loginUser = async (email, password) => {
  try {
    const user = await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users WHERE email = $1", [email], (error, results) => {
        if(error) reject(error);
        if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
        else reject(new Error("Utilizatorul nu exista."));
      })
    });

    if(user.password === password) {
      const {id, name, email} = user;
      return {id, name, email, message: "Logat cu succes!"};
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
