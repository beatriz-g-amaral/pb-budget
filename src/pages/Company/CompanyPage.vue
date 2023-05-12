<template>
  <div>
    <div class="company">
      <h1>Clientes</h1>
      <BaseModal :isCreation="isCreation" :haveButton="true" :visible="showModal" :open="openModal" :header="header"
        :name="name" :body="body" @close="closeModal" @submit="createCompany"  />
    </div>
    <SearchCompany :filterFunction="filterCompanies" />
    <CompanyTable v-model:items="displayedCompanies" @delete="deleteCompany" />
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
      header: 'Criar novo cliente',
      body: 'teste de criar',
      name: 'Adicionar cliente',
      companies: [],
      displayedCompanies: [],
      isCreation: true,
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
      // Envia a solicitação POST para o endpoint de criação de empresa no Nest.js
      axios.post('http://localhost:3000/company', companyData)
        .then(response => {
          // Lida com a resposta do servidor, se necessário
          console.log(response.data);
          // Fecha o modal após a criação da empresa
          this.showModal = false;
          // Atualiza a lista de empresas exibidas
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
          // Lida com erros, se necessário
          console.error(error);
        });
    },
    deleteCompany(id) {
      // Send a DELETE request to the server to delete the company
      axios.delete(`http://localhost:3000/company/${id}`)
        .then(response => {
          // Handle the response, if necessary
          console.log(response.data);
          
          // Update the list of displayed companies
          this.displayedCompanies = this.displayedCompanies.filter(item => item.id !== id);
        })
        .catch(error => {
          // Handle errors, if necessary
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
  align-content: flex-end;
  justify-content: space-evenly;
}
</style>