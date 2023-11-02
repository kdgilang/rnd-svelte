import { PUBLIC_BASE_URL } from '$env/static/public';

const headers = {
  'Content-Type': 'application/json'
};

/**
 * @param {String} [path]
 * @param {String} [method]
 * @param {Object} [requestBody]
 */
export const localProvider = async (path, method, requestBody) => {

  return (await fetch(`${PUBLIC_BASE_URL}/api${path}`, {
    method,
    headers,
    body: JSON.stringify(requestBody)
  })).json()
}
  