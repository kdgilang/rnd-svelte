<script>
	import { goto } from "$app/navigation";
	import { getContext } from "svelte";
	import Stretch from "svelte-loading-spinners/Stretch.svelte";
  import Cookies from "js-cookie";
  
  let isBusy = false;

  const user = getContext('user');

  let name = user?.name;
  let waNumber = user?.waNumber;
  let address = user?.address;

  const handleSubmit = async () => {

  }
  
</script>
<form class="space-y-4 md:space-y-6" action="#" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="name" class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Name</label>
    <input bind:value="{name}" type="text" name="name" id="name" class="bg-slate-100 border border-slate-300 text-slate-900 sm:text-sm rounded-md focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: Megachan" required>
  </div>
  <div>
    <label for="phone" class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Whatsapp number</label>
    <div class="relative border border-slate-300 rounded-md dark:border-slate-600 overflow-hidden">
      <div class="absolute bg-slate-100 dark:bg-slate-900 inset-y-0 left-0 flex items-center px-2.5 pointer-events-none">
        <span class="text-slate-500 dark:text-slate-400 block">+62</span>
      </div>
      <input value="{waNumber}" type="phone" name="phone" id="phone" disabled class="disabled rounded-md pl-14 bg-slate-100 text-slate-900 sm:text-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-slate-700 dark:placeholder-slate-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 08123456789" required>
    </div>
  </div>
  <div>
    <label for="address" class="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">Address</label>
    <input bind:value="{address}" type="text" name="address" id="address" class="bg-slate-100 border border-slate-300 text-slate-900 sm:text-sm rounded-md focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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