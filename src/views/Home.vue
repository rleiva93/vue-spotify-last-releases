<template>
  <div class="home">
    <h1>Here is the official new album releases list from Spotify</h1>
    <Albums />
  </div>
</template>

<script>
import Albums from "@/components/Albums";

export default {
  name: "Home",
  components: {
    Albums
  }
};
</script>
