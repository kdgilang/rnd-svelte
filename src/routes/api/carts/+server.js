import { json } from '@sveltejs/kit';
import { JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { createCartRepository } from '$lib/data/repositories/cartRepositories';

export const POST = async ({request, cookies}) => {
  try {
    const token = cookies.get('userToken');
    const { user } = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

    if (!user) {
      throw Error('Access denied.');
    }

    const cart = await request.json();

    const cartModel = await createCartRepository(cart);

    if(cartModel?.error) {
      throw Error('Unable to create a new cart.');
    }

    return json({ status: true, message: 'success!', cartModel });
  } catch (err) {
    return json({ status: false, message: err.message });
  }
}