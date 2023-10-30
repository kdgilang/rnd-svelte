import { json } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { sendVerificationCodeService } from "$lib/shared/services/waServices";
import { connectDB, disconnectDB } from '$lib/data';

export const POST = async ({request}) => {
  try {
    const waNumber = await request.json();

    await connectDB();
  
    const user = await UsersModel.findOne({ waNumber }).exec();
  
    await disconnectDB();
  
    var minm = 100000;
    var maxm = 999999;
  
    const code = Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
  
    // send or resend code
    const res = await sendVerificationCodeService({
      waNumber,
      code: user?.verification?.code || code
    });

    return json(res)
  } catch (err) {
    return json(err)
  }
}