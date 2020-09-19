<template>
  <section class="albums">
    <a
      v-for="album in albums"
      :key="album.id"
      :href="album.external_urls.spotify"
      target="_blank"
    >
      <figure>
        <img :src="album.images[1].url" :alt="album.name">
        <figcaption>
          <p>
            <strong>{{ getArtists(album.artists) }}</strong>
          </p>
          <p>
            <i>{{ album.name }}</i>
          </p>
        </figcaption>
      </figure>
    </a>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AlbumsList",
  created() {
    this.$store.dispatch("spotify/loadNewReleases");
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: mapState({
    albums: state => state.spotify.albums,
    isPaginationFinished: state => state.spotify.pagination.finished
  }),
  methods: {
    handleScroll() {
      const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
      if(bottomOfWindow && !this.isPaginationFinished) {
        this.$store.dispatch("spotify/loadNewReleases");
      }
    },
    getArtists(artists) {
      return artists.map(({name}) => name).join(", ");
    }
  }
}
</script>

<style lang="scss">
  .albums {
    display: grid;
    grid-auto-rows: 2fr;
    grid-template-columns: repeat(auto-fit, minmax(470px, 1fr));

    a {
      color: #ffffff;
      height: 100%;
      text-decoration: none;

      figure {
        background: #282828;
        border-radius: 5px;
        height: 80%;
        padding: 30px;

        figcaption {
          margin-top: 30px;
          text-align: left;
          text-decoration: none;

          p {
            margin: 0;
          }
        }
      }
    }
  }
</style>