<template>
  <v-row class="albums" v-scroll="onScroll">
    <v-col col-xs="3" v-for="album in albumsList" :key="album.id">
      <router-link :to="`/album/${album.id}`" class="text-decoration-none">
        <album-figure :album="album"></album-figure>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import AlbumFigure from "@/components/AlbumFigure";
import isBottomOfWindow from "@/util/isBottomOfWindow";

export default {
  name: "AlbumsList",
  components: {
    "album-figure": AlbumFigure
  },
  created() {
    this.$store.dispatch("spotify/loadNewReleases");
  },
  computed: mapState({
    albumsList: (state) => state.spotify.albumsList,
    isPaginationFinished: (state) => state.spotify.pagination.finished,
  }),
  methods: {
    onScroll() {
      if (isBottomOfWindow() && !this.isPaginationFinished) {
        this.$store.dispatch("spotify/loadNewReleases");
      }
    }
  }
};
</script>