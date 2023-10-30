<script>
	import Switch from '$lib/shared/components/forms/switch/template.svelte';
	import Select from '$lib/shared/components/forms/select/template.svelte';
	import Cart from '$lib/shared/components/elements/cart/template.svelte';
	import { siteSettings } from '$lib/shared/stores/siteSettings.js';

	function handleOnChange(event) {
		const jsonString = JSON.stringify({ ...$siteSettings, isDarkMode: event.detail.value });
		localStorage.setItem('siteSettings', jsonString);
	}

	/**
	 * @param {object} data
	 * @param {Array.<string>} data.categories
	 */
	export let data;
	/**
	 * @type {string}
	 */
	let category;
</script>

<div
	class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-yellow/40 bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
>
	<div class="py-4 border-b lg:border-0 border-yellow/40">
		<div class="container relative flex items-center">
			<div class="flex items-center">
				<a class="mr-3 w-[2.0625rem] overflow-hidden md:w-auto hidden sm:block" href="/">
					<span class="sr-only">AI News home page</span>
					<img src="/logo2.png" alt="Store hub logo" width="100" height="50" class="dark:hidden" />
					<img
						src="/logo-dark.png"
						alt="Store hub logo"
						width="100"
						height="50"
						class="hidden dark:inline"
					/>
				</a>
				<Select name="Category" defaultValue="Category" items={data.categories} bind:value={category} />
				<Cart />
			</div>
			<div class="ml-auto flex gap-5 items-center dark:border-slate-800">
				<a
					href="/signin"
					class="ml-6 flex text-slate-700 justify-center items-center gap-2 dark:text-slate-200 hover:text-slate-500 dark:hover:text-slate-300"
				>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="w-5 h-5" fill="currentColor"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>
					<span class="text-xs">Sigin</span>
				</a>
				<Switch bind:checked={$siteSettings.isDarkMode} on:change={handleOnChange}>
					<svelte:fragment slot="icon-indicator">
						<svg
							class="dark:hidden z-10 relative top-[4px] left-[4px]"
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 384 512"
							><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
							/></svg
						>
						<svg
							class="hidden dark:inline absolute z-10 top-[4px] right-[4px]"
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 512 512"
							><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
							/></svg
						>
					</svelte:fragment>
				</Switch>
				<a
					href="https://github.com/kdgilang"
					rel="noopener noreferrer"
					target="_blank"
					class=" block text-slate-700 dark:text-slate-200 hover:text-slate-500 dark:hover:text-slate-300"
				>
					<span class="sr-only">Fake store on GitHub</span>
					<svg viewBox="0 0 16 16" class="w-5 h-5" fill="currentColor" aria-hidden="true">
						<path
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>
