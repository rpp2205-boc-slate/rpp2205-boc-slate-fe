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
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
})

app.get('/test', (req, res) => {
  res.send('hello')
});

app.get('/query', (req, res) => {
  console.log('hi')
  res.send('test2')
});

//Returns User profiles
app.get('/user/:user_id/profile', (req, res) => {
  console.log(req)
  axios.get(`${apiPath}/user/${req.query.user_id}/profile`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//Returns username, userID and profile photo of all users
app.get('/users', (req, res) => {
  axios.get(`${apiPath}/users`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//user1 send friend request to user2
app.post('/:user1_id/request/:user2_id', (req, res) => {
  axios.post(`${apiPath}/${req.body.user1_id}/request/${req.body.user2_id}`)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//user1 responds to friend request from user2; response is ACCEPT or DENY
app.post('/:user1_id/:respond/:user2_id', (req, res) => {
  axios.post(`${apiPath}/${req.body.user1_id}/${req.body.respond}/${req.body.user2_id}`)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//Returns User metadata
app.get('/user/:user_id/meta', (req, res) => {
  axios.get(`${apiPath}/user/${req.query.user_id}/meta`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//Returns User’s friends list. Friends list does not include any blocked friends
app.get('/user/:user_id/friends', (req, res) => {
  axios.get(`${apiPath}/user/${req.params.user_id}/friends`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});