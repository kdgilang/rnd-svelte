<script>
	import { cartStore } from '$lib/shared/stores/cart';
	import { priceFormatted } from '$lib/shared/utils/priceFormatted';
	import Stretch from 'svelte-loading-spinners/Stretch.svelte';
	import {
    PUBLIC_BASE_URL,
		PUBLIC_FLIP_API_HOST,
		PUBLIC_FLIP_API_KEY,
		PUBLIC_LOCAL_API_HOST
	} from '$env/static/public';
	import { dateFormatted } from '$lib/shared/utils/dateFormatted';

	let isBusy = false;
	let subtotalAmount = 0;
	let totalAmount = 0;
	const shipping = 10000;

	function handleRemoveCartItem(cartItem) {
		const newCart = $cartStore.items?.filter((item) => item?.id !== cartItem?.id);
		cartStore.updateItems(newCart);
	}

	$: {
		$cartStore?.items?.map((item) => {
			subtotalAmount +=
				(item?.product?.price?.amount + item?.topping?.price?.amount + item?.cream?.price?.amount) *
				item.qty;
		});

		totalAmount = subtotalAmount ? (subtotalAmount + shipping) : 0;
	}

	async function handleOnClickCheckout() {
		if (isBusy) return;

		isBusy = true;

		try {
			const payload = {
				title: 'Berbuah bill',
				amount: totalAmount,
				type: 'SINGLE',
				expired_date: dateFormatted(new Date(Date.now() + 8 * (60 * 60 * 1000))),
				redirect_url: `${PUBLIC_BASE_URL}/payment-status`,
				is_address_required: 0,
				is_phone_number_required: 1
			};

      console.log(payload)

			const myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
			myHeaders.append('Authorization', `Basic ${btoa(PUBLIC_FLIP_API_KEY)}:`);

			const requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: new URLSearchParams(payload).toString(),
				redirect: 'follow'
			};

			const res = await (await fetch(`${PUBLIC_FLIP_API_HOST}/bill`, requestOptions)).json();

      if (res?.errors?.length) {
        alert(JSON.stringify(res?.errors));
        return
      }

			window.location.href = `https://${res.link_url}`;
		} catch (err) {
			console.log(err);
		} finally {
			isBusy = false;
		}
	}
</script>

<div class="pt-20">
	<h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
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
		<div class="flex justify-center gap-4">
			<div class="rounded-lg md:w-2/3">
				{#each $cartStore.items as item}
					<div
						class="justify-between mb-6 rounded text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 p-6 shadow-md sm:flex sm:justify-start"
					>
						<img
							src={item?.product?.image}
							alt={`image of ${item?.product?.title}`}
							class="w-full rounded-lg sm:w-40"
						/>
						<div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
							<div class="mt-5 sm:mt-0">
								<h2 class="text-lg font-bold text-gray-900">{item?.product?.title}</h2>
								<p class="mt-1 text-xs">
									cream: {item?.cream?.title} ({item?.cream.price.idrFormatted})
								</p>
								<p class="mt-1 text-xs">
									topping: {item?.topping?.title || '-'} ({item?.topping.price.idrFormatted})
								</p>
							</div>
							<div
								class="mt-4 pl-2 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
							>
								<div class="flex items-center gap-4">
									<input
										type="number"
										id="qty"
										min="1"
										bind:value={item.qty}
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
									<p class="text-lg text-green">{item?.product?.price?.idrFormatted}</p>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<div
						class="text-center rounded text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 p-6 shadow-md"
					>
						<p class="mb-4">No carts found.</p>
						<a href="/" class="rounded bg-yellow hover:bg-black transition px-4 py-2 text-black"
							>Go shop</a
						>
					</div>
				{/each}
			</div>
			<!-- Sub total -->
			<div
				class="mt-6 h-full rounded text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 p-6 shadow-md md:mt-0 md:w-1/3"
			>
				{#each $cartStore.items as item}
					<div class="mb-2 flex justify-between">
						<p>
							{item?.product?.title} x {item.qty}<br />
							<small>cream: {item?.cream?.title}, topping: {item?.topping?.title}</small>
						</p>
						<p>
							{priceFormatted(
								(item?.product?.price?.amount +
									item?.topping?.price?.amount +
									item?.cream?.price?.amount) *
									item.qty
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
