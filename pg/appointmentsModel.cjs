require('dotenv').config();

const Pool = require("pg").Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const createAppointment = (body) => {
    return new Promise(function (resolve, reject) {
        const {app_id, user_id, location_id, app_date, app_notes} = body;
        pool.query(
            "INSERT INTO appointments (app_id, user_id, location_id, app_date, app_notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [app_id, user_id, location_id, app_date, app_notes],
            (error, results) => {
                if(error) reject(error);
                if(results && results.rows) {
                    resolve(`O programare a fost adaugata: ${JSON.stringify(results.rows[0])}`)
                } else reject(new Error("Nu s-a putut adauga programarea."))
            }
        )
    })
}