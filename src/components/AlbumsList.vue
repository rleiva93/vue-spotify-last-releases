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
import { mapState, mapActions } from "vuex";
import AlbumFigure from "@/components/AlbumFigure";
import isBottomOfWindow from "@/util/isBottomOfWindow";

export default {
  name: "AlbumsList",
  components: {
    "album-figure": AlbumFigure
  },
  data: () => ({
    isLoading: false,
    lastOffset: Number
  }),
  created() {
    this.loadNewReleases();
  },
  computed: mapState({
    albumsList: (state) => state.spotify.albumsList,
    pagination: (state) => state.spotify.pagination,
  }),
  methods: {
    ...mapActions({
      loadNewReleases: "spotify/loadNewReleases"
    }),
    onScroll() {
      if (
        isBottomOfWindow() &&
        !this.pagination.finished &&
        this.lastOffset !== this.pagination.offset
      ) {
        this.loadNewReleases();
        this.lastOffset = this.pagination.offset;
      }
    }
  }
};
</script>
