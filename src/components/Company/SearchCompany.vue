<template>
  <div class="search-company">
    <div class="input-group">
      <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
        v-model="searchTerm" placeholder="Digite o codigo">
        <button class="btn btn-info" @click="searchCompany">Pesquisar</button>
    </div>
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchCompany',
  data() {
    return {
      searchTerm: '',
      searchResult: []
    }
  },
  props: {
    filterFunction: {
      type: Function,
      required: true,
      default: () => (localId) => console.log(localId)
    }
  },
  methods: {
    async searchCompany() {
      try {
        const response = await axios.get(`http://localhost:3000/company/${this.searchTerm}`)
        const companies = response.data;
        this.filterFunction(companies);
      } catch (error) {
        console.error(error);
      }
    },

    selectCompany(company) {
      this.searchTerm = company.codigo;
      this.searchResult = [];
      this.$emit('company-selected', company);
    },

    clearSearch() {
      this.searchTerm = '';
      this.filterFunction(this.companies);
    }
  }
}
</script>

<style>
.search-company {
  display: flex;
  flex-direction: column;
}
</style>
