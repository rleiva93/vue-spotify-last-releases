<template>
  <div class="tracks">
    <div class="track" v-for="track in tracks" :key="track.id" :track="track">
      <div
        class="play-btn"
        title="Listen a preview"
        @click.prevent="playPreview(track.preview_url, $event)"
        :key="track.id"
        v-if="track.preview_url !== null"
      ></div>
      <a :href="track.external_urls.spotify" target="_blank">
        {{ track.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumTracksList",
  props: {
    tracks: Array,
  },
  data: () => ({
    activeAudio: {
      instance: new Audio(),
      isPlaying: false,
      lastAudioClickedBtn: Object,
    },
  }),
  methods: {
    playPreview(sound, event) {
      const currentAudio = this.activeAudio.instance;
      const isPlaying = this.activeAudio.isPlaying;
      const clickedBtn = event.target;
      currentAudio.pause();

      if (currentAudio.src === sound && !isPlaying) {
        // Resume paused preview
        currentAudio.play();
        this.activeAudio.isPlaying = true;
      } else if (currentAudio.src !== sound) {
        // Play a different preview
        if (isPlaying) {
          this.activeAudio.lastAudioClickedBtn.classList.remove("pause");
          currentAudio.pause();
        }
        currentAudio.src = sound;
        currentAudio.play();
        this.activeAudio.isPlaying = true;
      } else {
        this.activeAudio.isPlaying = false;
      }

      if (this.activeAudio.isPlaying) {
        clickedBtn.classList.add("pause");
      } else {
        clickedBtn.classList.remove("pause");
      }
      this.activeAudio.lastAudioClickedBtn = clickedBtn;
    },
  },
};
</script>

<style lang="scss" scoped>
.tracks {
  margin-top: 1rem;

  .track {
    background: #282828;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    max-width: 70%;
    padding: 1rem;

    .play-btn {
      width: 44px;
      height: 34px;
      box-sizing: border-box;
      border-style: solid;
      border-width: 17px 0 17px 30px;
      border-color: transparent transparent transparent #ffffff;
      transition: all 100ms ease-in-out;

      &.pause {
        border-style: double;
        border-width: 0 0 0 30px;
      }
    }
    a {
      color: #ffffff;
      text-decoration: none;
    }
  }
}
</style>
