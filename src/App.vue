<template>
  <v-app class="theme--dark">
    <v-main>
      <Header />
      <v-container class="mb-15">
        <router-view />
      </v-container>
      <Footer />
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
};
</script>
