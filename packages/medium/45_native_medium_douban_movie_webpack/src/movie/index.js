import { createMovieTags } from './list';
import { getMovies } from '../api/movie';
import { createPagers } from './pager';

async function init() {
  const resp = await getMovies(1, 30);
  createMovieTags(resp.data.movieList); // 创建列表
  createPagers(1, 30, resp.data.movieTotal); // 创建分页区域
}

init();
