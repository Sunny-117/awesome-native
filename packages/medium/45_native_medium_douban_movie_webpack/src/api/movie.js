import axios from 'axios';

export async function getMovies(page, limit) {
  const resp = await axios.get('/api/movies', {
    params: {
      page,
      size: limit,
    },
  });
  return resp.data;
}
