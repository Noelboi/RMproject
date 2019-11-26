const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

app.use(morgan("dev"));
app.use(express.static("dist"));
app.use(express.static("public"));

app.get("/studentData", (req, res) => {
  let students = [];
  fs.readFile('server/students.json', (err, data) => {
    if (err) throw err;
    let students = JSON.parse(data);
    res.send(students)
  });
});

module.exports = app;
