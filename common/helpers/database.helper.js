import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_CONNECTION,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        query: { raw: true },
        logging: process.env.DB_LOGS === "true" ? console.log : false,
    }
);
// const sequelize = new Sequelize("postgres://postgres:password@localhost:5432/task");

const checkConnection = async () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log(`✅ Connection has been established successfully.`);
        })
        .catch((error) => {
            console.log("🔥 Unable to connect to the database🔥🔥:", error);
        });
};

checkConnection();

const OAuth = require("../../src/oAuth/oAuth.model");

sequelize
    .sync({ force: false, alter: true })
    .then((data) => {
        console.log(`✅ Table created successfully.`);
    })
    .catch((error) => {
        console.log("🔥 DB Error:", error);
    });

export { sequelize };
