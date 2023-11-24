import dayjs from 'dayjs';
import { json } from '@sveltejs/kit';
import { waProvider } from "$lib/providers/waProvider";
import { createOTPCode } from '$lib/utils/otpGenerator';
import { getUserByQueryRepository, updateUserRepository } from '$lib/data/repositories/userRepositories';

export const POST = async ({request}) => {
  try {
    const waNumber = await request.json();

    const user = await getUserByQueryRepository({ waNumber });
  
    // validate: resend code every 60 seconds
    if (user?.verification?.date) {
      const vDate = dayjs(user.verification.date);
      const seconds = dayjs().diff(vDate, 'second');
  
      if (seconds < 60) {
        throw Error(`Resend code available in (${60 - seconds}) seconds.`);
      }
    }

    const code = createOTPCode();
    const templateBody = templateOtp(waNumber, code);
    const res = await waProvider(templateBody);

    if(res?.error) {
      throw Error(res?.error?.message || res.error.error_data.details);
    }

    if (user) {
      await updateUserRepository({ _id: user._id }, {
        verification: {
          code,
          status: false,
          date: Date.now()
        }
      });
    }

    return json({ status: true, message: 'success!', waNumber });
  } catch (err) {
    return json({ status: false, message: err.message });
  }
}


const templateOtp = (waNumber, code) => ({
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
});