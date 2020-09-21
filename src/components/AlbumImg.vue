<template>
  <div>
    <a :href="album.external_urls.spotify" target="_blank">
      <img :src="album.images[0].url" :alt="album.name" />
    </a>
    <p>
      {{ album.copyrights[0].text }}
    </p>
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

<style lang="scss" scoped>
img {
  max-width: 100%;
}

p {
  font-size: 0.75em;
  margin: 0;
}
</style>