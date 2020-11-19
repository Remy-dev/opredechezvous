/* eslint-disable import/prefer-default-export */
/**
 * Fonction qui retourne un id supérieur à l'id max du tableau d'entrée
 * @param {array} items - tableau d'objet avec un id
 */
// export const getHighestId = (items) => {
//   const ids = items.map((item) => item.id);
//   const maxId = Math.max(...ids);

//   return maxId + 1;
// };

import slugify from 'slugify';

export const isAuthor = (author, pseudo) => author === pseudo;

export const slugifyText = (text = '') => {
  const modifiedText = text.replace(/&/g, '').replace(/_/g, '-');
  return slugify(modifiedText, {
    lower: true,
    remove: /@/g,
  });
};

export const changeDateFormat = (dateFormated) => {
  const newDate = new Date(dateFormated);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const middleDate = newDate.toLocaleDateString('de-DE', options);
  // eslint-disable-next-line camelcase
  const stepDate = middleDate.replace('.', '/').replace('.', '/');
  // eslint-disable-next-line camelcase
  return stepDate;
};

export const changeDateTime = (dateFormated) => {
  const newDate = new Date(dateFormated);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const middleDate = newDate.toLocaleDateString('ko-KR', options);
  // eslint-disable-next-line camelcase
  const stepDateTwo = middleDate.replace('.', '-').replace('.', '-');
  // eslint-disable-next-line camelcase
  return stepDateTwo;
};

// export const baseUriAPI = 'opdcv/back';
export const baseUriAPI = 'http://localhost:8000';
export const mercureUri = new URL('http://localhost:3000/.well-known/mercure');
