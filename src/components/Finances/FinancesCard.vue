<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Companies</h5>
    </div>
    <div class="card-body">
      <div v-for="item in items" :key="item.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ item.nome }}</h5>
          <p class="card-text">{{ item.mensagem }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'FinancesCard',
  data() {
    return {
      items: [],
    };
  },
  created() {
    // TODO create the resolver that catch the data form nest anf then put here
    // axios.get('http://localhost:3000/company')
    //   .then(response => {
    //     this.items = response.data;
    //   })import axios from 'axios';
    //   .catch(error => {
    //     console.error(error);
    //   });
  },
};
</script>
