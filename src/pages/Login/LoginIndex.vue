<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">E-mail:</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      axios.post('http://localhost:3000/auth/login', {
        email: this.email,
        password: this.password,
      })
        .then(response => {
          console.log(response)
          this.$router.push('/home');
        })
        .catch(error => {
          console.log(error)
        });
    },
  },
};
</script>
