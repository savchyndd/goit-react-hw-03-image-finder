import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31107721-7ee60bad5b686af5fdf0a833c';

export async function fetchGalleryItems(query, page) {
  const OPTIONS = new URLSearchParams({
    key: API_KEY,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${OPTIONS.toString()}`);
  return response.data;
}

fetchGalleryItems.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
