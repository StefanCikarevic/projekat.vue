<template>
  <div class="row">
    <div class="col-md-4">
      <img :src="movie.Poster" class="thumbnail" />
    </div>
    <div class="col-md-6">
      <h2>{{movie.Title}}</h2>
      <ul class="list-group">
        <li class="list-group-item">Plot: {{movie.Plot}}</li>
        <li class="list-group-item">Year: {{movie.Year}}</li>
        <li class="list-group-item">Genre: {{movie.Genre}}</li>
        <li class="list-group-item">Released: {{movie.Released}}</li>
        <li class="list-group-item">Runtime: {{movie.Runtime}}</li>
        <li class="list-group-item">Director: {{movie.Director}}</li>
        <li class="list-group-item">Writer: {{movie.Writer}}</li>
        <li class="list-group-item">Actrors: {{movie.Actors}}</li>
        <li class="list-group-item">Production: {{movie.Production}}</li>
        <li class="list-group-item">Awards: {{movie.Awards}}</li>
        <li class="list-group-item">imdbRating: {{movie.imdbRating}}</li>
      </ul>
      <button @click="navigateToHome" class="btn btn-primary" id="btn-inf">Go to Home</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: {}
    };
  },
  created() {
    this.axios
      .get(
        "http://www.omdbapi.com/?i=" +
          this.$route.params.id +
          "&apikey=a5af89ca"
      )
      .then(response => {
        this.movie = response.data;
      });
  },
  methods: {
    navigateToHome() {
      this.$router.push({ name: "DashboardPage" });
    }
  }
};
</script>


<style>
.col-md-4 {
  margin-left: 70px;
  margin-top: 20px;
}

.col-md-6 {
  margin-top: 20px;
  color: black;
}

.row img {
  width: 80%;
}

#btn-inf {
  margin-top: 20px;
}
</style>