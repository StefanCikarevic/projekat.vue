<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <input type="email" id="email" @input="$v.email.$touch()" v-model="email" />
        </div>
        <div class="input" :class="{ invalid : $v.password.$error}">
          <label for="password">Password</label>
          <input type="password" id="password" @input="$v.password.$touch()" v-model="password" />
        </div>
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
      <div class="alert alert-light col" role="alert">{{greska}}</div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      error: "",
      email: "",
      password: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    async onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      console.log(formData);
      this.$store
        .dispatch("login", {
          email: formData.email,
          password: formData.password
        })
        .then(() => {
          this.$router.push({
            name: "DashboardPage"
          });
        });
    }
  },
  computed: {
    greska() {
      return this.$store.state.errorSignin;
    }
  }
};
</script>

<style scoped>
.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #315ff5;
  background-color: #eee;
}

.submit button {
  border: 1px solid #315ff5;
  color: #315ff5;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #315ff5;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
.alert {
  background-color: #f0f8ff;
  border: #f0f8ff;
  color: red;
}
.input.invalid input {
  border: 1px solid red;
  background-color: #ffc9aa;
}
.input.invalid label {
  color: red;
}
</style>