import { waProvider } from "$lib/shared/providers/waProvider";
import { initWaWebProvider } from '$lib/shared/providers/waWebProvider';

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
    // const res = await waProvider(requestBody);

    const waWebProvider = await initWaWebProvider();
    const msgBody = `${code} is your verification code.\nFor your security, do not share this code.`;
    // const template = new Buttons(msgBody, [{ id:'customId', body: 'bt1' }], 'OTP', 'This code expires in 15 minutes.');
    const wa = await waWebProvider.getNumberId(waNumber);

    if (!wa?._serialized) {
      throw 'Phone number is unavailable on Whatsapp.';
    }

    const res = await waWebProvider.sendMessage(wa?._serialized, msgBody);

    if(res?.error) {
      throw res?.error?.message || res.error.error_data.details;
    }

    return { waNumber }
  } catch (error) {
    return { error };
  }
}