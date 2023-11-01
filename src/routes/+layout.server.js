import { JWT_SECRET_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import { ProductsModel } from '$lib/data/models/products';
import jwt from 'jsonwebtoken';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ route, cookies }) {
  try {
    // Init schema collections
    UsersModel();
    ProductsModel();

    const token = cookies.get('userToken');
    const userData = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

    // check if user session exists on some pages
    if (['/signin', '/verification'].indexOf(route.id) >= 0 && userData?.user) {
      throw redirect('302', '/');
    }

    // check if user session not exists on some pages
    if (route.id.includes(['/users']) && !userData?.user) {
      throw redirect('302', '/signin');
    }

    return {
      user: userData?.user
    };
  } catch(err) {
    let errorMessage = err.message;
    // expired token
    if (err.message.includes('expired')) {
      errorMessage = 'User session expired. Please <a href="/signin" class="text-yellow underline hover:opacity-25">singin</a> again.';
      cookies.delete('userToken');
    }

    return {
      errorMessage
    };
  }
}
