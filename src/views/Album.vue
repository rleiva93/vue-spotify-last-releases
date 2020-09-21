<template>
  <div class="album">
    <div class="album-info" v-if="album.loaded">
      <album-img :album="album.data"></album-img>

      <div class="col-data">
        <album-data :album="album.data"></album-data>
        <album-tracks-list :tracks="album.data.tracks.items"></album-tracks-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    this.$store.dispatch("spotify/loadAlbum", this.$attrs.id);
  },
  computed: mapState({
    album: (state) => state.spotify.album,
  })
};
</script>

<style lang="scss" scoped>
.album {
  padding-top: 1rem;

  .album-info {
    display: grid;
    grid-auto-rows: 2fr;
    grid-template-columns: repeat(auto-fit, minmax(712px, 1fr));

    .col-data {
      text-align: left;
    }
  }
}
</style>
