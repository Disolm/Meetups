import { httpClient } from './httpClient/httpClient.js';

/**
 * Загрузить изображение
 * @param {FormData} file - HTML File с изображением
 * @returns {Promise<ResultContainer<ImageDto>>}
 */
export function postImage(file) {
  // TO DO: реализовать функцию
  return httpClient.post('/images/upload', file);

}
