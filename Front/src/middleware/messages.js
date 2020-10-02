import axios from 'axios';

import {
  LOAD_DISCUSSION,
  FETCH_DISCUSSION,
  CREATE_DISCUSSION,
  saveDiscussionData,
  sendMessage,
  fetchMessages,
  FETCH_MESSAGES,

  FETCH_DISCUSSIONS,
  saveDiscussions,
  saveMessages,
  SEND_MESSAGE,
  saveNewMessage,
  clearDiscussion,
  fetchCorrespondantUsername,
  FETCH_CORRESPONDANT_USERNAME,
  saveCorrespondantData,
  saveDiscussion,
  createDiscussion,
} from 'src/actions/messages';

import { baseUriAPI, mercureUri } from 'src/selectors';
const messages = (store) => (next) => (action) => {
  switch (action.type) {
    case LOAD_DISCUSSION:
      const userId = store.getState().auth.user.id;
      // console.log(userId, action.correspondantId);
      store.dispatch(saveDiscussion(userId, action.correspondantId));
      break;
    case FETCH_DISCUSSION:
      // store.dispatch(clearDiscussion());
      console.log(action.userId, action.correspondantId);
      axios
        .get(`${baseUriAPI}/api/discussions`, {
          params: {
            users: [
              `/api/users/${action.userId}`,
              `/api/users/${action.correspondantId}`,
            ],
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.jwt}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          // console.log(response.data['hydra:member'][0]);
          if (response.data['hydra:member'].length === 0) {
            store.dispatch(createDiscussion(action.userId, action.correspondantId));
          }
          else {
            // A déplacer dans fetchMessages
            // store.dispatch(saveDiscussionData(response.data['hydra:member'][0].id, []));
            store.dispatch(fetchMessages(response.data['hydra:member'][0].id));
          }
        })
        .catch((error) => console.log(error));
      break;
    case CREATE_DISCUSSION:
      axios
        .post(`${baseUriAPI}/api/discussions`, {
          users: [
            `/api/users/${action.userId}`,
            `/api/users/${action.correspondantId}`,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.jwt}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => store.dispatch(saveDiscussionData(response.data.id, [])))
        .catch((error) => console.log(error));
      break;
    case SEND_MESSAGE:
      // axios.post(`${baseUriAPI}/api/messages`, {
      axios.post(`${baseUriAPI}/api/messages`,
        {
          content: store.getState().messages.newMessageContent,
          conversation: `api/discussions/${store.getState().messages.discussion.id}`,
          author: `/api/users/${store.getState().messages.discussion.userId}`,
        },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          // token payload publish seulement
          // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.0S7oqFD_TySGD3c5toDmyYLzIXvi6CreEtkNimwJEZo',
          // token payload publish et subscribe
          // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InN1YnNjcmliZSI6WyIqIl0sInB1Ymxpc2giOlsiKiJdfX0.kOWHpYlsTs9-AQ9CTyAmm1vcZSv7Zb23Q8lx8UHEJ4I'
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }})
        .then((response) =>
          console.log(response.data)
        )
        .catch((error) => console.log(error));
      break;

    case FETCH_MESSAGES:
      console.log(FETCH_MESSAGES);
      axios
        .get(`${baseUriAPI}/api/messages`, {
          params: {
            conversation: `/api/discussions/${action.discussionId}`,
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.jwt}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          // console.log(response.data['hydra:member']);
          store.dispatch(saveDiscussionData(action.discussionId, response.data['hydra:member']));
        })
        .catch((error) => console.log(error));
      break;
    default:
      next(action);
  }
};

export default messages;
