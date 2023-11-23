/** @type {import('./$types').PageServerLoad} */
import { getAllProductsRepository } from '$lib/data/repositories/productRepositories';

export async function load() {
  const products = JSON.stringify(await getAllProductsRepository() || []);

	return {
    products
	};
}
