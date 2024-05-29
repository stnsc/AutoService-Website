/*
* Appointment Model
*
* Functii care folosesc libraria Express, pentru a conecta frontend-ul cu backend-ul
* */

//toate modelele au initializarea parametrilor bazei de date,
//care sunt ascuse intr-un fisier .env
require('dotenv').config();

const Pool = require("pg").Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

//functie pentru crearea unei programari
const createAppointment = (body) => {
    return new Promise(function (resolve, reject) {
        //se preiau parametrii dati in format JSON din index.cjs
        const {locationID, userID, dateTime, details} = body;

        pool.query(
            //inseram in tabelul "appointments" parametrii dati mai sus
            "INSERT INTO appointments (user_id, location_id, app_date, app_notes) VALUES ($1, $2, $3, $4) RETURNING *",
            [userID, locationID, dateTime, details],
            (error, results) => {
                if(error) reject(error);
                if(results && results.rows) {
                    resolve(`O programare a fost adaugata: ${JSON.stringify(results.rows[0])}`)
                    //daca exista resultate, query-ul se rezolva si returneaza un mesaj
                } else reject(new Error("Nu s-a putut adauga programarea."))
            }
        )
    })
}

const getAppointments = async (body) => {
    try {
        return await new Promise((resolve, reject) => {
            //query-ul urmator preia resultatele necesare pentru a arata toate pragramarile unui singur utilizator
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

//o comanda de administrator pentru a afisa programarile tuturor utilizatorilor
const getAllAppointments = async () => {
    return await new Promise((resolve, reject) => {
        pool.query(`SELECT appointments.app_id, users.user_id, users.name as username, locations.name, locations.address, appointments.app_date, appointments.app_notes
                    FROM ((appointments INNER JOIN locations ON appointments.location_id = locations.location_id)
                    INNER JOIN users ON appointments.user_id = users.user_id)`, (error, results) => {
            if (error) reject(error);
            if (results && results.rows && results.rows.length > 0) resolve(results.rows);
            else reject(new Error("Nu s-au gasit programari."));
        })
    })
}

//comanda pentru a sterge o programare unui utilizator
const deleteAppointment = async (body) => {
    return await new Promise((resolve, reject) => {
        pool.query("DELETE FROM appointments WHERE app_id = $1", [body.appID], (error, results) => {
            if (error) reject(error);
            if(results && results.rows && results.rows.length > 0) resolve(results.rows[0]);
            else reject(new Error("Nu s-a putut sterge programarea."))
        })
    })
}

module.exports = {
    createAppointment,
    getAppointments,
    getAllAppointments,
    deleteAppointment
}