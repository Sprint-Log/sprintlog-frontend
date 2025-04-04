<script lang="ts">
  import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';

  import AddTeamForm from '$lib/components/Teams/AddTeamForm.svelte';

  import { Toast, Modal } from '@skeletonlabs/skeleton';
 
  const modalRegistry: Record<string, ModalComponent> = {
    AddTeamModal: { ref: AddTeamForm }
  };
</script>

<Toast />
<Modal components={modalRegistry} />
<slot />
