<script>
  let tabItems = ['Profile', 'Orders', 'Settings'];
  let activeTab = 'Profile';
</script>

<div class="container lg:w-1/2">
	<div
		class="text-sm font-medium text-center text-slate-900 border-b border-slate-200 dark:text-slate-100 dark:border-slate-700"
	>
		<ul class="flex flex-wrap -mb-px">
      {#each tabItems as item}
        <li class="mr-2">
          <button
            class="inline-block p-4 hover:border-b-2 transition rounded-t-lg hover:text-yellow hover:border-yellow"
            class:border-b-2={activeTab === item}
            class:border-yellow={activeTab === item}
            on:click|preventDefault={() => {activeTab = item}}
            >{item}</button
          >
        </li>
      {/each}
		</ul>
	</div>
</div>
