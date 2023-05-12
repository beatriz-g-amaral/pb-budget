<template>
  <div class="lista">
    <h1>Lista de Clientes Ativos</h1>
    <ul>
      <CompanyTables v-model:items="displayedCompanies"  :filterPaid="true" />
    </ul>
  </div>
</template>

<script>
import CompanyTables from '@/components/Company/CompanyTables.vue';
import axios from 'axios';
export default {
  name: 'SideBarHome',
  components: {
    CompanyTables
  },
  data() {
    return {
      displayedCompanies: []
    };
  },
  created() {
    axios.get('http://localhost:3000/company')
      .then(response => {
        this.companies = response.data;
        this.displayedCompanies = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  computed: {
  filteredCompanies() {
    if (this.filterPaid) {
      return this.items.filter(item => item.situacaoPagamento === 'sim');
    } else {
      return this.items;
    }
  }
}

};
</script>

<style>
.lista {
  padding-top: 16px;
}
</style>
