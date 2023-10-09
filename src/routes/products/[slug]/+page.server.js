import { PUBLIC_LOCAL_API_HOST } from '$env/static/public';

export const load = async ({ params }) => {
  const products = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/products.json`)).json();
  const creams = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/creams.json`)).json();
  const toppings = await (await fetch(`${PUBLIC_LOCAL_API_HOST}/toppings.json`)).json();
  const product = products?.results.find(item => item.slug === params.slug);
  return {
    slug: params.slug,
    product,
    creams: creams?.results,
    toppings: toppings?.results
  }
}