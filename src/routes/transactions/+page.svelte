<script>
	import { priceFormatted } from '$lib/utils/priceFormatted.js';
  import Image from '$lib/components/elements/image/template.svelte';

  export let data;

  const { transactions } = data;
</script>
<div class="container">
  <div class="w-full p-4 bg-white rounded-md shadow md:max-w-2xl mx-auto dark:bg-slate-900">
    <div class="flex items-center justify-between mb-4">
      <h5 class="text-xl font-bold leading-none text-slate-900 dark:text-slate-100">({transactions?.length}) Transactions</h5>
    </div>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
        {#each transactions as item}
        <li class="py-3 sm:py-4">
          <div class="flex items-center">
            <div class="flex-shrink-0 aspect-square object-fit h-10 w-10">
              <Image alt={item?.flip?.title}/>
            </div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
                #{item?.flip?.link_id}
              </p>
              <p class="text-sm truncate text-slate-900 dark:text-slate-100">
               Date: {new Date(item?.created_date).toLocaleString("en-US")}
              </p>
              <p class="text-sm truncate text-slate-900 dark:text-slate-100">
                Status: {item?.flip?.status}
               </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {priceFormatted(item?.flip?.amount || 0)}
            </div>
            <a href={`/transactions/${item._id}`} class="text-yellow text-sm hover:opacity-70 transition ml-4">View detail</a>
          </div>
        </li>
        {:else}
          <p class="text-xs">No transactions.</p>
        {/each}
      </ul>
    </div>
  </div>
</div>
