const express = require("express");
const app = express();
const port = process.env.port || 5000;
const route = require("./routes/getRoute");
const pingRoute = require("./routes/ping");
app.use("/getScreenshot",route);
app.use("/ping",pingRoute);

module.exports = app;