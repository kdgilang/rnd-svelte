/** @type {import('./$types').LayoutServerLoad} */
import {PUBLIC_LOCAL_API_HOST} from '$env/static/public';

export async function load() {
  const categories = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/categories.json`)).json();
	
  return {
		categories: categories?.results,
	};  
}