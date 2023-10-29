<script>
	import { registerUser } from "$lib/shared/stores/registerUser";

  const handleKeyUp = async (e) => {
   if(e.key === 'Backspace') {
    e?.target?.previousElementSibling?.focus();
   } else {
    e?.target?.nextElementSibling?.focus();
   }
  }
</script>

<div class="py-20 px-3">
  <div class="container mx-auto">
    <div class="max-w-sm mx-auto md:max-w-lg">
      <div class="w-full">
        <div class="bg-white rounded-md shadow dark:border dark:bg-slate-700 dark:border-slate-700 py-4 text-center text-slate-900 dark:text-slate-100">
          <h1 class="text-2xl font-bold">Verification code</h1>
          <div class="flex flex-col mt-4">
            <span>Enter the verification code you received at</span>
            <span class="font-bold">+{$registerUser?.waNumber}</span>
          </div>
          
          <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
            <input on:keyup={handleKeyUp} class="m-1 border h-10 w-10 text-center form-control rounded dark:text-slate-900 text-slate-100 bg-slate-900 dark:bg-slate-100" type="text" id="first" maxlength="1" /> 
            <input on:keyup={handleKeyUp} class="m-1 border h-10 w-10 text-center form-control rounded dark:text-slate-900 text-slate-100 bg-slate-900 dark:bg-slate-100" type="text" id="second" maxlength="1" /> 
            <input on:keyup={handleKeyUp} class="m-1 border h-10 w-10 text-center form-control rounded dark:text-slate-900 text-slate-100 bg-slate-900 dark:bg-slate-100" type="text" id="third" maxlength="1" /> 
            <input on:keyup={handleKeyUp} class="m-1 border h-10 w-10 text-center form-control rounded dark:text-slate-900 text-slate-100 bg-slate-900 dark:bg-slate-100" type="text" id="fourth" maxlength="1" />
            <input on:keyup={handleKeyUp} class="m-1 border h-10 w-10 text-center form-control rounded dark:text-slate-900 text-slate-100 bg-slate-900 dark:bg-slate-100" type="text" id="fifth" maxlength="1" /> 
            <input on:keyup={handleKeyUp} class="m-1 border h-10 w-10 text-center form-control rounded dark:text-slate-900 text-slate-100 bg-slate-900 dark:bg-slate-100" type="text" id="sixth" maxlength="1" />
          </div>
          
          <div class="flex justify-center text-center mt-5">
            <button class="flex items-center text-yellow hover:text-yellow/70 transition"><span class="font-bold">Resend code</span><i class='bx bx-caret-right ml-1'></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>