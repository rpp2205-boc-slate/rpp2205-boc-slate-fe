import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

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

channel.sendEvent({
  type: "friendship_request",
  text: "Hey there, long time no see!",
  user: 'otherUser'
});

const ChatApp = (props) => {
  console.log('chat', props.isAuthenticated, props.chatOpen);
  console.log(chatClient.user.id)
  const filters = { members: [chatClient.user.id]}
  const sort = { last_message_at: -1 };
  const options = { limit: 10 }
  if (props.isAuthenticated) {
    return (
      <Chat client={chatClient} theme='str-chat__theme-dark'>
        <ChannelList filters={filters} sort={sort} options={options} />
        <Channel channel={channel}>
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
