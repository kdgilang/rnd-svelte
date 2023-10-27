import { PUBLIC_LOCAL_API_HOST } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ route, cookies }) {
	const categories = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/categories.json`)).json();

  // check if user session exists on signin page
	if (['/signin'].indexOf(route.id) >= 0 && cookies.get('user')) {
    throw redirect('302', '/');
	}

	return {
		categories: categories?.results
	};
}
