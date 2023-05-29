<template>
  <div>
    <input class="form-control" type="text" v-model="registerUsername" placeholder="Username">
    <input class="form-control" type="password" v-model="registerPassword" placeholder="Password">
    <input class="form-control" type="email" v-model="registerEmail" placeholder="Email">
    <button @click="register">Register</button>
  </div>
</template>

<script>
import auth from '@/routes/Auth';
import router from '@/routes/routes.js';

export default {
  name: 'RegisterPage',
  data() {
    return {
      registerUsername: '',
      registerPassword: '',
      registerEmail: ''
    };
  },
  methods: {
    register() {
      auth.register(this.registerUsername, this.registerPassword, this.registerEmail)
        .then(() => {
          this.registerUsername = '';
          this.registerPassword = '';
          this.registerEmail = '';
          alert('Registro realizado com sucesso!');
          router.push('/login'); 
        });
    }
  }
};
</script>
