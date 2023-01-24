import React from "react";
import { useState, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import axios from "axios";

const client = StreamChat.getInstance("npwanznmku2q");

await client.connectUser(
    {
        id: 'connor',
        name: 'Connor Thurston',
        image: '',
    },
   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYmx1ZS1iaXJkLTgifQ.c6cRKGa0BBSV7RYckYH6gsK5E6G2zZFHZwNtDLVUDjE",
)

// create a channel by providing list of members for that channel.
// In this case, id will be auto-generated on backend side
const channel = client.channel('messaging', {
  members: ['self', 'otherUser'],
 name: 'Chat with otherUser'
});


// fetch the channel state, subscribe to future updates
await channel.watch();


export default function Messenger(props) {

  return(
    <>
      <h1> Welcome to GamerCity! </h1>
    </>
  );

}