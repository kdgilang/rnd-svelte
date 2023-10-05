<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import { siteSettings } from "$lib/shared/stores/siteSettings.js";
  import Header from '$lib/shared/components/layouts/header/template.svelte';
  
  /** @type {import('./$types').LayoutData} */
	export let data;

  onMount(() => {
    // Init Dark Mode
    if (localStorage.getItem('siteSettings')) {
      const localSettings = JSON.parse(localStorage.getItem('siteSettings'));
      siteSettings.update((v) => ({ ...v, ...localSettings }))
    } else {
      if ((window && window?.matchMedia('(prefers-color-scheme: dark)').matches)) {
        siteSettings.update((v) => ({ ...v, isDarkMode: true }))
        localStorage.setItem('siteSettings', JSON.stringify($siteSettings))
      }
    }
  });
</script>

<div class:dark={$siteSettings.isDarkMode}>
  <Header data={data} />
  <div class="my-5">
    <slot></slot>
  </div>
</div>



<svelte:head>
  <!-- Start of SleekFlow Embed Code -->
  <script src="https://chat.sleekflow.io/embed_iframe.js" 
  data-id="travischatwidget"
  data-companyid="49f9e828-d392-42bf-8b7e-d9f94ddc3b06"
  type="text/javascript">
  </script>
  <!-- End of SleekFlow Embed Code -->
</svelte:head>