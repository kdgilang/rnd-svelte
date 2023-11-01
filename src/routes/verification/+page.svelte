<script>
	import { sendVerificationService, verificationService } from '$lib/shared/services/userServices';
	import Stretch from 'svelte-loading-spinners/Stretch.svelte';
  import Cookies from 'js-cookie';
	import { onMount } from 'svelte';

  export let data;
  let codes = []
  let isBusy = false;
  let error = '';
  let resendInseconds = 0;

  const { waNumber } = data;

  onMount(() => {
    const interval = setInterval(() => {
      if (resendInseconds > 0) {
        resendInseconds--;
      }

      return () => {
        clearInterval(interval);
      };
    }, 1000);
  });

  async function sendCodeVerification() {
    if (isBusy) return

    try {
      error = '';
      isBusy = true;
      const code = codes.join('');

      const resVerify = await verificationService({
        code,
        waNumber
      });

      if (resVerify?.error) {
        throw resVerify?.error;
      }

      Cookies.remove('waNumber');

      Cookies.set('userToken', resVerify.token, { expires: 1, secure: true });

      window.location.href = `/users/${resVerify.userId}`;
    } catch(err) {
      error = err;
    } finally {
      isBusy = false;
    }
  }

  const handleKeyUp = async (e) => {
    if(e.key === 'Backspace') {
      e?.target?.previousElementSibling?.focus();
    } else {
      e?.target?.nextElementSibling?.focus();
    }

    if (codes.length === 6 && (!codes.includes(undefined) && !codes.includes(''))) {
      await sendCodeVerification();
    }
  }

  const handleResendCode = async () => {
    if (isBusy || resendInseconds) return

    try {
      error = '';
      isBusy = true;

      const res = await sendVerificationService(waNumber);

      if (res?.error) {
        throw res.error;
      }
      
    } catch(err) {
      const seconds = err?.split('(')?.[1]?.split(')')?.[0];
      resendInseconds = Number(seconds);

      if (seconds) {
        const interval = setInterval(() => {
          resendInseconds--;

          return () => {
            clearInterval(interval);
          };
        }, 1000);
      }

      error = err;
    } finally {
      isBusy = false;
    }
  }

  const handlePasteCode = async () => {
    try {
      const clipCode = await navigator.clipboard.readText();
      codes = clipCode.split('')
      await sendCodeVerification();
    } catch (err) {
      console.log(err);
    }
  }
  
</script>

<div class="container mx-auto">
  <div class="max-w-sm mx-auto md:max-w-lg">
    <div class="w-full">
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

      <div class="bg-white rounded-md shadow dark:border dark:bg-slate-900 dark:border-slate-900 py-4 text-center text-slate-900 dark:text-slate-200">
        <h1 class="text-2xl font-bold">Verification code</h1>
        <div class="flex flex-col mt-4">
          <span>Enter the verification code you received at</span>
          <span class="font-bold">+{waNumber}</span>
        </div>
        
        <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
          <input on:keyup={handleKeyUp} on:paste={handlePasteCode} bind:value={codes[0]} class="m-1 border h-10 w-10 text-center form-control rounded text-slate-900 bg-slate-100" type="text" maxlength="1" /> 
          <input on:keyup={handleKeyUp} on:paste={handlePasteCode} bind:value={codes[1]} class="m-1 border h-10 w-10 text-center form-control rounded text-slate-900 bg-slate-100" type="text" maxlength="1" /> 
          <input on:keyup={handleKeyUp} on:paste={handlePasteCode} bind:value={codes[2]} class="m-1 border h-10 w-10 text-center form-control rounded text-slate-900 bg-slate-100" type="text" maxlength="1" /> 
          <input on:keyup={handleKeyUp} on:paste={handlePasteCode} bind:value={codes[3]} class="m-1 border h-10 w-10 text-center form-control rounded text-slate-900 bg-slate-100" type="text" maxlength="1" />
          <input on:keyup={handleKeyUp} on:paste={handlePasteCode} bind:value={codes[4]} class="m-1 border h-10 w-10 text-center form-control rounded text-slate-900 bg-slate-100" type="text" maxlength="1" /> 
          <input on:keyup={handleKeyUp} on:paste={handlePasteCode} bind:value={codes[5]} class="m-1 border h-10 w-10 text-center form-control rounded text-slate-900 bg-slate-100" type="text" maxlength="1" />
        </div>
        
        <div class="flex justify-center text-center mt-5">
          <button
            disabled={resendInseconds}
            on:click|preventDefault={handleResendCode} class="flex items-center text-yellow hover:text-yellow/70 transition underline text-xs">
            <span class="font-bold">Resend code { resendInseconds ? `in ${resendInseconds} seconds.` : ''}
          </button>
        </div>

        {#if isBusy}
          <div class="flex justify-center mt-3">
            <Stretch size="55" color="#FFA31A" unit="px" duration="1s" />
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>