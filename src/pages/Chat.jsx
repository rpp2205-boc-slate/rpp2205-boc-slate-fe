import React from 'react';
import { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import axios from "axios";
import {useParams} from 'react-router-dom';

import 'stream-chat-react/dist/css/v2/index.css';
// import './App.css';

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


const ChatApp = (props) => {
  console.log(chatClient.user.id)
  console.log(props.user, props.userId)
  // now that userId is accessed we can get the user/:userId/profile data and access received_req_from to display all pending friend requests!
  // const filters = { members: [chatClient.user.id]}
  const sort = { last_message_at: -1 };
  const options = { limit: 10 }
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChannelClick = (chat) => {
    console.log('clicked', chat);
    setSelectedChat(chat);
  }

  if (props.isAuthenticated && props.chatOpen) {
    return (
      <Chat client={chatClient} theme='str-chat__theme-dark'  >
        <ChannelList  sort={sort} options={options} onClick={handleChannelClick} className="channels" />
        <Channel channel={selectedChat} >
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    )

  } else {
    return null;
  }
}

export default ChatApp;
