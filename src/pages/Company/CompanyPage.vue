<template>
  <div>
    <div class="company">
      <h1>Clientes</h1>
      <SearchCompany :filterFunction="filterCompanies" />
      <button class="btn btn-primary" @click="showModal = true">Criar Cliente</button>
      <BaseModal :title="modalTitle" :is-open="showModal" @close="closeModal" @submit="createCompany">
        <input class="form-control" type="text" v-model="companyData.nome" placeholder="Nome do Cliente">
        <input class="form-control" type="text" v-model="companyData.codigo" placeholder="Código do Cliente">
        <input class="form-control" type="text" v-model="companyData.situacaoPagamento" placeholder="Situação Pagamento">
        <input class="form-control" type="date" v-model="companyData.dataPagamento" placeholder="Data de Pagamento">
        <input class="form-control" type="text" v-model="companyData.servico" placeholder="Tipo de Serviço">
      </BaseModal>
    </div>
    <CompanyTable :companies="displayedCompanies" @select="showCompany" />
    <div>
      <BaseModal :title="SecondmodalTitle" :is-open="showCompanyModal" @close="closeSecondModal">
        <h2>{{ selectedCompany.nome }}</h2>
        <p>Código: {{ selectedCompany.codigo }}</p>
        <p>Situação de Pagamento: {{ selectedCompany.situacaoPagamento }}</p>
        <p>Data de Pagamento: {{ selectedCompany.dataPagamento }}</p>
        <p>Serviço: {{ selectedCompany.servico }}</p>
      </BaseModal>
    </div>
  </div>
  <div>
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
      SecondmodalTitle: 'Informações do Cliente',
      companies: [],
      displayedCompanies: [],
      selectedCompany: null,
      showCompanyModal: false,
      companyData: {
        nome: '',
        codigo: '',
        situacaoPagamento: '',
        dataPagamento: '',
        servico: ''
      }
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
    closeSecondModal() {
      this.showCompanyModal = false;
    },
    closeModal() {
      this.showModal = false;
    },
    filterCompanies(company) {
      if (company) {
        this.displayedCompanies = this.companies.filter(c => c.codigo === company.codigo);
      } else {
        this.displayedCompanies = this.companies;
      }
    },
    createCompany() {
      if (this.companyData.nome && this.companyData.dataPagamento && this.companyData.situacaoPagamento) {
        axios.post('http://localhost:3000/company', this.companyData)
          .then(response => {
            console.log(response.data);
            this.companyData.nome = '';
            this.companyData.codigo= '';
            this.companyData.servico= '';
            this.companyData.situacaoPagamento = '';
            this.companyData.dataPagamento = '';
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
            if (error.response && error.response.status === 409) {
              console.error('Company code already exists');
            } else {
              console.error(error);
            }
          });
      } else {
        alert('Por favor, preencha todos os campos de Nome, Código e Situação de Pagamento');
      }
    },
    deleteCompany(codigo) {
      axios.delete(`http://localhost:3000/company/${codigo}`)
        .then(response => {
          console.log(response.data);
          this.displayedCompanies = this.displayedCompanies.filter(company => company.codigo !== codigo);
        })
        .catch(error => {
          console.error(error);
        });
    },
    editCompany(codigo) {
      axios.update(`http://localhost:3000/company/${codigo}`)
        .then(response => {
          console.log(response.data);
          this.displayedCompanies = this.displayedCompanies.filter(company => company.codigo !== codigo);
        })
        .catch(error => {
          console.error(error);
        });
    },
    showCompany(company) {
      this.selectedCompany = company;
      this.showCompanyModal = true;
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