<template>
  <div>
    <p>
      <strong>Artist:</strong>&nbsp;{{ joinProperty(album.artists, "name") }}
    </p>
    <p>
      <strong>Album:</strong>&nbsp;{{ album.name }}
    </p>
    <p>
      <small>
        <i>{{ album.label }}</i>
      </small>
    </p>
    <p>
      <small>
        <i>{{ album.release_date | formatDate }}</i>
      </small>
    </p>
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
    formatDate: function(date) {
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

<style lang="scss" scoped>
p {
  margin: 0;
}
</style>
