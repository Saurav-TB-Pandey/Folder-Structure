const express = require("express");
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 4028;

try {
  const httpsOptions = {
    key: fs.readFileSync("/home/jenkins/SSL/ss.key"),
    cert: fs.readFileSync("/home/jenkins/SSL/ss.crt"),
  };

  https
    .createServer(httpsOptions, app)
    .listen(port, () => console.log(`Frontend Server Is Listening On ${port}`));
} catch (err) {
  http
    .createServer(app)
    .listen(port, () => console.log(`Frontend Server Is Listening On ${port}`));
  console.info("Frontend Is Running On HTTP");
}

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
