import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",  // Empty password for XAMPP
  database: "hr_templates",
  port: 3306,   // Check if it's different in XAMPP
});

export default db;
