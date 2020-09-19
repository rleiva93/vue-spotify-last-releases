<template>
  <div class="home">
    {{ tracks }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: mapState({
    tracks: state => state.spotify.tracks
  }),
  created() {
    this.$store.dispatch("spotify/getNewReleases");
  }
};
</script>
