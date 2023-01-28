import React from 'react';
import { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

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

// let request = chatClient.sendUserCustomEvent('connor', {
//   type: 'friendship_request',
//   text: 'Joaquin wants to be your friend',
// });

const ChatApp = (props) => {
  console.log('chat', props.isAuthenticated, props.chatOpen);
  console.log(chatClient.user.id)
  // console.log(request)
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
        <ChannelList  sort={sort} options={options} onClick={handleChannelClick}/>
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
