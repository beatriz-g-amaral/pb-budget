import axios from 'axios';

const authService = {
  user: null,

  async register(username, password, email) {
    try {
      const response = await axios.post('http://localhost:3000/usuario/cadastro', {
        nomeUsuario: username,
        senha: password,
        email: email
      });
      if (response.data.success) {
        this.user = { username, role: response.data.role };
       }
    } catch (error) {
      console.log(error);
    }
  },

  async login(username, password) {
    try {
      const response = await axios.post('http://localhost:3000/usuario/login', {
        nomeUsuario: username,
        senha: password
      });
      if (response.data.success) {
        this.user = { username, role: response.data.role };
      }
    } catch (error) {
      console.log(error);
    }
  },

  logout() {
    this.user = null;
  },

  isAuthenticated() {
    return this.user !== null;
  },

  hasAccess(role) {
    if (this.user) {
      return this.user.role === role;
    }
    return false;
  }
};

export default authService;
