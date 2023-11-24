import {
  FLIP_API_HOST,
  FLIP_API_KEY
} from '$env/static/private';

/**
 * @param {String} [path]
 * @param {String} [method]
 * @param {Object} [requestBody]
 */
export const flipProvider = async (path, method, requestBody) => {

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', `Basic ${btoa(FLIP_API_KEY)}:`);

  let requestOptions = {
    method,
    headers
  };

  if (method === 'POST') {
    requestOptions = {
      ...requestOptions,
      body: new URLSearchParams(requestBody).toString(),
      redirect: 'follow'
    }
  }

  return (await fetch(`${FLIP_API_HOST}${path}`, requestOptions)).json();
}
  