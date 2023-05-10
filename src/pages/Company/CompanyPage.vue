<template>
  <div>
    <h1>Consulta de Locais</h1>
    <SearchCompany :filterFunction="filterCompanies" />
    <CompanyTable v-model:items="displayedCompanies" />

    <div>
    <button @click="showModal = true">Mostrar Modal</button>
    <BaseModal v-model:visible="showModal">
      <template v-slot:header>
        <h3>Header do Modal</h3>
      </template>
      <template v-slot:body>
        <p>Corpo do Modal</p>
      </template>
      <template v-slot:footer>
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" @click="closeModal()">Fechar</button>
      </template>
    </BaseModal>
  </div>

  </div>
</template>

<script>
import SearchCompany from '../../components/Company/SearchCompany.vue'
import CompanyTable from '../../components/Company/CompanyTables.vue'
import BaseModal from '../../components/Base/BaseModal.vue'

import axios from 'axios';

export default {
  name: 'CompanyPage',
  components: {
    SearchCompany,
    CompanyTable,
    BaseModal
  },
  data() {
    return {
      companies: [],
      displayedCompanies: [],
      selectedCompany: null,
      showModal: false
    }
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
  methods: {
    filterCompanies(company) {
      this.displayedCompanies = this.companies.filter(c => c.CDLOCAL === company.CDLOCAL);
    },
    openModal() {
      console.log("Opening modal");
      this.showModal = true;
    },
    closeModal() {
      console.log("Closing modal");
      this.showModal = false;
    }
  }

}
</script>
