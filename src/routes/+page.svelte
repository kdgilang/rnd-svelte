<script>
	import Card from '$lib/shared/components/elements/card/template.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container">
	<h1 class="sr-only">Fake store products</h1>
	<div class="grid grid-cols-4 gap-4">
		{#each data?.products as product}
			<a
				href={`/products/${product.slug}`}
				data-sveltekit-preload-data="hover"
				class="hover:opacity-75 transition"
			>
				<Card data={product} />
			</a>
		{:else}
			<p class="text-center">No products found.</p>
		{/each}
	</div>
</div>
