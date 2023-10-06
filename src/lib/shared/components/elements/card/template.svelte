<script>
  /**
   * @typedef CardType
   * @type {Object}
   * @property {string} [title]
   * @property {string} [description]
   * @property {string} [category]
   * @property {string} [image]
   */

  /**
   * @param {CardType} data
  */
  export let data;
</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700">
  <img class="w-full" src={data?.image} alt={`image of ${data?.title}`} />
  <div class="px-6 py-4">
    <h4 class="font-bold text-xl mb-2">{data?.title}</h4>
    <p class="text-gray-700 text-base">
      {data?.description}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-yellow bg-opacity-75 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data?.category}</span>
  </div>
</div>