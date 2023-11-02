import { json } from '@sveltejs/kit';
import { createCartRepository } from '$lib/data/repositories/cartRepositories';

export const POST = async ({request}) => {
  try {
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