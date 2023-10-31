<script>
  import ProfileForm from '$lib/shared/components/forms/profile/template.svelte';
  let tabItems = ['Profile', 'Orders', 'Settings'];
  let activeTab = 'Profile';
</script>

<div class="container">
  <div class="w-full bg-white rounded-md shadow md:max-w-2xl mx-auto dark:bg-slate-700">
    <div
      class="text-sm font-medium text-center text-slate-900 border-b border-slate-500 dark:text-slate-100"
    >
      <ul class="flex flex-wrap -mb-px">
        {#each tabItems as item}
          <li>
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

    <div class="p-4">
      {#if activeTab === tabItems[0]}
        <ProfileForm />
      {:else if activeTab === tabItems[1]}
      {:else if activeTab === tabItems[2]}
      {/if}
    </div>
  </div>
</div>
