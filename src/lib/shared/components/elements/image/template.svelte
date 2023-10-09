<script>
	import { onMount } from 'svelte'

	export let src;
    export let alt;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
			const img = new Image();
			img.src = src;
			loading = true;

			img.onload = () => {
					loading = false;
					loaded = true;
			};
			img.onerror = () => {
					loading = false;
					failed = true;
			};
	})
</script>


{#if loaded}
	<img {src} alt={alt} class="w-full h-full w-full h-full object-center object-cover rounded" />
{:else if failed}
	<img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" />
{:else if loading}
    <div class="skeleton-box h-full w-full"></div>
{/if}

<style lang="scss">
    .skeleton-box {
        display: inline-block;
        position: relative;
        overflow: hidden;
        background-color: #DDDBDD;

        &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 20%,
            rgba(#fff, 0.5) 60%,
            rgba(#fff, 0)
            );
            animation: skeleton 2s infinite;
            content: '';
        }

        @keyframes skeleton {
            100% {
                transform: translateX(100%);
            }
        }
    }
</style>