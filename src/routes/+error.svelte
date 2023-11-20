<script>
	import { page } from '$app/stores';
</script>

<div class="w-full h-screen flex flex-col items-center justify-center">
  <div class="flex flex-col items-center justify-center">
    <p class="md:text-lg lg:text-xl text-gray-600 mb-2">{$page.status}</p>
    <p class="text-3xl md:text-4xl lg:text-5xl mb-5">{$page.error.message}</p>
    <a href="/" class="flex items-center rounded-md bg-yellow py-1.5 px-4 gap-2 font-medium hover:opacity-75 text-black transition" title="Return Home">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
      </svg>
      <span>Return home</span>
    </a>
  </div>
</div>