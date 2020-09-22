<template>
  <div>
    <a :href="album.external_urls.spotify" target="_blank">
      <v-img :src="album.images[0].url" :alt="album.name"></v-img>
    </a>
    <p class="text-center mt-2 caption">{{ album.copyrights[0].text }}</p>
  </div>
</template>

<script>
export default {
  name: "AlbumImg",
  props: {
    album: Object
  }
}
</script>