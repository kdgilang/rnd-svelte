import { json } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { sendVerificationCodeService } from "$lib/shared/services/waServices";
import { connectDB, disconnectDB } from '$lib/data';
import dayjs from 'dayjs';

export const POST = async ({request}) => {
  try {
    const waNumber = await request.json();

    await connectDB();
  
    const user = await UsersModel.findOne({ waNumber }).exec();

    // validate: resend code every 60 seconds
    if (user?.verification?.date) {
      const vDate = dayjs(user?.verification?.date);
      const seconds = dayjs().diff(vDate, 'second');

      if (seconds < 60) {
        throw `Resend code available in (${60 - seconds}) seconds.`;
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

    if (user) {
      user.verification.code = code;
      user.verification.date = Date.now();
      await user.save();
    }

    await disconnectDB();

    return json(res)
  } catch (error) {
    return json({ error })
  }
}