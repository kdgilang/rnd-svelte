/** @type {import('./$types').PageServerLoad} */
// import { PUBLIC_LOCAL_API_HOST } from '$env/static/public';

import { getAllProductsRepository } from '$lib/data/repositories/productRepositories';

export async function load() {
	// const categories = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/categories.json`)).json();
	// const products = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/products.json`)).json();
  const products = JSON.stringify(await getAllProductsRepository() || []);

	return {
    products
	};
}
