/*
 * Services Model
 *
 * Functii care folosesc libraria Express, pentru a conecta frontend-ul cu backend-ul
 * */

require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getServices = async () => {
  return await new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM services", (error, results) => {
      if (error) reject(error);
      if (results && results.rows) resolve(results.rows);
      else reject(new Error("Nu s-au gasit servicii."));
    });
  });
};

module.exports = {
  getServices
};
