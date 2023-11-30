import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as httpCreateServer } from "http";
import { createServer as httpsCreateServer } from "https";
import fs from "fs";
import "./common/helpers/database.helper";
import errorHandlerMiddleware from "./common/middleware/error-handler.middleware";
import routes from "./src/routes";

const app = express();

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(routes);
app.use(errorHandlerMiddleware);

const isSecure = process.env.IS_SECURE === "true";
let server;
if (isSecure) {
    var options = {
        key: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/privkey.pem`),
        cert: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
        ca: [
            fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
            fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/fullchain.pem`),
        ],
    };
    server = httpsCreateServer(options, app);
} else {
    server = httpCreateServer(app);
}

server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.APP_URL}`);
});
