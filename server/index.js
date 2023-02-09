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
const genreApiPath = 'https://api.rawg.io/api/genres';
const platformApiPath = 'https://api.rawg.io/api/platforms';
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

//update user infor
app.post('/user/:user_id/profile', (req, res) => {
  axios.post(`${apiPath}/user/${req.params.user_id}/profile`, req.body)
  .then((response) => {
    res.status(201).send("updated!");
  })
  .catch((err) => {
    res.status(400).send(err);
  })
});


//Returns username, userID and profile photo of all users
app.get('/users/:keyword', (req, res) => {
  axios.get(`${apiPath}/users/${req.params.keyword}`)
    .then((response) => {
      // console.log(response, 'inside getting users')
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//user1 send friend request to user2
app.post('/:user1_id/request/:user2_id', (req, res) => {
  axios.post(`${apiPath}/friends/${req.params.user1_id}/request/${req.params.user2_id}`)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

//user1 responds to friend request from user2; response is APPROVED or REJECTED
app.post('/:user1_id/respond/:user2_id', (req, res) => {
  axios.post(`${apiPath}/friends/${req.params.user1_id}/respond/${req.params.user2_id}`, req.body)
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
  var liked = req.body.liked === 'true' || req.body.liked === true;
  axios.post(`${apiPath}/game/${req.params.user_id}/${req.params.game_id}`, {liked})
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
  // console.log('keyword', keyword);
  // console.log('pagenumber', req.params.pagenumber);
  var path = `${gameApiPath}?search=${keyword}&key=${gameApiKey}&page=${req.params.pagenumber}`
  // console.log('path', path)
  axios.get(`${gameApiPath}?search=${keyword}&key=${gameApiKey}&page=${req.params.pagenumber}`)
    .then((response) => {
      // console.log(response.data, 'ken')
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
      // console.log(orderBy, response.data)
      // for some reason response.data.slice(0, 100) didnt work. Only response.data)
      res.status(200).send(response.data.results.slice(0, 100));
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

//return one game based on slug name, it might not be 100% accurate, but there is no way to search one game based on id
app.get('/games/slug/:slugname', (req, res) => {
  axios.get(`${gameApiPath}/${req.params.slugname}?key=${gameApiKey}`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

// return list of genres
app.get('/genre', (req, res) => {
  axios.get(`${genreApiPath}?key=${gameApiKey}`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

// get related games based off of genre
app.get('/games/genre/:genre', (req, res) => {
  let q = req.params.genre.toLowerCase();
  if (q === "rpg") {
    q = 5;
  } else if (q === "massively multiplayer") {
    q = 59;
  } else if (q === "board games") {
    q= 28;
  }
  axios.get(`${gameApiPath}?genres=${q}&key=${gameApiKey}`)
    .then((response) => {
      // console.log(response.data)
      res.status(200).send(response.data)
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

//get platforms
app.get('/platforms', (req, res) => {
  axios.get(`${platformApiPath}?key=${gameApiKey}`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

// get related games based off of platform
app.get('/games/platform/:platform', (req, res) => {
  let q = req.params.platform;
  // console.log(q, 'here')
  axios.get(`${gameApiPath}?platforms=${q}&key=${gameApiKey}`)
    .then((response) => {
      // console.log(response.data)
      res.status(200).send(response.data)
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

// get all games for both genre and platform
app.get('/games/genre/:genre/platform/:platform', (req, res) => {
  let p = req.params.platform;
  let q = req.params.genre.toLowerCase();
  if (q === "rpg") {
    q = 5;
  } else if (q === "massively multiplayer") {
    q = 59;
  } else if (q === "board games") {
    q= 28;
  }
  // console.log(q, 'here')
  axios.get(`${gameApiPath}?platforms=${p}&genres=${q}&key=${gameApiKey}`)
    .then((response) => {
      // console.log(response.data)
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