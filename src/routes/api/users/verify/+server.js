import { json } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { connectDB, disconnectDB } from '$lib/data';
import { JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
// import Cookies from 'js-cookie';

export const POST = async ({request, cookies}) => {
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

      const token = jwt.sign({ ...user }, JWT_SECRET_KEY, { expiresIn: '3h' });
      cookies.set('userToken', token, {
        path: '/',
        maxAge: 60 * 60 * 3,
        httpOnly: true,
      });

      // var decoded = jwt.verify(token, 'shhhhh');
      // console.log(decoded.foo)
  
      return json({ status: true, message: 'success' });
    } else {
      return json({ status: false, message: 'Not Found' });
    }
  } catch(err) {
    return json({ status: false, message: err });
  }
}