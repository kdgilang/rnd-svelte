import { json } from '@sveltejs/kit';
import { JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { updateUserRepository } from '$lib/data/repositories/userRepositories';

export const POST = async ({request}) => {
  try {
    const { waNumber, code } = await request.json();
  
    const user = await updateUserRepository({ waNumber, 'verification.code': code }, {
      verification: {
        code: '',
        status: true,
        date: Date.now()
      },
    });

    const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '3h' });

    return json({
      status: true,
      message: 'success',
      token,
      userId: user._id
    });
  } catch(error) {
    
    return json({
      status: false,
      message: 'The code you entered does not match the code we sent you.'
    });
  }
}