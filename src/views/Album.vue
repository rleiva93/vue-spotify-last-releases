<template>
  <v-row class="album" v-if="album.loaded">
    <v-col cols="12" xs="12" md="7" class="album-info">
      <album-img :album="album.data"></album-img>
    </v-col>
    <v-col cols="12" xs="12" md="5">
      <album-data :album="album.data"></album-data>
      <album-tracks-list :tracks="album.data.tracks.items"></album-tracks-list>
    </v-col>
  </v-row>
  <v-row v-else-if="albumError" class="justify-center">
    <p class="error-msg red--text text-center">
      An error happened. Please try again.
    </p>
  </v-row>
  <v-row v-else>
    <v-progress-circular
      :size="70"
      color="green"
      class="loading mx-auto"
      indeterminate
    ></v-progress-circular>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AlbumImg from "@/components/AlbumImg";
import AlbumData from "@/components/AlbumData";
import AlbumTracksList from "@/components/AlbumTracksList";

export default {
  name: "Album",
  components: {
    "album-img": AlbumImg,
    "album-data": AlbumData,
    "album-tracks-list": AlbumTracksList
  },
  created() {
    this.loadAlbum(this.$attrs.id);
  },
  beforeDestroy() {
    this.removeAlbum();
  },
  computed: mapState({
    album: state => state.spotify.album,
    albumError: state => state.spotify.albumError
  }),
  methods: mapActions({
    loadAlbum: "spotify/loadAlbum",
    removeAlbum: "spotify/removeAlbum"
  })
};
</script>
