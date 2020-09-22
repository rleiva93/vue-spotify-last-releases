<template>
  <div>
    <h1 class="pt-0">{{ joinProperty(album.artists, "name") }}</h1>
    <h2>{{ album.name }}</h2>
    <p class="caption">{{ album.label }}</p>
    <p class="caption">{{ album.release_date | formatDate }}</p>
  </div>
</template>

<script>
import joinProperty from "@/util/joinProperty";

export default {
  name: "AlbumData",
  props: {
    album: Object,
  },
  methods: {
    joinProperty,
  },
  filters: {
    formatDate: (date) => {
      const albumDate = new Date(date);
      const now = new Date();
      const timeDifference = now.getTime() - albumDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      let releasedDate = "";

      if(daysDifference === 0) {
        releasedDate = "Today";
      } else if(daysDifference === 1) {
        releasedDate = `${daysDifference} day ago`;
      } else if(daysDifference > 1) {
        releasedDate = `${daysDifference} days ago`;
      }

      return releasedDate;
    }
  }
};
</script>
