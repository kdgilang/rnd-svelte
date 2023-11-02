import { json } from '@sveltejs/kit';
import { JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { createCartRepository } from '$lib/data/repositories/cartRepositories';

export const POST = async ({request, cookies}) => {
  try {
    const token = cookies.get('userToken');
    const { user } = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

    if (!user) {
      throw 'Access denied.';
    }

    const cart = await request.json();

    const cartModel = await createCartRepository(cart);

    if(cartModel?.error) {
      throw 'Unable to create a new cart.';
    }

    return json(cartModel);
  } catch (err) {
    return json(err);
  }
}