<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { siteSettings } from '$lib/shared/stores/siteSettings.js';
	import Header from '$lib/shared/components/layouts/header/template.svelte';
	import Jellyfish from 'svelte-loading-spinners/Jellyfish.svelte';
	import { navigating } from '$app/stores';

	/** @type {import('./$types').LayoutData} */
	export let data;

	onMount(() => {
		// Init Dark Mode
		if (localStorage.getItem('siteSettings')) {
			const localSettings = JSON.parse(localStorage.getItem('siteSettings'));
			siteSettings.update((v) => ({ ...v, ...localSettings }));
		} else {
			if (window && window?.matchMedia('(prefers-color-scheme: dark)').matches) {
				siteSettings.update((v) => ({ ...v, isDarkMode: true }));
				localStorage.setItem('siteSettings', JSON.stringify($siteSettings));
			}
		}
	});
</script>

<div class:dark={$siteSettings.isDarkMode}>
	<div class="text-slate-700 dark:text-slate-100 min-h-screen bg-slate-100 dark:bg-slate-900">
		<Header {data} />
		<div class="py-5">
			<slot />
		</div>
	</div>


	{#if $navigating}
		<div class="fixed z-50 bottom-0 top-0 bg-black/80 left-0 h-full w-full flex justify-center items-center">
			<div class="inset-x-0 mx-auto w-[65px] text-center">
				<Jellyfish size="60" color="#FFA31A" unit="px" duration="2s" />
			</div>
		</div>
	{/if}
</div>

<svelte:head>
	<!-- Start of SleekFlow Embed Code -->
	<!-- Start of SleekFlow Embed Code -->
	<script
		src="https://chat.sleekflow.io/embed_iframe.js"
		data-id="travischatwidget"
		data-companyid="49f9e828-d392-42bf-8b7e-d9f94ddc3b06"
		type="text/javascript"
	>
	</script>
	<!-- End of SleekFlow Embed Code -->
</svelte:head>
