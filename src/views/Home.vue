<template>
  <div class="home">
    <a href="http://spotify.com/" target="_blank">
      <img :src="require('@/assets/spotify-logo.png')" alt="Spotify" />
    </a>
    <h1>New releases</h1>
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

<style lang="scss" scoped>
  .home {
    padding-top: 1rem;

    img {
      max-width: 130px;
    }

    h1 {
      margin-top: 0;
    }
  }
</style>