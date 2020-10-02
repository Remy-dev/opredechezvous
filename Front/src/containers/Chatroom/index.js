// la fonction connect va créer un HOC : High Order Component
import { connect } from 'react-redux';
import Chatroom from 'src/components/Chatroom';

// Action creators
import {
  fetchDiscussion,
} from 'src/actions/messages';

// Map...
const mapStateToProps = (state) => ({
  messages: state.messages.discussion.messages,
  // userId: state.auth.user.id,
  userId: state.auth.user.id,
  correspondantId: state.messages.discussion.correspondantId,
  inputValue: state.messages.newMessageContent,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDiscussion: (userId, correspondantId) => dispatch(fetchDiscussion(userId, correspondantId)),
});

// const componentToConnect = connect(mapStateToProps, mapDispatchToProps);
// const connectedComponent = componentToConnect(Messages);
// export default connectedComponent;

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
