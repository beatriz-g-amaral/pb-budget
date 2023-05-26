<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Código Cliente</th>
          <th scope="col">Nome Cliente</th>
          <th scope="col">Situação Pagamento</th>
          <th scope="col">Data Pagamento</th>
          <th scope="col">Serviço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in filteredCompanies" :key="company.codigo"
          :class="{ 'selected-row': company === selectedCompany }" @click="selectCompany(company)">
          <td scope="row">{{ company.codigo }}</td>
          <td scope="row">{{ company.nome }}</td>
          <td scope="row">{{ company.situacaoPagamento }}</td>
          <td scope="row">{{ company.dataPagamento }}</td>
          <td scope="row">{{ company.servico }}</td>
          <td scope="row">
            <button class="btn btn-danger" @click="deleteCompany(company.codigo)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CompanyTables',
  emits: ['delete', 'update', 'select'],
  props: {
    companies: {
      type: Array,
      default: () => []
    },
    selectedCompany: Object,
    filterPaid: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      selectedCompanyDetails: null,
    }
  },
  computed: {
    filteredCompanies() {
      if (this.filterPaid) {
        return this.companies.filter(company => company.situacaoPagamento === 'PAGO');
      } else {
        return this.companies;
      }
    }
  },
  methods: {
    editCompany(codigo) {
      this.$emit('update', codigo);
    },
    deleteCompany(codigo) {
      this.$emit('delete', codigo);
    },
    selectCompany(company) {
      this.selectedCompanyDetails = company;
      this.$emit('select', company);
    },
  }
};
</script>

<style>
.selected-row {
  background-color: #373737;
  cursor: pointer;
  cursor: auto;
}
</style>
