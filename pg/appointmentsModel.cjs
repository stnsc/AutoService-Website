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
        const {locationID, userID, dateTime, details} = body;

        pool.query(
            "INSERT INTO appointments (user_id, location_id, app_date, app_notes) VALUES ($1, $2, $3, $4) RETURNING *",
            [userID, locationID, dateTime, details],
            (error, results) => {
                if(error) reject(error);
                if(results && results.rows) {
                    resolve(`O programare a fost adaugata: ${JSON.stringify(results.rows[0])}`)
                } else reject(new Error("Nu s-a putut adauga programarea."))
            }
        )
    })
}

const getAppointments = async (body) => {
    try {
        return await new Promise((resolve, reject) => {
            console.log(body);
            pool.query(`SELECT users.user_id, appointments.app_id, locations.name, locations.address, appointments.app_date
                        FROM ((appointments INNER JOIN locations ON appointments.location_id = locations.location_id)
                        INNER JOIN users ON appointments.user_id = users.user_id) WHERE users.user_id = $1;`, [body], (error, results) => {
                if (error) reject(error);
                if (results && results.rows && results.rows.length > 0) resolve(results.rows);
                else reject(new Error("Nu s-au gasit programari."));
            })
        })
    } catch (err) {
        console.error(err);
        throw new Error("Eroare Server Intern, Programari");
    }
}

const getAllAppointments = async () => {
    return await new Promise((resolve, reject) => {
        pool.query("SELECT * FROM appointments", (error, results) => {
            if (error) reject(error);
            if (results && results.rows && results.rows.length > 0) resolve(results.rows);
            else reject(new Error("Nu s-au gasit programari."));
        })
    })
}

module.exports = {
    createAppointment,
    getAppointments,
    getAllAppointments
}