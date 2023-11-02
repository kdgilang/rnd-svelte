import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { ProductsModel } from '$lib/data/models/products';
import { CartsModel } from '$lib/data/models/carts';
import { getCartsRepository } from '$lib/data/repositories/cartRepositories';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ route, cookies }) {
  let userData;
  let carts;
  try {
    // Init schema collections
    UsersModel();
    ProductsModel();
    CartsModel();

    const token = cookies.get('userToken');

    userData = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

    if (userData?.user) {
      carts = await getCartsRepository({ user: userData.user._id });
    }

  } catch(err) {
    let errorMessage = err.message;

    // expired token
    if (err.message?.contains('expired')) {
      errorMessage = 'User session expired. Please <a href="/signin" class="text-yellow underline hover:opacity-25">singin</a> again.';
      cookies.delete('userToken');
    }

    return {
      errorMessage
    };
  }

  // check if user session exists on some pages
  if (['/signin', '/verification'].indexOf(route.id) >= 0 && userData?.user) {
    throw redirect('302', '/');
  }

  // check if user session not exists on some pages
  if (['/users/'].indexOf(route.id) >= 0 && !userData?.user) {
    throw redirect('302', '/signin');
  }
  
  return {
    user: userData?.user,
    carts
  };
}
