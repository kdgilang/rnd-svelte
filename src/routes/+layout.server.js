import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { ProductsModel } from '$lib/data/models/products';
import { CartsModel } from '$lib/data/models/carts';
import { getCartsRepository } from '$lib/data/repositories/cartRepositories';
import { initWaWebProvider } from '$lib/shared/providers/waWebProvider';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ route, cookies }) {
  let userData;
  let carts;
  try {
    // Init schema collections
    UsersModel();
    ProductsModel();
    CartsModel();
    await initWaWebProvider();

    const token = cookies.get('userToken');

    userData = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

    if (userData?.user) {
      carts = JSON.parse(JSON.stringify(await getCartsRepository({ user: userData.user._id })));
    }

  } catch(err) {
    let errorMessage = err?.message;

    // expired token
    if (errorMessage?.includes('expired')) {
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
  if (route.id?.includes('users') && !userData?.user) {
    throw redirect('302', '/signin');
  }
  
  return {
    user: userData?.user,
    carts
  };
}
