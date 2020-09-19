<template>
  <div class="home">
    <ul>
      <li v-for="album in albums" :key="album.id">
        {{ album.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: mapState({
    albums: state => state.spotify.albums
  }),
  created() {
    this.$store.dispatch("spotify/getNewReleases");
  }
};
</script>
