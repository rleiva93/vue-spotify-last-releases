<template>
  <v-card dark class="pa-5" height="100%">
    <v-img
      class="mx-auto"
      :aspect-ratio="1"
      :lazy-src="album.images[1].url"
      :src="album.images[1].url"
      :alt="album.name"
      width=300
      contain
    ></v-img>
    <v-card-title class="pb-0 px-0">{{ joinProperty(album.artists, "name") }}</v-card-title>
    <v-card-text class="text-left pt-0 px-0">{{ album.name }}</v-card-text>
  </v-card>
</template>

<script>
import joinProperty from "@/util/joinProperty";

export default {
  name: "AlbumFigure",
  props: {
    album: Object,
  },
  methods: {
    joinProperty,
  }
};
</script>

<style lang="scss" scoped>
.v-card__title,
.v-card__title {
  word-break: normal;
}
</style>