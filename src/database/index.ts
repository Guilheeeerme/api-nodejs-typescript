require("dotenv").config();

import knex from "knex";

const connection = knex({
  client: "pg",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  useNullAsDefault: true,
});

export default connection;
