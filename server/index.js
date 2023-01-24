const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const PORT = 3000;
const axios = require('axios');
//mock api path
const apiPath = 'https://6l9qj.wiremockapi.cloud';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/test', (req, res) => {
  res.json('testing index')
});

//Returns User profiles
//Usable username for testing: gamer001, gamer002, gamer999.
app.get('/user/:user_id/profile', (req, res) => {
  axios.get(`${apiPath}/user/${req.query.user_id}/profile`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    })
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});