require("dotenv").config();
const mysql = require("mysql2/promise");

async function checkDb(url,fileId) {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWD,
      database: process.env.DBNAME,
    });
    try {
      const [rows, fields] = await connection.execute("SELECT * FROM tgbot");
      const found = rows.some((row) =>
        Object.values(row).includes(url)
      );
      if (found) {
        rows.forEach((row) => {
          console.log(rows[0].deger);
          //console.log(row.second_note);
        });
      } else {
        console.log("not found");
        const [insertResult, insertFields] = await connection.execute(
          `INSERT INTO tgbot (url, deger) VALUES (?, ?)`,
          [`${url}`, `${fileId}`]
        );
        console.log("new row inserted with id:", insertResult.insertId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      connection.end();
    }
  }
  
exports.checkDb = checkDb;