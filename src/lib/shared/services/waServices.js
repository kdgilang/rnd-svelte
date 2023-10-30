import { waProvider } from "../providers/waProvider";

/**
 * @param {string} [waNumber]
 */
export const sendVerificationCodeService = async ({ waNumber, code }) => {
  const requestBody = {
    to: `${waNumber}`,
    type: 'template',
    template: {
      name: 'verification_code',
      language: {
        code: 'en_US'
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: code
            }
          ]
        },
        {
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [
            {
              type: 'text',
              text: code
            }
          ]
        }
      ]
    }
  }

  try {
    const res = await waProvider(requestBody);

    if(res?.error) {
      throw res?.error?.message || res.error.error_data.details;
    }

    return { waNumber: res?.contacts?.[0].input, code }
  } catch (error) {
    return { error };
  }
}