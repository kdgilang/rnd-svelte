<script>
	import Image from '$lib/shared/components/elements/image/template.svelte'
	import { createCartService } from '$lib/shared/services/cartServices';
	import { cartStore } from '$lib/shared/stores/cart';
	import { priceFormatted } from '$lib/shared/utils/priceFormatted';
	import { getContext } from 'svelte';
  import './style.scss';
	import Stretch from 'svelte-loading-spinners/Stretch.svelte';

	/**
	 * @typedef CardType
	 * @type {Object}
	 * @property {string} [name]
	 * @property {string} [description]
	 * @property {string} [category]
	 * @property {string[]} [images]
	 */

	/**
	 * @param {CardType} product
	 */
	export let product;

  let showModal;
  let dialog;
  let note;
  let quantity = 1;
  let isBusy = false;

  const user = getContext('user');

  $: if (dialog && showModal) dialog.showModal();

  const handleFormSubmit = async () => {
    if (isBusy) return;
    isBusy = true;
    const cartItems = [
      ...$cartStore.items,
      {
        id: new Date().getTime(),
        quantity,
        note,
        product
      }
    ];

    cartStore.updateItems(cartItems);
    
    if (user?._id) {
      
      try {
        const cart = await createCartService({
          user: user._id,
          quantity,
          note,
          product: product._id
        });
      } catch(err) {
        console.log(err);
      }
    }

    isBusy = false;

    dialog.close();
  }
</script>

<div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg bg-white text-slate-900 dark:text-slate-100 shadow-md dark:bg-slate-900">
  <div class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
    <Image src={product?.images?.[0]} alt={`image of ${product?.name}`}/>
    <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">20% OFF</span>
  </div>
  <div class="mt-4 px-5 pb-5">
    <h5 class="text-xl tracking-tight">{product?.name}</h5>
    <div class="mt-2 mb-5">
      <span class="text-2xl font-bold">{priceFormatted(product?.price)}</span>
      <div class="flex justify-between">
        <span class="text-sm line-through">{priceFormatted(product?.price + 2000)}</span>
        <div class="flex items-center">
          <svg aria-hidden="true" class="h-5 w-5 text-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg aria-hidden="true" class="h-5 w-5 text-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg aria-hidden="true" class="h-5 w-5 text-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg aria-hidden="true" class="h-5 w-5 text-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg aria-hidden="true" class="h-5 w-5 text-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span class="mr-2 ml-3 rounded bg-yellow px-2.5 py-0.5 text-xs font-semibold">5.0</span>
        </div>
      </div>
    </div>
    <button
      on:click|preventDefault={() => showModal = true }
      class="w-full flex items-center transition justify-center rounded-md bg-yellow px-5 py-2.5 text-center text-sm font-medium text-slate-900 hover:opacity-75 focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    Add to cart</button>
  </div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 w-1/2"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<form action="" on:submit|preventDefault={handleFormSubmit}>
      <div class="w-full mb-4">
        <label for="quantity" class="block mb-2 text-sm font-medium">Quantity</label>
        <input
          type="number"
          id="quantity"
          min="1"
          bind:value={quantity}
          class="bg-slate-200 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-yellow focus:border-yellow block w-full p-2.5 dark:border-slate-700 dark:placeholder-slate-400"
        />
      </div>
      <div class="w-full mb-4">
        <label for="note" class="block mb-2 text-sm font-medium">Note</label>
        <input
          type="text"
          id="note"
          placeholder="No sugar..."
          bind:value={note}
          class="bg-slate-200 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-yellow focus:border-yellow block w-full p-2.5 dark:border-slate-700 dark:placeholder-slate-400"
        />
      </div>

			<!-- svelte-ignore a11y-autofocus -->
			<div class="flex justify-end items-center gap-4">
				<button
					class="rounded h-10 bg-black px-5 border-0 inline-flex items-center hover:bg-opacity-75 justify-center transition text-white"
					on:click|preventDefault={() => dialog.close()}>Cancel</button
				>

				<button
					autofocus
					class="text-black rounded h-10 bg-yellow px-5 border-0 inline-flex items-center hover:bg-opacity-75 justify-center transition"
				>
					Add
				</button>

        {#if isBusy}
          <div class="flex justify-center">
            <Stretch size="55" color="#FFA31A" unit="px" duration="1s" />
          </div>
        {/if}
			</div>
		</form>
	</div>
</dialog>