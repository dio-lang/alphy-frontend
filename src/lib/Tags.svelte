<script lang="ts">
  export let tags: { name: string; color: string }[];
</script>

<div class="tags">
  {#each tags as tag}
    <span class="tag" style="background: {tag.color};">{tag.name}</span>
  {/each}
</div>

<style>
  div.tags {
    font-size: small;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  span.tag {
    margin: 2px;
    padding: 5px;
    border-radius: 4px;
    color: black;
  }
</style>
