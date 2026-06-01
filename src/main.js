import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = e.target['search-text'].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  loadMoreBtn.style.visibility = 'hidden';
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const loaded = currentPage * 15;
    if (loaded < totalHits) {
      loadMoreBtn.style.visibility = 'visible';
    } else {
      loadMoreBtn.style.visibility = 'hidden';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loadMoreBtn.style.visibility = 'hidden';
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const card = document.querySelector('.gallery a');
    if (card) {
      const { height } = card.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }

    const loaded = currentPage * 15;
    if (loaded < totalHits) {
      loadMoreBtn.style.visibility = 'visible';
    } else {
      loadMoreBtn.style.visibility = 'hidden';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
