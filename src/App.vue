<template>
  <v-app class="theme--dark">
    <v-main>
      <v-container>
        <Header />
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header
  }
}
</script>