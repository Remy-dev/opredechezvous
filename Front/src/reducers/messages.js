import {
  SAVE_DISCUSSION,
  SAVE_DISCUSSION_DATA,


  SAVE_MESSAGES,
  SET_NEW_MESSAGE_CONTENT,
  SAVE_NEW_MESSAGE,
  CLEAR_DISCUSSION,
  SAVE_DISCUSSIONS,
  SAVE_CORRESPONDANT_DATA,
} from 'src/actions/messages';

const initialState = {
  discussion: {
    messages: [],
    correspondantId: null,
    userId: null,
    id: null,
  },
  discussions: [],
  newMessageContent: '',
};

const messages = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_DISCUSSION:
      // console.log(SAVE_DISCUSSION);
      return {
        ...state,
        discussion: {
          messages: [],
          correspondantId: action.correspondantId,
          userId: action.userId,
        },
      };
    case SAVE_DISCUSSION_DATA:
      console.log(SAVE_DISCUSSION_DATA, action.id, action.messages);
      return {
        ...state,
        discussion: {
          ...state.discussion,
          messages: action.messages,
          id: action.id,
        },
      };


    case SET_NEW_MESSAGE_CONTENT:
      return {
        ...state,
        newMessageContent: action.message,
      };
    case SAVE_MESSAGES:
      let newMessages = [];
      if (state.discussion.messages) {
        newMessages = state.discussion.messages;
      }
      action.messagesArray.forEach((message) => newMessages.push(message));

      return {
        ...state,
        discussion: {
          ...state.discussion,
          messages: newMessages,
        },
      };
    case SAVE_NEW_MESSAGE:
      newMessages = [];
      if (state.discussion.messages) {
        newMessages = state.discussion.messages;
      }
      newMessages.push(action.message);
      return {
        ...state,
        discussion: {
          ...state.discussion,
          messages: newMessages,
        },
        newMessageContent: '',
      };
    case CLEAR_DISCUSSION:
      return {
        ...state,
        discussion: {
          messages: [],
          addressee: {
            iri: null,
            firstname: '',
          },
          author: {
            iri: null,
            firstname: '',
          },
        },
      };

    case SAVE_CORRESPONDANT_DATA:
      // console.log (SAVE_CORRESPONDANT_DATA, action.user);
      const allDiscussions = state.discussions;
      allDiscussions.forEach((discussion) => {
        // console.log(discussion);
        if (discussion.correspondantIri === action.user['@id']) {
          discussion.correspondantUsername = action.user.username;
        }
      });
      console.log(allDiscussions);
      return {
        ...state,
        discussions: allDiscussions,
      };
    case SAVE_DISCUSSIONS:
      // console.log(SAVE_DISCUSSIONS);
      // Retrieve all saved messages
      const allMessages = state.discussion.messages;
      // console.log('allMessages', allMessages);
      // Sort messages in a new array, by correspondant and date
      let workingObject = {};
      const newDiscussions = [];

      allMessages.forEach((message) => {
        const author = message.author;
        const addressee = message.addressee;
        // Determines who is the correspondant (vs the connected user)
        let correspondant = '';
        if (`/api/users/${action.userId}` === author) {
          correspondant = addressee;
        }
        if (`/api/users/${action.userId}` === addressee) {
          correspondant = author;
        }
        // If correspondant isn't user himself, we save messages in an object, by correspondant
        if (correspondant !== `/api/users/${action.userId}`) {
          if (workingObject[correspondant]) {
            workingObject[correspondant] = [
              ...workingObject[correspondant],
              message,
            ];
          }
          else {
            workingObject[correspondant] = [message];
          }
        }
        // console.log('workingObject', workingObject);
      });

      // Now, from the sorted messages, we get an array of last message for each discussion
      Object.entries(workingObject).forEach((objectEntry) => {
        let moreRecentMessage = {};
        // console.log('la propriété', objectEntry[0]);
        // console.log('les messages associés', objectEntry[1]);
        // console.log('type', typeof objectEntry[1][0]);
        // console.log('date ?', Date(objectEntry[1][0]));
        objectEntry[1].forEach((mess) => {
          if (moreRecentMessage === {}) {
            moreRecentMessage = mess;
          }
          else if (Date(mess.createdAt) >= Date(moreRecentMessage.createdAt)) {
            moreRecentMessage = mess;
            // console.log(moreRecentMessage);
          }
        });
        // console.log('morerecent', moreRecentMessage);
        newDiscussions.push({
          correspondantUsername: '',
          correspondantIri: objectEntry[0],
          moreRecentMessage,
        });
      });
      // console.log(newDiscussions);

      return {
        ...state,
        discussions: newDiscussions,
      };
    default:
      return state;
  }
};

export default messages;
