<template>
  <div class="tracks">
    <v-card
      dark
      class="track pa-4 mt-4 d-flex align-center"
      v-for="track in tracks"
      :key="track.id"
    >
      <v-btn
        class="play-btn"
        title="Listen a preview"
        v-on:click.prevent.stop="playPreview(track.preview_url, $event)"
        :key="track.id"
        v-if="track.preview_url !== null"
        dark
      >
        <audio :src="track.preview_url"></audio>
        <i class="v-icon notranslate mdi theme--dark" :class="icons.play"></i>
      </v-btn>
      <a
        :href="track.external_urls.spotify"
        target="_blank"
        class="text-decoration-none white--text pl-3"
      >
        {{ track.name }}
      </a>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AlbumTracksList",
  props: {
    tracks: Array
  },
  beforeDestroy() {
    this.activeAudio.instance.pause();
  },
  data: () => ({
    activeAudio: {
      instance: new Audio(),
      lastAudioClickedBtn: Object
    },
    icons: {
      play: "mdi-play",
      pause: "mdi-pause"
    }
  }),
  methods: {
    playPreview(sound, event) {
      const currentAudio = this.activeAudio.instance;
      const isPlaying = !currentAudio.paused;
      const clickedBtn = event.currentTarget.querySelector(".v-icon");

      if (currentAudio.src !== sound && isPlaying) {
        currentAudio.pause();
        currentAudio.src = sound;
        currentAudio.play();
        this.handlePlayIconToggle(
          this.lastAudioClickedBtn,
          this.icons.pause,
          this.icons.play
        );
        this.handlePlayIconToggle(
          clickedBtn,
          this.icons.play,
          this.icons.pause
        );
      } else if (isPlaying) {
        currentAudio.pause();
        this.handlePlayIconToggle(
          clickedBtn,
          this.icons.pause,
          this.icons.play
        );
      } else {
        if (currentAudio.src !== sound) {
          currentAudio.src = sound;
        }
        currentAudio.play();
        this.handlePlayIconToggle(
          clickedBtn,
          this.icons.play,
          this.icons.pause
        );
      }

      currentAudio.onended = () =>
        this.handlePlayIconToggle(
          clickedBtn,
          this.icons.pause,
          this.icons.play
        );
      this.lastAudioClickedBtn = clickedBtn;
    },
    handlePlayIconToggle(el, removeClass, addClass) {
      el.classList.remove(removeClass);
      el.classList.add(addClass);
    }
  }
};
</script>
