<template>
  <main class="container mt-2">
    <form @submit.prevent="getResults">
      <div class="form-group">
        <label for="searchTerm">Search</label>
        <input
          v-model="searchTerm"
          type="text"
          class="form-control"
          id="searchTerm"
          placeholder="Enter a movie title"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
      <!-- <button type="submit" class="btn btn-primary" @click="proba">PROBa</button> -->
    </form>

    <section class="row movies-area">
      <section class="mt-2 row col-9 row" id="results">
        <div v-if="error" class="alert alert-danger col" role="alert">{{error}}</div>
        <movie
          class="card col-4"
          v-for="movie in results"
          :key="movie.id"
          :movie="movie"
          :isInWatchLater="isInWatchLater"
          :wathcMovieLater="wathcMovieLater"
        ></movie>
      </section>
      <section class="mt-2 row col-3 row">
        <h3>Wahtch later {{movies}}</h3>
        <section class="row" id="watch-later">
          <movie
            class="card col-12"
            v-for="movie in watchLater"
            :removeWatchLater="removeWatchLater"
            :key="movie.id"
            :movie="movie"
          ></movie>
        </section>
        <button @click="saveMovies" type="submit" class="btn btn-primary" id="btnSave">Save</button>
      </section>
    </section>
  </main>
</template>

<script>
import Movie from "@/components/Movie";
import { log } from "util";

export default {
  name: "home",
  components: {
    Movie
  },
  data: () => ({
    error: "",
    searchTerm: "",
    results: [],
    watchLater: []
  }),
  computed: {
    movies() {
      if (typeof this.$store.getters.watchMovie.movie == "undefined") {
        return;
      }
      this.watchLater = this.$store.getters.watchMovie.movie;
      console.log("usao je u filmove");
      console.log(this.watchLater);
    }
  },
  created() {
    this.$store.dispatch("fetchMovies");
  },

  methods: {
    // proba(){
    //   console.log('KLIK');
    //   this.$db.collection('users').get().then(snap=>{
    //     snap.forEach (doc=>{
    //       console.log(doc);
    //     })
    //   }).catch(err=> console.log(err));
    // },
    async getResults() {
      const url = `http://www.omdbapi.com/?s=${this.searchTerm}&apikey=a5af89ca`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Error) {
        this.results = [];
        this.error = data.Error;
      } else {
        this.results = data.Search;
        this.error = "";
      }
    },

    wathcMovieLater(movie) {
      this.watchLater.push(movie);
    },

    isInWatchLater(movie) {
      return this.watchLater.some(wl => wl.imdbID === movie.imdbID);
    },
    removeWatchLater(movie) {
      const index = this.watchLater.indexOf(movie);
      this.watchLater.splice(index, 1);
     // this.$store.dispatch("addMovie", { movie: this.watchLater });
    },
    saveMovies() {
      this.$store.dispatch("addMovie", { movie: this.watchLater });
    }
  }
};
</script>

<style scoped>
.movies-area {
  justify-content: space-around;
  align-items: flex-start;
}

#btnSave {
  color: #315ff5;
  margin-top: 20px;
  margin-left: 20px;
}
</style>


