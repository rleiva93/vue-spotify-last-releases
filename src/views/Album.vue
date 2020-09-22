<template>
  <v-row class="album" v-if="album.loaded">
    <v-col cols-xs="7" class="album-info">
      <album-img :album="album.data"></album-img>
    </v-col>
    <v-col cols-xs="3">
      <album-data :album="album.data"></album-data>
      <album-tracks-list :tracks="album.data.tracks.items"></album-tracks-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AlbumImg from '@/components/AlbumImg';
import AlbumData from '@/components/AlbumData';
import AlbumTracksList from '@/components/AlbumTracksList';

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
  computed: mapState({
    album: (state) => state.spotify.album,
  }),
  methods: mapActions({
    loadAlbum: "spotify/loadAlbum"
  })
};
</script>