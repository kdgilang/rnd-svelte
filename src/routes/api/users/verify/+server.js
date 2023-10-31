import { json } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { connectDB, disconnectDB } from '$lib/data';
import { JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

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

      const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '3h' });
  
      return json({ status: true, message: 'success', token, userId: user._id });
    } else {
      throw 'Not Found';
    }
  } catch(error) {
    return json({ error });
  }
}