<script>
	import { getContext } from "svelte";
	import Stretch from "svelte-loading-spinners/Stretch.svelte";
  
  let isBusy = false;

  let user = JSON.parse(getContext('user'));
  let form = getContext('profileForm');

  const handleSubmit = async () => {

  }
</script>

{#if form}
<div
  class="flex items-center p-4 mb-4 text-slate-100 rounded-md bg-red/60"
  class:bg-green={form.status}
  role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ml-3 text-sm font-medium">
    {form?.message || form.errorMessage}
  </div>
  <button on:click={() => form = ''} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-md focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
    <span class="sr-only">Close</span>
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>
{/if}

<form class="space-y-4 md:space-y-6" method="post" action="?/update" on:submit={handleSubmit}>
  <div>
    <label for="name" class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Name</label>
    <input bind:value="{user.name}" type="text" name="name" id="name" class="bg-slate-100 border border-slate-300 text-slate-900 sm:text-sm rounded-md focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: Megachan" required>
  </div>
  <div>
    <label for="phone" class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Whatsapp number</label>
    <div class="relative border border-slate-300 rounded-md dark:border-slate-600 overflow-hidden">
      <div class="absolute bg-slate-100 dark:bg-slate-900 inset-y-0 left-0 flex items-center px-2.5 pointer-events-none">
        <span class="text-slate-500 dark:text-slate-400 block">+62</span>
      </div>
      <input value="{user.waNumber}" type="phone" name="phone" id="phone" disabled class="disabled rounded-md pl-14 bg-slate-100 text-slate-900 sm:text-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-slate-700 dark:placeholder-slate-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 08123456789" required>
    </div>
  </div>
  <div>
    <label for="address" class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Address</label>
    <input bind:value="{user.address}" type="text" name="address" id="address" class="bg-slate-100 border border-slate-300 text-slate-900 sm:text-sm rounded-md focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <div class="text-center">
    <button
      type="submit"
      class="px-4 rounded-md bg-yellow py-1.5 font-medium text-black hover:opacity-70 transition disabled:bg-yellow disabled:text-white disabled:opacity-25"
      disabled={isBusy}
    >Save</button>
  </div>
  {#if isBusy}
    <div class="flex justify-center">
      <Stretch size="55" color="#FFA31A" unit="px" duration="1s" />
    </div>
  {/if}
</form>