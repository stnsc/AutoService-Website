const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "AutoService",
  password: "admin",
  port: 5432,
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
