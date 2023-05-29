<template>
  <div class="form">
    <input v-model="username" class="form-control" type="text" placeholder="Username">
    <input v-model="password" class="form-control" type="password" placeholder="Password">
    <button class="btn btn-primary" @click="login">Login</button>
    <button class="btn btn-primary" @click="gotoRegister">Registrar</button>
  </div>
</template>

<script>
import router from '@/routes/routes.js';
import auth from '@/routes/Auth';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      user: auth.user
    };
  },
  computed: {
    isAuthenticated() {
      return auth.isAuthenticated();
    }
  },
  methods: {
    login() {
      auth.login(this.username, this.password)
    .then(response => {
      if (response.success) {
        this.username = '';
        this.password = '';
        alert('Login realizado com sucesso!');
        router.push('/');
      } else {
      alert('Nome de usuário ou senha inválidos');
      }
    })
    .catch(error => {
      console.log(error);
    });
},
    logout() {
      auth.logout();
    },
    gotoRegister() {
      router.push('/register'); 
    }
  }
};
</script>
