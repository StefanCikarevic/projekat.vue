import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'
import db from './firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorSignin: "",
    putanja: "",
    userMovies: "",
    userEmail: "",
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup({ commit, dispatch }, authData) {
      axios.post('/accounts:signUp?key=AIzaSyB-E95vJx8R-2lqK8k8-MzkXBrXv4o8ekw', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          this.state.userEmail = res.data.email;
          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    login({ commit, dispatch }, authData) {
      return new Promise((resolve, reject) => {
        axios.post('/accounts:signInWithPassword?key=AIzaSyB-E95vJx8R-2lqK8k8-MzkXBrXv4o8ekw', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
          .then(res => {
            console.log(res)
            const now = new Date()
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('userId', res.data.localId)
            localStorage.setItem('expirationDate', expirationDate)
            this.state.userEmail = res.data.email;
            this.state.errorSignin = "";

            commit('authUser', {
              token: res.data.idToken,
              userId: res.data.localId
            })
            dispatch('setLogoutTimer', res.data.expiresIn);
            resolve();
          })
          .catch(error => {
            this.state.errorSignin = "Incorrect username or password!",
              console.log(error);
            reject();
          })
      })
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          console.log(data)
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }


          console.log(state.userEmail);
          var user = null;
          for (const u in users) {
            if (users[u].email === state.userEmail) {
              user = users[u];
            }
          }

          commit('storeUser', user)
        })
        .catch(error => console.log(error))
    },
    addMovie({ commit, state }, movie) {

      state.userMovies = movie;
      var data = {
        movie: state.userMovies,
        email: state.userEmail

      }
      console.log(state.userMovies);
      // globalAxios.post('/movies.json' + '?auth=' + state.idToken, data)
      //  .then(res => console.log(res))
      //  .catch(error => console.log(error))

      if (state.putanja === "") {

        db.collection("movies").add(
          {
            movie: state.userMovies,
            email: state.userEmail
          }
        )
          .then(res => {

            this.state.putanja = res.id
            console.log(res)
          })

          .catch(function (error) {
            console.error("Error writing document: ", error);
          });

      } else {

        db.collection("movies").doc(state.putanja).update(
          {
            movie: state.userMovies,
            email: state.userEmail
          }
        )
          .then(res =>
            console.log(res))
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });

      }



    },
    fetchMovies({ commit, state }) {
      if (!state.idToken) {
        return
      }

      db.collection('movies').where('email', '==', this.state.userEmail).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("ovde")
          console.log(doc.data().movie)
          state.userMovies = doc.data().movie;
        })
      })

    }
    /* globalAxios.get('/movies.json' + '?auth=' + state.idToken)
       .then(res => {
         console.log(res)
         const data = res.data
         const movies = []
         for (let key in data) {
           const user = data[key]
           if (user.email === state.userEmail) {

             movies.push(user)
           }

         }
         state.userMovies = movies[movies.length - 1].movie

       })
       .catch(error => console.log(error))
   }*/

  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.idToken !== null
    },
    watchMovie(state) {
      return state.userMovies
    }
  }
})