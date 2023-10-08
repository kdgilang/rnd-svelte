<script>
  import { cartStore } from '$lib/shared/stores/cart';
	/** @type {import('./$types').PageData} */
	export let data;

  function handleRemoveCartItem(cartItem) {
    const newCart = $cartStore.items?.filter(item => item?.id !== cartItem?.id);
    cartStore.updateItems(newCart);
  }

  function handleOnChangeQty(cartItem) {
    const newCart = $cartStore.items?.map(item => item?.id === cartItem?.id ? {...item, qty: cartItem.qty } : item);
    cartStore.updateItems(newCart);
  }
</script>
<div class="pt-20">
  <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
  <div class="mx-auto container">
    <div class="w-100 mb-4">
      <a href="/" class="text-sm text-yellow hover:text-slate-200 transition flex items-center gap-2">
        <svg class="fill-yellow" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        Continue shoping
      </a>
    </div>
    <div class="flex justify-center gap-4">
      <div class="rounded-lg md:w-2/3">
        {#each $cartStore.items as item}
          <div class="justify-between mb-6 rounded text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 p-6 shadow-md sm:flex sm:justify-start">
            <img
              src={item?.product?.image}
              alt={`image of ${item?.product?.title}`}
              class="w-full rounded-lg sm:w-40"
            />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div class="mt-5 sm:mt-0">
                <h2 class="text-lg font-bold text-gray-900">{item?.product?.title}</h2>
                <p class="mt-1 text-xs">cream: {item?.cream?.title}</p>
                <p class="mt-1 text-xs">topping: {item?.topping?.title || '-'}</p>
              </div>
              <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div class="flex items-center gap-4">
                  <input type="number" id="qty" min="1" bind:value={item.qty} class="text-center bg-slate-200 dark:bg-slate-600 border border-slate-300 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-yellow focus:border-yellow block w-full p-2.5 dark:border-slate-700 dark:placeholder-slate-400">
                  <button
                    class="bg-yellow p-3 rounded hover:bg-black"
                    aria-label="delete cart item"
                    on:click={ () => handleRemoveCartItem(item) }>
                    <svg class="text-slate-200" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                  </button>
                </div>
                <div class="flex items-center">
                  <p class="text-lg text-green">{item?.product?.price?.idrFormatted}</p>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="text-center rounded text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 p-6 shadow-md">
            <p class="mb-4">No carts found.</p>
            <a href="/" class="rounded bg-yellow hover:bg-black transition px-4 py-2 text-black">Go shop</a>
          </div>
        {/each}
      </div>
      <!-- Sub total -->
      <div class="mt-6 h-full rounded text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 p-6 shadow-md md:mt-0 md:w-1/3">
        {#each $cartStore.items as item}
          <div class="mb-2 flex justify-between">
            <p>{item?.product?.title} - x {item.qty}</p>
            <p>{item?.product?.price.idrFormatted}</p>
          </div>
          <div class="mb-2 flex justify-between text-xs">
            <p>cream: {item?.topping?.title}</p>
            <p>{item?.topping?.price?.idrFormatted}</p>
          </div>
          <div class="mb-2 flex justify-between text-xs">
            <p>topping: {item?.cream?.title}</p>
            <p>{item?.cream?.price?.idrFormatted}</p>
          </div>
          <hr class="mb-2" />
        {/each}
        
        <div class="mb-2 flex justify-between">
          <p>Subtotal</p>
          <p>$129.99</p>
        </div>
        <div class="flex justify-between">
          <p>Shipping</p>
          <p>$4.99</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">$134.98 USD</p>
            <p class="text-sm">including VAT</p>
          </div>
        </div>
        <button
          class="mt-6 w-full rounded-md bg-yellow py-1.5 font-medium hover:bg-black text-black"
          >Check out</button
        >
      </div>
    </div>
  </div>
</div>

<style>
	/* @layer utilities {
		input[type='number']::-webkit-inner-spin-button,
		input[type='number']::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	} */
</style>
