<template>
   <div class="table-responsive">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>CDLOCAL</th>
          <th>DSLOCAL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td >{{ item.CDLOCAL }}</td>
          <td >{{ item.DSLOCAL}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FinancesTable',
  data() {
    return {
      items: [],
    };
  },
  created() {
    axios.get('http://localhost:3000/company')
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>

