export const FETCH_DISCUSSIONS = 'FETCH_DISCUSSIONS';
export const SAVE_DISCUSSIONS = 'SAVE_DISCUSSIONS';
export const SAVE_MESSAGES = 'SAVE_MESSAGES';
export const SET_NEW_MESSAGE_CONTENT = 'SET_NEW_MESSAGE_CONTENT';
export const SAVE_NEW_MESSAGE = 'SAVE_NEW_MESSAGE';
export const CLEAR_DISCUSSION = 'CLEAR_DISCUSSION';
export const FETCH_CORRESPONDANT_USERNAME = 'FETCH_CORRESPONDANT_USERNAME';
export const SAVE_CORRESPONDANT_DATA = 'SAVE_CORRESPONDANT_DATA';


export const LOAD_DISCUSSION = 'LOAD_DISCUSSION';
export const SAVE_DISCUSSION = 'SAVE_DISCUSSION';
export const FETCH_DISCUSSION = 'FETCH_DISCUSSION';
export const CREATE_DISCUSSION = 'CREATE_DISCUSSION';
export const SAVE_DISCUSSION_DATA = 'SAVE_DISCUSSION_DATA';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const FETCH_PUBLISHED_MESSAGE = 'FETCH_PUBLISHED_MESSAGE';

export const loadDiscussion = (correspondantId) => ({
  type: LOAD_DISCUSSION,
  correspondantId,
});

export const saveDiscussion = (userId, correspondantId) => ({
  type: SAVE_DISCUSSION,
  userId,
  correspondantId,
});

export const fetchDiscussion = (userId, correspondantId) => ({
  type: FETCH_DISCUSSION,
  userId,
  correspondantId,
});

export const createDiscussion = (userId, correspondantId) => ({
  type: CREATE_DISCUSSION,
  userId,
  correspondantId,
});

export const saveDiscussionData = (id, messages) => ({
  type: SAVE_DISCUSSION_DATA,
  id,
  messages,
});

export const sendMessage = () => ({
  type: SEND_MESSAGE,
});

export const fetchMessages = (discussionId) => ({
  type: FETCH_MESSAGES,
  discussionId,
});

export const fetchPublishedMessage = (discussionId) => ({
  type: FETCH_PUBLISHED_MESSAGE,
  credentials: true
})



export const fetchDiscussions = (userId) => ({
  type: FETCH_DISCUSSIONS,
  userId: 6,
});

export const saveDiscussions = (messages) => ({
  type: SAVE_DISCUSSIONS,
  userId: 6,
});


export const saveMessages = (messagesArray) => ({
  type: SAVE_MESSAGES,
  messagesArray,
});

export const setNewMessageContent = (message) => ({
  type: SET_NEW_MESSAGE_CONTENT,
  message,
});


export const saveNewMessage = (message) => ({
  type: SAVE_NEW_MESSAGE,
  message,
});

export const clearDiscussion = () => ({
  type: CLEAR_DISCUSSION,
});



export const fetchCorrespondantUsername = () => ({
  type: FETCH_CORRESPONDANT_USERNAME,
});

export const saveCorrespondantData = (user) => {
  // console.log('saveUserData', user);
  return {
    type: SAVE_CORRESPONDANT_DATA,
    user,
  };
};
