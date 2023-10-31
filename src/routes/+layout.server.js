import { PUBLIC_LOCAL_API_HOST } from '$env/static/public';
import { JWT_SECRET_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { UsersModel } from '$lib/data/models/users';
import jwt from 'jsonwebtoken';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ route, cookies }) {
  UsersModel();

	const categories = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/categories.json`)).json();
  const token = cookies.get('userToken');
  const userData = jwt.verify(token, JWT_SECRET_KEY);

  // check if user session exists on signin page
	if (['/signin', '/verification'].indexOf(route.id) >= 0 && userData?.user) {
    throw redirect('302', '/');
	}

	return {
    user: userData.user,
		categories: categories?.results
	};
}
