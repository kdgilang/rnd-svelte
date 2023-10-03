<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import { siteSettings } from "$lib/shared/components/stores/siteSettings";
  import Header from '$lib/shared/components/layouts/header/template.svelte';


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
  <Header />
  <slot></slot>
</div>