const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGODB_URI);

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));



//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});