require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const startApiServer = require("./api");
const startSocketServer = require("./socket");
const API_PORT = process.env.API_PORT || 5000;

const app = express();
const server = http.createServer(app);

startApiServer(app);
startSocketServer(server);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../client/dist");
  
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

server.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);
});