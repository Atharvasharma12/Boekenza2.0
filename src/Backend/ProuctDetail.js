//sending and ritreving items from data base

//importing libraries
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

console.log("this is product backend");

const app = express();

app.get("/uploadproduct", (req, res) => {
  res.send("this is product server ......");
});
