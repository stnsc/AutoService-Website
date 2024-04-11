const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "AutoService",
  password: "admin",
  port: 5432,
});

const getUsers = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM users", (error, results) => {
        if (error) reject(error);
        if (results && results.rows) resolve(results.rows);
        else reject(new Error("Nu s-au gasit utilizatori."));
      });
    });
  } catch (err) {
    console.error(err);
    throw new Error("Eroare Server Intern, Utilizatori");
  }
};

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

module.exports = {
  getUsers,
  createUser,
};
