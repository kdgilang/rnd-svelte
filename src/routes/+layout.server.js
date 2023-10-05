/** @type {import('./$types').LayoutServerLoad} */
import {LOCAL_API_HOST} from '$env/static/private';
export async function load() {
  const categories = await (await fetch(`${LOCAL_API_HOST}/categories.json`)).json();
	
  return {
		categories: categories?.results,
	};  
}