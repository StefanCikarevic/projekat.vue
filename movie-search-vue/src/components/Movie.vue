<template lang="html">
  <div class="film">
    <img class="card-img-top" :src="movie.Poster" :alt="movie.Title" />
    <div class="card-body">
      <h5 class="card-title">{{movie.Title}}</h5>
    

      <div class="btn-group"> 
      <button
        v-if="wathcMovieLater && !isInWatchLater(movie)" 
        @click="wathcMovieLater(movie)"
        type="button" 
        class="btn btn-primary">Watch Later</button>
    
     <button
        v-if="removeWatchLater"
        @click="removeWatchLater(movie)" 
        type="button"
        class="btn btn-danger">Remove</button>

      
       <router-link :to="{path: '/info/' + movie.imdbID, name: 'infoPage', params: { id: movie.imdbID } }" activeClass="active" class="btn btn-primary" tag="button">Information</router-link>
        </div>
    </div>
    
  </div>
</template>

<script>
import Info from "./Info.vue";

export default {
  props: ["movie", "wathcMovieLater", "isInWatchLater", "removeWatchLater"],

  components: {
    appInfo: Info
  }
};
</script>

<style>
.btn-group button {
  background-color: black; /* Green background */
  border: 1px solid white; /* Green border */
  color: white; /* White text */
  padding: 5px 5px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
}
.card-img-top {
  margin-top: 5%;
  margin-left: 10%;
}
.film{

  margin-top: 7%;
  background-color: seashell;
}
</style>
