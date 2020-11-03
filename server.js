const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.ATLAS_URI);

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb+srv://user_atlas:KaP23G43H5JjcPm@cluster0.lhnjo.mongodb.net/workout?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});