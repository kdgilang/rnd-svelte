/** @type {import('./$types').PageServerLoad} */
import { PUBLIC_LOCAL_API_HOST } from '$env/static/public';

export async function load() {
	const categories = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/categories.json`)).json();
	const products = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/products.json`)).json();

	return {
		categories: categories?.results,
		products: products?.results
	};
}
