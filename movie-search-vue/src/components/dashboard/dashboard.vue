<template>
  <div id="dashboard">
    <h1>Searching</h1>
    <p v-if="email">Your email address: {{ email }}</p>
    <app-home></app-home>
  </div>
</template>

<script>
import axios from "axios";
import Home from "../Home";

export default {
  components: {
    appHome: Home
  },
  computed: {
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
  }
};
</script>

<style scoped>
h1{
  color: red;
  text-align: center
}

p {
  text-align: center;
}

p {
  color: red;
}
</style>