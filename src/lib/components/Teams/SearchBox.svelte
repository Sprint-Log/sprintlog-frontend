<script>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Search} from '@steeze-ui/carbon-icons';
    
</script>
<form action="" class="w-3/4 ml-auto">
    <div class="relative">
      <input type="text" class="input block h-7 ps-8" placeholder="Search" required />
      <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none">
        <div class="w-4 mx-2">
          <Icon src={Search} />
        </div>
      </div>
    </div>
  </form>