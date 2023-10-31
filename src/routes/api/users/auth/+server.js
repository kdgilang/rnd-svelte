import { json } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { createUserRepository, sendVerificationRepository } from "$lib/data/repositories/userRepositories";
import { connectDB, disconnectDB } from '$lib/data';

export const POST = async ({request}) => {
  try {
    const { name, waNumber } = await request.json();
    
    const res = await sendVerificationRepository(waNumber);

    if (res?.error) {
      throw res?.error;
    }

    // await connectDB();
    // const user = await UsersModel.findOne({ waNumber }).exec();

    await createUserRepository({
      name,
      waNumber: res.waNumber,
      verification: {
        status: false,
        code: res.code
      }
    });

    // if (resUser?.keyPattern && !user?.verification?.code) {
    //   user.verification.code = res.code;
    //   await user.save();
    // }

    // await disconnectDB();

    return json({ status: true, message: 'success', waNumber });
  } catch (err) {
    return json({ status: false, message: err });
  }
}