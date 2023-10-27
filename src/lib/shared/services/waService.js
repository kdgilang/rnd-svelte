import { waProvider } from "../providers/waProvider";

/**
 * @param {string} [phoneNumber]
 */
export const sendVerificationCodeService = async (phoneNumber) => {
  const requestBody = {
    to: `62${phoneNumber}`,
    type: 'template',
    template: {
      name: 'verification',
      language: {
        code: 'en_US'
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: '22342'
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
              text: '22342'
            }
          ]
        }
      ]
    }
  }
  
  return waProvider(requestBody)
}