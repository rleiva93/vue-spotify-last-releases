<template>
  <div class="home">
    <a href="http://spotify.com/" target="_blank">
      <img class="spotify-logo" :src="require('@/assets/spotify-logo.png')" alt="Spotify" />
    </a>
    <h1 class="title">New releases</h1>
    <AlbumsList />
  </div>
</template>

<script>
import AlbumsList from "@/components/AlbumsList";

export default {
  name: "Home",
  components: {
    AlbumsList
  }
};
</script>

<style lang="scss">
  .home {
    padding-top: 1rem;

    .spotify-logo {
      max-width: 130px;
    }

    .title {
      margin-top: 0;
    }
  }
</style>