<script>
	import { sendVerificationCodeService } from "$lib/shared/services/waService";
	import Stretch from "svelte-loading-spinners/Stretch.svelte";

  let name = '';
  let waNumber = '';
  let waNumberFormatted = '';
  let error = '';
  let isBusy = false;

  $: {
    waNumberFormatted = waNumber;
    if (waNumber?.[0] === '0') {
      waNumberFormatted = `${waNumber.slice(1, waNumber?.length)}`;
    }
  }

  const handleSubmit = async () => {
    try {
      if(isBusy) return
      error = '';
      
      isBusy = true;
      const res = await sendVerificationCodeService(waNumberFormatted);

      if (res.error.error_data.details) {
        error = res?.error?.error_data.details
      }

    } catch (err) {
      error = err;
    } finally {
      isBusy = false;
    }
  }
</script>

<div class="bg-slate-100 dark:bg-slate-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    {#if error}
    <div id="alert-2" class="flex items-center p-4 mb-4 text-slate-100 rounded-md bg-red/60" role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span class="sr-only">Info</span>
      <div class="ml-3 text-sm font-medium">
        {error}
      </div>
      <button on:click={() => error = ''} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-md focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
    {/if}
    <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-slate-900 dark:text-white">
      <img class="w-8 mr-2" src="/logo.png" alt="berbuah logo">
      Berbuah
    </a>
    <div class="w-full bg-white rounded-md shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-700 dark:border-slate-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white">
            Sign in to your account
        </h1>
        <form class="space-y-4 md:space-y-6" action="#" on:submit|preventDefault={handleSubmit}>
            <div>
                <label for="name" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Name</label>
                <input bind:value="{name}" type="text" name="name" id="name" class="bg-slate-100 border border-slate-300 text-slate-900 sm:text-sm rounded-md focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: Megachan" required>
            </div>
          <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Whatsapp number</label>
            <div class="relative border border-slate-300 rounded-md dark:border-slate-600 overflow-hidden">
                <div class="absolute bg-slate-100 dark:bg-slate-900 inset-y-0 left-0 flex items-center px-2.5 pointer-events-none">
                    <span class="text-slate-500 dark:text-slate-400 block">+62</span>
                </div>
                <input bind:value="{waNumber}" type="phone" name="phone" id="phone" class="rounded-md pl-14 bg-slate-100 text-slate-900 sm:text-sm focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-slate-700 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 08123456789" required>
            </div>
          </div>
          <button
            type="submit"
            class="w-full rounded-md bg-yellow py-1.5 font-medium hover:bg-black text-black hover:text-slate-200 transition disabled:bg-yellow disabled:text-white disabled:opacity-25"
            disabled={isBusy}
          >Sign in</button>
          {#if isBusy}
            <div class="flex justify-center">
              <Stretch size="55" color="#FF3E00" unit="px" duration="1s" />
            </div>
          {/if}
        </form>
      </div>
    </div>
  </div>
</div>
