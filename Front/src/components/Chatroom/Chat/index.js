import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Chat = ({ author, content, isMine }) => (
  <div className={classNames('message-chat', { 'message-chat--is-mine': isMine })}>
    <div className="message-chat__author">{author}</div>
    <p className="message-chat__content">{content}</p>
  </div>
);

Chat.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
};

Chat.defaultProps = {
  isMine: true,
};

export default Chat;
