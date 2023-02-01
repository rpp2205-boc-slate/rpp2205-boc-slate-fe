const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const PORT = 3000;
const axios = require('axios');
require('dotenv').config();
//mock api path
//const apiPath = 'https://6l9qj.wiremockapi.cloud';
const gameApiPath = 'https://api.rawg.io/api/games';
const gameApiKey = process.env.API_KEY;
const apiPath = 'http://54.159.164.8';
//const apiPath = 'http://localhost:3001';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/test', (req, res) => {
  res.send('hello')
});

app.get('/query', (req, res) => {
  console.log('hi')
  res.send('test2')
});

//post user info
app.post('/user/addinfo', (req, res) => {
  axios.post(`${apiPath}/user/addinfo`, req.body)
  .then((response) => {
    res.status(201).send(response.data)
  })
  .catch(err => res.status(400).send(err));
})

//Returns User profiles
app.get('/user/:user_id/profile', (req, res) => {
  axios.get(`${apiPath}/user/${req.params.user_id}/profile`)
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
  axios.post(`${apiPath}/${req.params.user1_id}/request/${req.params.user2_id}`)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//user1 responds to friend request from user2; response is APPROVED or REJECTED
app.post('/:user1_id/respond/:user2_id', (req, res) => {
  axios.post(`${apiPath}/${req.params.user1_id}/${req.body.respond}/${req.params.user2_id}`)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//user1 blocks/unblocks user2
app.post('/:user1_id/block/:user2_id', (req, res) => {
  axios.post(`${apiPath}/${req.params.user1_id}/${req.body.blocked}/${req.params.user2_id}`)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//user likes/dislikes a game
app.post('/game/:user_id/:game_id', (req, res) => {
  axios.post(`${apiPath}/game/${req.params.user_id}/${req.params.game_id}`)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});


//returns game's information based on searching keyword including the game name, game description, limiting results to be 100 games.
app.get('/games/keyword/:keyword/:pagenumber', (req, res) => {
  const keyword = req.params.keyword;
  console.log('keyword', keyword);
  axios.get(`${gameApiPath}?key=${gameApiKey}&search=${keyword}`)
    .then((response) => {
      console.log(response.data.results.length);
      res.status(200).send(response.data.results.slice(0,100));
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//return games ordering by rating (popularity) and released (trending), limiting the results to be 100 games.
app.get('/games/orderBy/:orderBy', (req, res) => {
  const orderBy = req.params.orderBy;
  axios.get(`${gameApiPath}?key=${gameApiKey}&ordering=-${orderBy}`)
    .then((response) => {
      res.status(200).send(response.results.slice(0, 100));
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

//return one game based on slug name, it might not be 100% accurate, but there is no way to search one game based on id
app.get('/games/slug/:slugname', (req, res) => {
  axios.get(`${gameApiPath}/${req.params.slugname}?key=${gameApiKey}`)
    .then((response) => {
      console.log(typeof response.data, response.data.name)
      res.status(200).send(response.data)
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});