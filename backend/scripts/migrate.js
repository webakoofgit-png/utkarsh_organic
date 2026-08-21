import mysql from "mysql2/promise";
import { assertEnv, env } from "../config/env.js";
import { sequelize } from "../config/database.js";
import "../models/index.js";

assertEnv();

const connection = await mysql.createConnection({
  host: env.db.host,
  port: env.db.port,
  user: env.db.username,
  password: env.db.password,
  multipleStatements: true,
});

await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.db.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
await connection.end();
await sequelize.authenticate();
await sequelize.sync({ alter: true });
await sequelize.close();

console.log(`Database ${env.db.database} migrated successfully.`);
