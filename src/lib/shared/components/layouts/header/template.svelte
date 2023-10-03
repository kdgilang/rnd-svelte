<script>
    // import classNames from "$lib/utils/classNames"
    import Switch from '$lib/shared/components/forms/switch/template.svelte'

    /** @type {boolean} */
    let isDarkMode = false;
</script>
<div class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-green/40 bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
  <div class="py-4 border-b border-slate-900/10 lg:border-0 dark:border-green/40">
    <div class="container">
      <div class="relative flex items-center">
        <a class="mr-3 w-[2.0625rem] overflow-hidden md:w-auto hidden sm:block" href="/">
          <span class="sr-only">AI News home page</span>
          <!-- <img src="/logo.svg" alt="AI News logo" width="100" height="50" class="dark:hidden"/>
          <img src="/logo-dark.svg" alt="AI News logo" width="100" height="50" class="hidden dark:inline"/> -->
          <img src="/logo.png" alt="AI News logo" width="100" height="50" class="dark:hidden"/>
        </a>
        <!-- <Navigation /> -->
        <div class="ml-auto flex items-center dark:border-slate-800">
          <!-- { router.pathname === '/search' ? 
            <Dropdown
              class="mr-6"
              items={languages}
              value={lang}
              onDropdownChange={(item) => { 
                setCookie('lang', item.value)
                router.reload()
              }}
            /> :
            <Dropdown
              class="mr-6"
              items={dropdownRegions}
              value={region}
              onDropdownChange={(item) => { 
                setCookie('region', item.value)
                router.reload()
              }}
            />
          } -->

          <!-- <Switch
            checked={enabled}
            onChange={setEnabled}
            class={`${
              enabled ? 'bg-slate-700' : 'bg-slate-500'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span class="sr-only">Enable dark mode</span>
            <span class={classNames(
              "inline-block transform rounded-full transition bg-white",
              enabled ? 'translate-x-6' : 'translate-x-1',
            )}>
              {enabled ? <MoonIcon class={classNames(
                "h-4 w-4 text-slate-900",
              )} /> : <SunIcon class={classNames(
                "h-4 w-4 text-slate-900 ",
              )} />}
            </span>
          </Switch> -->

          <Switch 
            bind:checked={isDarkMode}
          />
          {`${isDarkMode}`}
          <a href="https://github.com/kdgilang" rel="noopener noreferrer" target="_blank" class="ml-6 block text-slate-700 dark:text-slate-200 hover:text-slate-500 dark:hover:text-slate-300">
            <span class="sr-only">AI News on GitHub</span>
            <svg viewBox="0 0 16 16" class="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>