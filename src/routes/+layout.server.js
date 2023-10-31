import { JWT_SECRET_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import jwt from 'jsonwebtoken';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ route, cookies }) {
  UsersModel();
  const token = cookies.get('userToken');
  const userData = token ? jwt.verify(token, JWT_SECRET_KEY) : '';

  // check if user session exists on signin page
	if (['/signin', '/verification'].indexOf(route.id) >= 0 && userData?.user) {
    throw redirect('302', '/');
	}

	return {
    user: userData?.user
	};
}
