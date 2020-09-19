<template>
  <section class="albums">
    <a v-for="album in albums" :key="album.id" :href="album.external_urls.spotify" target="_blank">
      <figure>
        <img :src="album.images[1].url" :alt="album.name">
        <figcaption>
          {{ album.name }}
        </figcaption>
      </figure>
    </a>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Albums",
  computed: mapState({
    albums: state => state.spotify.albums
  }),
  created() {
    this.$store.dispatch("spotify/getNewReleases");
  }
}
</script>

<style lang="scss">
  .albums {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    a {
      color: #ffffff;
      text-decoration: none;

      figure {
        background: #282828;
        border-radius: 5px;
        padding: 30px;

        figcaption {
          margin-top: 30px;
          text-align: left;
          text-decoration: none;
        }
      }
    }
  }
</style>