import { json } from '@sveltejs/kit';
import { sendVerificationCodeService } from "$lib/services/waServices";
import dayjs from 'dayjs';
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
  
    const minm = 100000;
    const maxm = 999999;
  
    const code = Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
  
    // send or resend code
    const res = await sendVerificationCodeService({
      waNumber,
      code
    });

    if (res?.error) {
      throw Error(res.error?.message);
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

    return json({ status: true, message: 'success!', res });
  } catch (error) {
    return json({ status: false, message: error.message });
  }
}