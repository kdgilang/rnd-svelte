<script>
	import { cartStore } from '$lib/shared/stores/cart';
  import Image from '$lib/shared/components/elements/image/template.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let showModal;

	let dialog;

	let topping;

	let cream;

	let qty = 1;

	$: if (dialog && showModal) dialog.showModal();
	const { product } = data;

	function handleFormSubmit() {
		const cartItems = [
			...$cartStore.items,
			{
				id: new Date().getTime(),
				qty,
				cream: data?.creams.find((item) => item.title === cream),
				topping: data?.toppings.find((item) => item.title === topping),
				product
			}
		];
		cartStore.updateItems(cartItems);

		dialog.close();
	}
</script>

<div class="container">
	<section
		class="body-font rounded overflow-hidden text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700"
	>
		<div class="container px-5 py-24 mx-auto">
			<div class="lg:w-4/5 mx-auto flex flex-wrap">
        <div class="lg:w-1/2 relative overflow-hidden bg-gray-200 flex items-center w-full">
          <Image
            alt={`image of ${product.title}`}
            src={product.image}
          />
        </div>
        
				<div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex items-center">
					<div class="w-full">
						<!-- <h2 class="text-sm title-font tracking-widest">{product.title}</h2> -->
						<h1 class="text-3xl title-font font-medium mb-1">{product.title}</h1>
						<div class="flex mb-4">
							<span class="flex items-center">
								<svg
									fill="currentColor"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									class="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									class="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									class="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									class="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								<svg
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									class="w-4 h-4 text-red-500"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								<span class="text-gray-600 ml-3">4 Reviews</span>
							</span>
							<span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
								<a href="/">
									<svg
										fill="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
									</svg>
								</a>
								<a href="/" class="ml-2">
									<svg
										fill="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path
											d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
										/>
									</svg>
								</a>
								<a href="/" class="ml-2">
									<svg
										fill="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path
											d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
										/>
									</svg>
								</a>
							</span>
						</div>
						<p class="leading-relaxed">
							{product.description}
						</p>
						<div class="flex justify-between flex items-center mt-3">
							<span class="title-font font-medium text-2xl text-green"
								>{product?.price.idrFormatted}</span
							>
							<button
								on:click={() => (showModal = true)}
								class="rounded h-10 bg-yellow px-5 border-0 inline-flex items-center hover:bg-opacity-75 justify-center ml-4 transition"
								data-modal-target="staticModal"
								data-modal-toggle="staticModal"
							>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<form action="" on:submit|preventDefault={handleFormSubmit}>
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<div>
					<label for="qty" class="block mb-2 text-sm font-medium">Quantity</label>
					<input
						type="number"
						id="qty"
						min="1"
						bind:value={qty}
						class="bg-slate-200 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-yellow focus:border-yellow block w-full p-2.5 dark:border-slate-700 dark:placeholder-slate-400"
					/>
				</div>
				<div>
					<label for="qty" class="block mb-2 text-sm font-medium">Creams</label>
					<select
						bind:value={cream}
						required
						class="bg-slate-200 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-yellow focus:border-yellow block w-full p-2.5 dark:border-slate-700 dark:placeholder-slate-400"
					>
						<option value="" selected>Choose a cream</option>
						{#each data?.creams as cream}
							<option value={cream.title} disabled={cream.isEmpty || !cream.status}
								>{cream.title} {cream.isEmpty ? '(not available)' : ''}</option
							>
						{/each}
					</select>
				</div>
				<div>
					<label for="qty" class="block mb-2 text-sm font-medium">Toppings</label>
					<select
						bind:value={topping}
						required
						class="bg-slate-200 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-yellow focus:border-yellow block w-full p-2.5 dark:border-slate-700 dark:placeholder-slate-400"
					>
						<option value="" selected>Choose a topping</option>
						<option value="-">No toppings</option>
						{#each data?.toppings as topping}
							<option value={topping.title} disabled={topping.isEmpty || !topping.status}
								>{topping.title} {topping.isEmpty ? '(not available)' : ''}</option
							>
						{/each}
					</select>
				</div>
			</div>

			<!-- svelte-ignore a11y-autofocus -->
			<div class="flex justify-between items-center">
				<button
					class="rounded h-10 bg-black px-5 border-0 inline-flex items-center hover:bg-opacity-75 justify-center transition text-white"
					on:click|preventDefault={() => dialog.close()}>Cancel</button
				>

				<button
					autofocus
					class="text-black rounded h-10 bg-yellow px-5 border-0 inline-flex items-center hover:bg-opacity-75 justify-center ml-4 transition"
				>
					Add
				</button>
			</div>
		</form>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
