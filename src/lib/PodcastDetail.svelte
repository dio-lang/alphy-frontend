<script lang="ts">
  import { onMount } from "svelte";
  import { getPodcast } from "../Database";
  import { Shadow } from "svelte-loading-spinners";
  import Tags from "./Tags.svelte";
  export let podcastId: number;

  let loading = true;
  let podcast: Awaited<ReturnType<typeof getPodcast>>;

  onMount(async () => {
    loading = true;
    podcast = await getPodcast(podcastId);
    loading = false;
  });
</script>

{#if loading}
  <Shadow size="60" color="#FF3E00" unit="px" />
{:else if podcast}
  <div><strong>{podcast.title}</strong></div>
  <em class="author">{podcast.creator.name}</em>
  <Tags tags={podcast.tags} />
  <p class="transcription">{podcast.transcripton}</p>
{:else}
  <h2>No such podcast</h2>
{/if}

<style>
  p.transcription {
    font-size: small;
    white-space: pre-wrap;
  }
  em.author {
    font-size: medium;
  }
</style>
