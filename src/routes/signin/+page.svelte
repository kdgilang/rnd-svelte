<script>
  import Signin from '$lib/shared/components/forms/signin/template.svelte';

  async function handleSubmit() {
    try {
      const res = await sendVerificationCodeService('6287760151155');
    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="py-20 px-3">
  <Signin />
</div>