<template>
  <v-row>
    <v-col class="text-center pt-5 pb-0" cols="12">
      <router-link :to="`/`">
        <img :src="require('@/assets/spotify-logo.png')" alt="Spotify" width="130" />
      </router-link>
    </v-col>
    <v-col class="text-center pa-0" cols="12">
      <h1>New releases</h1>
    </v-col>
  </v-row>
</template>
