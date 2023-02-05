const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const PORT = 3000;
const axios = require('axios');
const { StreamChat } = require('stream-chat');
const { Chat, Channel, ChannelList, ChannelHeader, MessageInput, MessageList, Thread, Window } = require('stream-chat-react');
require('dotenv').config();
//mock api path
//const apiPath = 'https://6l9qj.wiremockapi.cloud';
const gameApiPath = 'https://api.rawg.io/api/games';
const gameApiKey = process.env.API_KEY;
const apiPath = 'http://54.159.164.8';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));


const chatClient = new StreamChat('npwanznmku2q');
const userToken = chatClient.devToken('connor')

chatClient.connectUser(
  {
    id: 'connor',
    name: 'Connor Thurston',
    image: '',
  },
  userToken,
);


const channel = chatClient.channel('messaging', 'GamerCity2', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'GamerCity Chat 2',
  members: ['connor', 'otherUser'],
});

let request = chatClient.sendUserCustomEvent('connor', {
  type: 'friend_request',
  text: 'Joaquin wants to be your friend',
});

// console.log(request)