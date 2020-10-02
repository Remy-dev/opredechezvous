import axios from 'axios';

import {
  FETCH_TAGS,
  saveTag,
} from 'src/actions/tags';

import { baseUriAPI } from 'src/selectors';

const tags = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TAGS:
      // console.log(action.tagsIriArray, action.producerId);
      action.tagsIriArray.forEach((iri) => {
        axios.get(`${baseUriAPI}${iri}`, {}, { 'Content-Type': 'application/json' })
          .then((response) => store.dispatch(saveTag(response.data, action.producerId)))
          .catch((error) => console.log(error));
      });
      break;
    default:
      next(action);
  }
};

export default tags;
