<template>
  <v-app class="theme--dark">
    <v-main>
      <v-container fluid class="pa-0">
        <Header />
      </v-container>

      <v-container>
        <router-view />
      </v-container>

      <v-container fluid class="pa-0">
        <Footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
html,
body {
  overflow: hidden;
}
</style>