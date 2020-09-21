<template>
  <v-row class="home">
    <v-col cols="12">
      <AlbumsList />
    </v-col>
  </v-row>
</template>

<script>
import AlbumsList from "@/components/AlbumsList";

export default {
  name: "Home",
  components: {
    AlbumsList
  }
};
</script>
