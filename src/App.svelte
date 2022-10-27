<script lang="ts">
  import { Router, Route, Link } from "svelte-navigator";
  import PodcastDetail from "./lib/PodcastDetail.svelte";
  import Podcasts from "./lib/Podcasts.svelte";
</script>

<Router>
  <header>
    <Link to="/"><h1>Alphy</h1></Link>

    <!-- <nav>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="profile">Profile</Link>
    </nav> -->
  </header>

  <main>
    <Route path="/">
      <Podcasts />
    </Route>
    <Route path="/podcasts/:podcastId" let:params>
      <PodcastDetail podcastId={Number(params.podcastId)} />
    </Route>
  </main>
</Router>
