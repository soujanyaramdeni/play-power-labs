const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12726381",
  password: "TgdARBTJNg",
  database: "sql12726381",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Successfully Connected to Database");
});

module.exports = db;

