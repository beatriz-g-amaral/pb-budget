<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:"FinancesList",
  data() {
    return {
      items: [],
    };
  },
  created() {
    axios.get('http://localhost:3222/company')
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>
