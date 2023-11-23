<script>
	import { priceFormatted } from '$lib/shared/utils/priceFormatted.js';
  import Image from '$lib/shared/components/elements/image/template.svelte';

  export let data;

  const { transaction } = data;
</script>
<div class="container">
  <div class="w-full p-4 bg-white rounded-md shadow md:max-w-2xl mx-auto dark:bg-slate-900">
    <div class="flex items-center justify-between mb-4">
      <h5 class="text-xl font-bold leading-none text-slate-900 dark:text-slate-100">ID #{transaction?.flip?.link_id}</h5>

      {#if transaction?.flip?.status == 'ACTIVE'}
        <a href={`//${transaction?.flip?.link_url}`} class="flex items-center rounded-md bg-yellow py-1.5 px-4 gap-2 font-medium hover:opacity-75 text-black transition">Pay now</a>
      {/if}
    </div>
    <p class="text-sm font-medium truncate text-slate-900 dark:text-slate-100 mb-2">
      Status: {transaction?.flip?.status}
    </p>
    <p class="text-sm font-medium truncate text-slate-900 dark:text-slate-100 mb-2">
      Total Amount: {priceFormatted(transaction?.flip?.amount || 0)}
    </p>
    <p class="text-sm truncate text-slate-900 dark:text-slate-100 mb-2">
      Date: {new Date(transaction?.created_date).toLocaleString("en-US")}
     </p>
    <p class="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
      Carts:
    </p>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
        {#each transaction?.carts as item}
        <li class="py-3 sm:py-4">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-20 h-20 object-fit aspect-square">
              <Image src={item?.product?.images?.[0]} alt={item.title} />
            </div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
                Name: {item?.product?.name}
              </p>
              <p class="text-sm truncate text-slate-900 dark:text-slate-100">
                Note: {item?.note}
              </p>
              <p class="text-sm truncate text-slate-900 dark:text-slate-100">
                Quantity: {item?.quantity}
              </p>
              <p class="text-sm truncate text-slate-900 dark:text-slate-100">
                Price: {priceFormatted(item?.product?.price || 0)}
              </p>
            </div>
            <!-- <a href={`/transaction/${item._id}`} class="text-yellow text-sm hover:opacity-70 transition ml-4">View detail</a> -->
          </div>
        </li>
        {:else}
          <p class="text-xs">No cart.</p>
        {/each}
      </ul>
    </div>
  </div>
</div>
