import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = new StreamChat('npwanznmku2q');
// const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicG9saXNoZWQtZ2xpdHRlci05In0.TAW3vlhl1ax6jQ4htt2-xJP4k8pih5ScZp_zcM-CbfI';
const userToken = chatClient.devToken('connor')

chatClient.connectUser(
  {
    id: 'connor',
    name: 'Connor Thurston',
    image: '',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'GamerCity', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'GamerCity Chat',
  members: ['connor', 'otherUser'],
});

const ChatApp = () => (
  <Chat client={chatClient} theme='str-chat__theme-light'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default ChatApp;
