<template>
  <div>
    <div class="company">
      <h1>Clientes</h1>
      <SearchCompany :filterFunction="filterCompanies" />
      <button class="btn btn-primary" @click="showModal = true">Criar Cliente</button>
      <BaseModal :title="modalTitle" :is-open="showModal" @open="openModal" @close="closeModal" @submit="createCompany">
        <input class="form-control" type="text" v-model="localCompanyName" placeholder="Name">
        <input class="form-control" type="text" v-model="localCompanyCode" placeholder="companyCode">
        <input class="form-control" type="text" v-model="localCompanypaymentsituation" placeholder="paymentsituation">
        <input class="form-control" type="date" v-model="localCompanyPaymentDate" placeholder="companyDate">
        <input class="form-control" type="text" v-model="localCompanyService" placeholder="service">
      </BaseModal>
     

    </div>
    <CompanyTable v-model:items="displayedCompanies" v-on:delete="deleteCompany" />
    <div>
    </div>

  </div>
</template>

<script>
import SearchCompany from '../../components/Company/SearchCompany.vue'
import CompanyTable from '../../components/Company/CompanyTables.vue'
import BaseModal from '@/components/Base/BaseModal.vue';


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
      showModal: false,
      modalTitle: 'Criar Cliente',
      body: 'teste de criar',
      name: 'Adicionar cliente',
      companies: [],
      displayedCompanies: [],
      selectedCompany: null,
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
      if (company) {
        this.displayedCompanies = this.companies.filter(c => c.codigo === company.codigo);
      } else {
        this.displayedCompanies = this.companies;
      }

    },


    openModal() {
      console.log("Opening modal");
      this.showModal = true;
    },
    closeModal() {
      console.log("Closing modal");
      this.showModal = false;
    },
    createCompany(companyData) {
      axios.post('http://localhost:3000/company', companyData)
        .then(response => {
          console.log(response.data);
          this.closeModal();
          axios.get('http://localhost:3000/company')
            .then(response => {
              this.companies = response.data;
              this.displayedCompanies = response.data;
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          // Handle errors
          if (error.response && error.response.status === 409) {
            console.error('Company code already exists');
          } else {
            console.error(error);
          }
        });
    },

    deleteCompany(codigo) {
      console.log('here2');
      axios.delete(`http://localhost:3000/company/${codigo}`)
        .then(response => {
          console.log(response.data);
          this.displayedCompanies = this.displayedCompanies.filter(company => company.codigo !== codigo);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>
<style>
.company {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

}
</style>