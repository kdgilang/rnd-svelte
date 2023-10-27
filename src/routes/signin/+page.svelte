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

<Signin />
