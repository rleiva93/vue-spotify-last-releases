<template>
  <v-row
    v-if="albumsList && albumsList.length > 0"
    class="albums"
    v-scroll.prevent.stop="onScroll"
  >
    <v-col col-xs="3" v-for="album in albumsList" :key="album.id">
      <router-link :to="`/album/${album.id}`" class="text-decoration-none">
        <album-figure :album="album"></album-figure>
      </router-link>
    </v-col>
  </v-row>
  <v-row v-else-if="releasesListError" class="justify-center">
    <p class="error-msg red--text text-center">An error happened. Please try again.</p>
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
import AlbumFigure from "@/components/AlbumFigure";
import isBottomOfWindow from "@/util/isBottomOfWindow";

export default {
  name: "AlbumsList",
  components: {
    "album-figure": AlbumFigure
  },
  data: () => ({
    lastOffset: Number
  }),
  created() {
    this.loadNewReleases();
  },
  computed: mapState({
    albumsList: state => state.spotify.albumsList,
    pagination: state => state.spotify.pagination,
    releasesListError: state => state.spotify.releasesListError
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
