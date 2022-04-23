<template>
  <div id="welcome">
    <h1>Welcome to official website for searching movies!</h1>
    <br>
    <p>Welcome to most powerful title search. Using the options below you can combine a variety of the types of information we catalog to create extremely specific searches. Want Canadian horror movies of the 1970s that at least 100 users have given an average rating above a 6? You can find them here.</p>
    <div class="cta">
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<style scoped>
#welcome {
  padding: 150px;
  width: 70%;
  margin: auto;
}

h1 {
  text-align: center;
}

p {
  color: black;
  text-align: center;
}

.cta {
  width: 300px;
  margin: auto;
  text-align: center;
}

.cta a {
  margin: 10px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #315ff5;
  border-radius: 3px;
  width: 100px;
  padding: 10px;
  box-sizing: border-box;
  color: #315ff5;
}

.cta a:hover,
.cta a:active {
  background-color: #315ff5;
  color: white;
}
</style>