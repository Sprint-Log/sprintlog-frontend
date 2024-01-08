<!-- <script lang="ts">
  import type { ModalComponent } from '@skeletonlabs/skeleton';
  import { Modal } from '@skeletonlabs/skeleton';
  import UserUpdateForm from '$lib/components/Users/UserUpdateForm.svelte';
  import UserForm from '$lib/components/Users/UserForm.svelte';



  const userModalRegistry: Record<string, ModalComponent> = {
    modalComponentOne: { ref: UserUpdateForm },
    modalComponentTwo: { ref: UserForm }
  };
</script>
    <Modal components={userModalRegistry} />
  -->
<slot/>
