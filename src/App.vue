<template>
  <div id="app">
    <nav class="main-nav">
      <div class="logo">
        <img src="@/assets/Imperialogo.png" alt="Big Boat" style="height: 100px;">
      </div>
      <Burger></Burger>
    </nav>

    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/finances">Finances</router-link></li>
        <li><router-link to="/company">Company</router-link></li>
        <li><router-link to="/calendar">Calendar</router-link></li>
      </ul>
    </Sidebar>

    <router-view></router-view>
  </div>
</template>ß

 
 <script>
 import Burger from './components/Menu/Burger.vue';
 import Sidebar from './components/Menu/Sidebar.vue';
 
 export default {
  name: 'app',
  components: {
    Burger,
    Sidebar
  }
 }
 </script>
 <style>
 html {
    height: 100%;
    overflow:hidden;
  }
 
  body {
    border: 0; margin: 0; padding: 0;
    font-family: 'Lato';
    height: 100%;
    background: rgb(114, 114, 114);
  }
 
  .logo {
    align-self: center;
    color: #fff;
    font-weight: bold;
    font-family: 'Lato'
  }
 
  .main-nav {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.8rem;
  }
 
  ul.sidebar-panel-nav {
    list-style-type: none;
  }
 
  ul.sidebar-panel-nav > li > a {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    padding-bottom: 0.5em;
  }
 </style>