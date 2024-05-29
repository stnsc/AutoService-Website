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
    } else new Error("Parola incorecta.");

  } catch (error) {
    console.error(error);
    throw new Error("Eroare la autentificare.");
  }
}

//functii pentru afisarea datelor utilizatorului logat
const getUsername = async (user_id) => {
  try {
    const user = await new Promise((resolve, reject) => {
      pool.query("SELECT name FROM users WHERE user_id = $1", [user_id], (error, results) => {
        if(error) reject(error);
        if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
        else reject(new Error("Nu s-a gasit numele utilizatorului. Esti logat?"))
      })
    })

    if(user) return user;
  } catch (error) {
    console.error(error);
    throw new Error("Eroare la primirea utilizatorului, esti logat?")
  }
}

const getEmail = async (user_id) => {
  try {
    const email = await new Promise((resolve, reject) => {
      pool.query("SELECT email FROM users WHERE user_id = $1", [user_id], (error, results) => {
        if(error) reject(error);
        if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
        else reject(new Error("Nu s-a gasit email-ul utilizatorului. Esti logat?"))
      })
    })

    if(email) return email;
  } catch (error) {
    console.error(error);
    throw new Error("Eroare la primirea utilizatorului, esti logat?")
  }
}

//functii pentru modificarea datelor utilizatorului
const setUsername = async (user_id, new_username) => {
  try {
    return await new Promise((resolve, reject) => {
      pool.query(`UPDATE users SET name = $1 WHERE user_id = $2`, [new_username, user_id], (error, results) => {
        if(error) reject(error);
        if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
        else reject(new Error("Nu s-a gasit utilizatorul. Esti logat?"))
      })
    })
  } catch (error) {
    console.error(error);
    throw new Error("Eroare la primirea utilizatorului, esti logat?")
  }
}

const setEmail = async (user_id, new_email) => {
  try {
    return await new Promise((resolve, reject) => {
      pool.query(`UPDATE users SET email = $1 WHERE user_id = $2`, [new_email, user_id], (error, results) => {
        if(error) reject(error);
        if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
        else reject(new Error("Nu s-a gasit utilizatorul. Esti logat?"))
      })
    })
  } catch (error) {
    console.error(error);
    throw new Error("Eroare la primirea utilizatorului, esti logat?")
  }
}

const setPassword = async (user_id, new_password) => {
  try{
    return await new Promise((resolve, reject) => {
      pool.query(`UPDATE users SET password = $1 WHERE user_id = $2`, [new_password, user_id], (error, results) => {
        if(error) reject(error);
        if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
        else reject(new Error("Nu s-a gasit utilizatorul. Esti logat?"))
      })
    })
  } catch (error) {
    console.error(error);
    throw new Error("Eroare la primirea utilizatorului, esti logat?")
  }
}

//functie pentru a vedea daca utilizatorul este un administrator
const getIsAdmin = async (user_id) => {
  try{
    return await new Promise((resolve, reject) => {
      pool.query(`SELECT is_admin FROM users WHERE user_id = $1`, [user_id], (error, results) => {
        if(error) reject(error);
        if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
        else reject(new Error("Nu s-a gasit utilizatorul. Esti logat?"))
      })
    })

  } catch (error) {
    console.error(error);
    throw new Error("Eroare la verificarea utilizatorului.")
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsername,
  getEmail,
  setUsername,
  setEmail,
  setPassword,
  getIsAdmin
};
