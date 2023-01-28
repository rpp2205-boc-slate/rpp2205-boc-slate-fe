import React from "react";
import { useState, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';
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
  members: [client.user.id, 'otherUser'],
 name: 'Chat with otherUser'
});


// fetch the channel state, subscribe to future updates
await channel.watch();

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const Messenger = () => {
const [client, setClient] = useState(null);

useEffect(() => {
const newClient = new StreamChat('npwanznmku2q');

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log('connection lost');
      setClient(newClient);
    };

    newClient.on('connection.changed', handleConnectionChange);

    newClient.connectUser(
      {
        id: 'connor',
        name: 'Connor Thurston',
      },
      'your_user_token',
    );

    return () => {
      newClient.off('connection.changed', handleConnectionChange);
      newClient.disconnectUser().then(() => console.log('connection closed'));
    };
}, []);

if (!client) return null;

return (
<Chat client={client}>
<ChannelList filters={filters} sort={sort} options={options} />
<Channel>
<Window>
<ChannelHeader />
<MessageList />
<MessageInput />
</Window>
<Thread />
</Channel>
</Chat>
);
};

export default Messenger;


// export default function Messenger(props) {

//   return(
//     <>
//       <h1> Welcome to GamerCity! </h1>
//     </>
//   );

// }