import axios from 'axios';

export const fetchImg = async (query, numPage) => {
  const response = await axios.get(`https://pixabay.com/api/`, {
    method: 'get',
    params: {
      key: '33085035-b16638eb1fe5c5711fce4390a',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: numPage,
    },
  });
  return response.data.hits;
};
