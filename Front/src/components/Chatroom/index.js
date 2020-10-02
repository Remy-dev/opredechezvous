import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import EventSourcePolyfill from 'event-source-polyfill';

// Components
import Chat from 'src/containers/Chat';
import Form from 'src/containers/Chatroom/Form';

// STYLES
import './styles.scss';

const Chatroom = ({
  messages,
  slug,
  userId,
  correspondantId,
  fetchDiscussion,
}) => {
  // console.log(userId, addresseeIri);
  useEffect(() => fetchDiscussion(userId, correspondantId), []);
  useEffect(() => {
    // const url = new URL('http://localhost:8000/api/messages')
    const url = new URL('http://localhost:3000/.well-known/mercure');
    url.searchParams.append('topic', 'http://localhost:8000/api/messages');

   const eventSource = new EventSource(url, {withCredentials: true});


    // The callback will be called every time an update is published
    eventSource.onmessage = (e) => console.log(e); // do something with the payload
    eventSource.close();
  }, []);
  return (
  <div className="chatroom">
    <div>
      {messages.map((message) => (
        <Chat key={message.id} author={message.author} content={message.content} isMine />
      ))}
    </div>
    <Form />
  </div>
);
};
Chatroom.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  userId: PropTypes.number.isRequired,
  correspondantId: PropTypes.string,
  fetchDiscussion: PropTypes.func.isRequired,
};

Chatroom.defaultProps = {
  messages: [],
  correspondantId: null,
};

export default Chatroom;
