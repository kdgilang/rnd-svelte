import { PUBLIC_WA_API_HOST, PUBLIC_WA_API_TOKEN } from '$env/static/public';

const headers = {
  Authorization: `Bearer ${PUBLIC_WA_API_TOKEN}`,
  'Content-Type': 'application/json'
};

/**
 * @param {Object} [requestBody]
 */
export const waProvider = async (requestBody) => {
  const body = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    ...requestBody
  }

  return (await fetch(PUBLIC_WA_API_HOST, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })).json()
}
