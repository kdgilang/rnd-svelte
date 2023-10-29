import { waProvider } from "../providers/waProvider";

/**
 * @param {string} [phoneNumber]
 */
export const sendVerificationCodeService = async (phoneNumber) => {
  var minm = 100000;
  var maxm = 999999;

  const code = Math.floor(Math
  .random() * (maxm - minm + 1)) + minm;

  const requestBody = {
    to: `62${phoneNumber}`,
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
  
  const {contacts} = await waProvider(requestBody);
  
  return { waNumber: contacts?.[0].input, code }
}