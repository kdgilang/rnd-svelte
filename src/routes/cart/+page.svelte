<script>
	import { cartStore } from '$lib/shared/stores/cart';
	import { priceFormatted } from '$lib/shared/utils/priceFormatted';
	import Stretch from 'svelte-loading-spinners/Stretch.svelte';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { payService } from '$lib/shared/services/paymentServices';

	let isBusy = false;
	let subtotalAmount = 0;
	let totalAmount = 0;
  let error = '';
	const shipping = 10000;

  const user = getContext('user');

	function handleRemoveCartItem(cartItem) {
		const newCart = $cartStore.items?.filter((item) => item?.id !== cartItem?.id);
		cartStore.updateItems(newCart);
	}

	$: {
		subtotalAmount = $cartStore?.items?.reduce((prev, item) => 
      prev + (item?.product?.price * item.quantity), 0
		);

		totalAmount = subtotalAmount ? (subtotalAmount + shipping) : 0;
	}

	async function handleOnClickCheckout() {
		if (isBusy) return;

    if (!user?._id) {
      goto('/signin?r=/cart');
      return;
    }

		isBusy = true;

		try {
			const res = await payService();

      if (!res?.status) {
        throw Error(res?.message);
      }

			window.location.href = `https://${res.link_url}`;
		} catch (err) {
      error = err;
		} finally {
			isBusy = false;
		}
	}
</script>

<h1 class="mb-10 text-center text-2xl font-bold text-slate-700 dark:text-slate-500">Cart Items</h1>
<div class="mx-auto container">
  <div class="w-100 mb-4">
    <a
      href="/"
      class="text-sm text-yellow hover:text-slate-200 transition flex items-center gap-2"
    >
      <svg
        class="fill-yellow"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 320 512"
        ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
          d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        /></svg
      >
      Continue shoping
    </a>
  </div>

  {#if error}
  <div id="alert-2" class="flex items-center p-4 mb-4 text-slate-100 rounded-md bg-red/60" role="alert">
    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">Info</span>
    <div class="ml-3 text-sm font-medium">
      {error}
    </div>
    <button on:click={() => error = ''} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-md focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>
  </div>
  {/if}
  <div class="flex justify-center gap-4">
    <div class="rounded-lg md:w-2/3">
      {#each $cartStore.items as item}
        <div
          class="justify-between mb-6 rounded text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 p-6 shadow-md sm:flex sm:justify-start"
        >
          <img
            src={item?.product?.images?.[0]}
            alt={`image of ${item?.product?.name}`}
            class="w-full rounded-lg sm:w-40"
          />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
              <h3 class="text-lg font-bold text-gray-900">{item?.product?.name}</h3>
              <p class="mt-1 text-xs">
                note: {item?.note}
              </p>
            </div>
            <div
              class="mt-4 pl-2 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
            >
              <div class="flex items-center gap-4">
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  bind:value={item.quantity}
                  class="text-center bg-slate-200 dark:bg-slate-600 border border-slate-300 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-yellow focus:border-yellow block w-full p-2.5 dark:border-slate-700 dark:placeholder-slate-400"
                />
                <button
                  class="bg-yellow p-3 rounded hover:bg-black hover:fill-slate-200 transition"
                  aria-label="delete cart item"
                  on:click={() => handleRemoveCartItem(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                    /></svg
                  >
                </button>
              </div>
              <div class="flex items-center justify-end">
                <p class="text-lg text-green">{priceFormatted(item?.product?.price)}</p>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <div
          class="text-center rounded text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 p-6 shadow-md"
        >
          <p class="mb-4">No carts found.</p>
          <a href="/" class="rounded bg-yellow hover:opacity-25 transition px-4 py-2 text-black"
            >Go shop</a
          >
        </div>
      {/each}
    </div>
    <!-- Sub total -->
    <div
      class="mt-6 h-full rounded text-slate-700 dark:text-slate-500 bg-white dark:bg-slate-900 p-6 shadow-md md:mt-0 md:w-1/3"
    >
      {#each $cartStore.items as item}
        <div class="mb-2 flex justify-between">
          <p>
            {item?.product?.name} x {item.quantity}<br />
            <small>note: {item?.note}</small>
          </p>
          <p>
            {priceFormatted(
              (item?.product?.price) *
                item.quantity
            )}
          </p>
        </div>
        <hr class="my-4" />
      {/each}

      <div class="mb-2 flex justify-between">
        <p>SubtotalAmount</p>
        <p>{priceFormatted(subtotalAmount)}</p>
      </div>
      <div class="flex justify-between">
        <p>Shipping</p>
        <p>{ totalAmount ? priceFormatted(shipping) : '-' }</p>
      </div>
      <hr class="my-4" />
      <div class="flex justify-between">
        <p class="text-lg font-bold">Total</p>
        <div class="">
          <p class="mb-1 text-lg font-bold">{priceFormatted(totalAmount)}</p>
          <p class="text-sm">including VAT</p>
        </div>
      </div>
      <div class="flex items-center gap-3 mt-6 transition">
        <button
          class="w-full rounded-md bg-yellow py-1.5 font-medium hover:bg-black text-black hover:text-slate-200 transition disabled:bg-yellow disabled:text-white disabled:opacity-25"
          disabled={isBusy || !totalAmount }
          on:click|preventDefault={handleOnClickCheckout}
        >
          Check out
        </button>
        {#if isBusy}
          <Stretch size="55" color="#FF3E00" unit="px" duration="1s" />
        {/if}
      </div>
    </div>
  </div>
</div>