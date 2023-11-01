<script>
	import Card from '$lib/shared/components/elements/card/template.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const products = JSON.parse(data?.products)
</script>

<div class="container">
	<h1 class="sr-only">Web store products</h1>
	<div class="grid grid-cols-4 gap-4">
		{#each products as product}
			<!-- <a
				href="javascript"
				data-sveltekit-preload-data="hover"
				class="hover:opacity-75 transition"
			> -->

			  
				<Card data={product} />
			<!-- </a> -->
		{:else}
			<p class="text-center">No products found.</p>
		{/each}
	</div>
</div>
