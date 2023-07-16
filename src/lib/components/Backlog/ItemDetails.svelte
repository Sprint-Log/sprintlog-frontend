<!-- Item.svelte -->
<!-- Item.svelte -->
<script>
    export let item;
    export let handleItemClick;
  
    function getItemClass(property) {
      switch (property) {
        case 'status':
          return 'variant-soft-primary';
        case 'category':
          return 'variant-soft-secondary';
        case 'priority':
          return 'variant-soft-surface';
        case 'progress':
          return 'variant-soft-primary';
        case 'due_date':
          return 'variant-soft-surface';
        case 'assignee_name':
          return 'variant-soft-secondary';
        case 'title':
          return 'variant-soft-primary';
        case 'beg_date':
          return 'variant-soft-surface';
        case 'slug':
          return 'variant-soft-secondary';
        default:
          return '';
      }
    }
  </script>
  
  <span
    class="variant-ringed-surface hover:variant-soft-secondary py-1 px-1 rounded cursor-pointer"
    class:variant-soft-primary={item.property === 'status' && item.value === 'priority'}
    class:variant-soft-secondary={item.property === 'status' && item.value === 'secondary'}
    class:variant-soft-surface={item.property === 'status' && item.value === 'surface'}
    class:variant-soft-primary={item.property === 'category' && item.value === 'priority'}
    class:variant-soft-secondary={item.property === 'category' && item.value === 'secondary'}
    class:variant-soft-surface={item.property === 'category' && item.value === 'surface'}
    class:variant-soft-primary={item.property === 'priority' && item.value === 'priority'}
    class:variant-soft-secondary={item.property === 'priority' && item.value === 'secondary'}
    class:variant-soft-surface={item.property === 'priority' && item.value === 'surface'}
    class:variant-soft-primary={item.property === 'progress' && item.value === 'priority'}
    class:variant-soft-secondary={item.property === 'progress' && item.value === 'secondary'}
    class:variant-soft-surface={item.property === 'progress' && item.value === 'surface'}
    class:variant-soft-surface={item.property === 'due_date' && item.value === 'surface'}
    class:variant-soft-secondary={item.property === 'assignee_name' && item.value === 'secondary'}
    class:variant-soft-primary={item.property === 'title' && item.value === 'priority'}
    class:variant-soft-surface={item.property === 'beg_date' && item.value === 'surface'}
    class:variant-soft-secondary={item.property === 'slug' && item.value === 'secondary'}
    on:click={() => handleItemClick(item.property)}
  >
    {item.property}
  </span>
  
  
  <!-- Repeat the above code for other item properties -->
  
  <!-- Usage in parent component -->
  <script>
    import Item from './Item.svelte';
  
    let items = [
      { property: 'status', value: 'priority' },
      { property: 'category', value: 'secondary' },
      { property: 'priority', value: 'surface' },
      { property: 'progress', value: 'priority' },
      { property: 'due_date', value: 'surface' },
      { property: 'assignee_name', value: 'secondary' },
      { property: 'title', value: 'priority' },
      { property: 'beg_date', value: 'surface' },
      { property: 'slug', value: 'secondary' },
    ];
  
    function handleItemClick(value) {
      // Handle the item click event
      console.log('Item clicked:', value);
    }
  </script>
  
  <div class="flex-1">
    {#each items as item}
      <Item {item} {handleItemClick} itemClass={getItemClass(item.property)} />
    {/each}
  </div>
  