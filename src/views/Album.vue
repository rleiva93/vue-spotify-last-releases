<template>
  <div class="album">
    <div class="col-img">
      <a :href="album.external_urls.spotify" target="_blank">
        <img :src="album.images[0].url" :alt="album.name" />
      </a>
      <p class="copyright" v-for="copyright in album.copyrights" :key="copyright.type">
        {{ copyright.text }}
      </p>
    </div>
    <div class="col-data">
      <p>
        <strong>
          {{ joinProperty(album.artists, "name") }}
        </strong>
      </p>

      <p>
        <i>{{ album.name }}</i>
      </p>

      <p>
        <i>{{ album.label }}</i>
      </p>

      <div class="tracks">
        <div v-for="track in album.tracks.items" :key="track.id">
          <audio v-if="track.preview_url !== null" controls>
            <source :src="track.preview_url" type="audio/mpeg">
          </audio>
          <a :href="track.external_urls.spotify" target="_blank">
            {{ track.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import joinProperty from "@/util/joinProperty";

export default {
  name: "Album",
  created() {
    this.$store.dispatch("spotify/loadAlbum", this.$attrs.id);
  },
  computed: mapState({
    album: state => state.spotify.album
  }),
  methods: {
    joinProperty
  }
}
</script>

<style lang="scss" scoped>
  .album {
    display: grid;
    grid-auto-rows: 2fr;
    grid-template-columns: repeat(auto-fit, minmax(712px, 1fr));

    .col-img {
      img {
        max-width: 100%;
      }

      .copyright {
        font-size: .75em;
        margin: 0;
      }
    }

    .col-data {
      text-align: left;

      p {
        margin: 0;
      }

      a {
        color: #ffffff;
        text-decoration: none;
      }
    }
  }
</style>