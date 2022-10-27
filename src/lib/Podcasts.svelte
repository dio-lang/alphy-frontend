<script lang="ts">
  import { Link } from "svelte-navigator";
  import { getPodcasts } from "../Database";
  import { Shadow } from "svelte-loading-spinners";
  import { onMount } from "svelte";
  import Tags from "./Tags.svelte";

  let loading = false;
  let podcasts: Awaited<ReturnType<typeof getPodcasts>>;

  onMount(async () => {
    loading = true;
    podcasts = await getPodcasts();
    loading = false;
  });
</script>

{#if loading}
  <Shadow size="60" color="#FF3E00" unit="px" />
{:else if podcasts}
  {#each podcasts as podcast}
    <article>
      <Link to={`/podcasts/${podcast.id}`}
        ><strong>{podcast.title}</strong></Link
      >
      <em>{podcast.creator.name}</em>
      <Tags tags={podcast.tags} />
    </article>
  {/each}
{:else}
  <h2>Error</h2>
{/if}
