import { json } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { connectDB, disconnectDB } from '$lib/data';

export const POST = async ({request}) => {
  try {
    const { waNumber, code } = await request.json();

    await connectDB();
  
    const user = await UsersModel.findOne({ waNumber, 'verification.code': code }).exec();
  
    await disconnectDB();
  
    if (user) {
      user.verification.code = '';
      user.verification.status = true;
      user.updated_date = Date.now();
      user.verification.date = Date.now();
      await user.save();
  
      return json({ status: true, message: 'success' });
    } else {
      return json({ status: false, message: 'Not Found' });
    }
  } catch(err) {
    return json({ status: false, message: err });
  }
}