import axios from 'axios';

const API_KEY = '56077039-3a5cc0c41ca2a13984a31b614';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      //   per_page: 15,
    },
  });
  return data;
}
