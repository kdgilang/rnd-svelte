<script>
	import '../app.css';
	import { onMount, setContext } from 'svelte';
	import { siteSettings } from '$lib/shared/stores/siteSettings.js';
	import Header from '$lib/shared/components/layouts/header/template.svelte';
	import Jellyfish from 'svelte-loading-spinners/Jellyfish.svelte';
	import { navigating } from '$app/stores';

	/** @type {import('./$types').LayoutData} */
	export let data;

  let { errorMessage } = data

	setContext('user', data?.user);

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
    {#if errorMessage}
    <div class="sticky top-0 w-full flex items-center p-4 mb-4 text-slate-100 bg-red/60" role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span class="sr-only">Info</span>
      <div class="ml-3 text-sm font-medium">
        {@html errorMessage}
      </div>
      <button on:click={() => errorMessage = ''} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-md focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
    {/if}
		<Header {data} />
		<div class="py-5">
			<slot />
		</div>
	</div>

  <!-- Loader -->
	{#if $navigating}
		<div class="fixed z-50 bottom-0 top-0 bg-black/80 left-0 h-full w-full flex justify-center items-center">
			<div class="inset-x-0 mx-auto w-[65px] text-center">
				<Jellyfish size="60" color="#FFA31A" unit="px" duration="2s" />
			</div>
		</div>
	{/if}
  <!-- End Loader -->
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
