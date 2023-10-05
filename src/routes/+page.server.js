/** @type {import('./$types').PageServerLoad} */
import { LOCAL_API_HOST } from '$env/static/private';
export async function load() {
  const categories = await (await fetch(`${LOCAL_API_HOST}/categories.json`)).json();
  const products = await (await fetch(`${LOCAL_API_HOST}/products.json`)).json();

  return {
    categories: categories?.results,
    products: products?.results
  };
}