require('dotenv').config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const getLocations = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM locations", (error, results) => {
        if (error) reject(error);
        if (results && results.rows) resolve(results.rows);
        else reject(new Error("Nu s-au gasit locatii."));
      });
    });
  } catch (err) {
    console.error(err);
    throw new Error("Eroare Server Intern, Locatii");
  }
};

module.exports = {
  getLocations
};
