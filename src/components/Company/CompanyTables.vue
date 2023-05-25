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
        <tr v-for="item in filteredItems" :key="item.id">
          <td scope="row">{{ item.codigo }}</td>
          <td scope="row">{{ item.nome }}</td>
          <td scope="row">{{ item.situacaoPagamento }}</td>
          <td scope="row">{{ item.dataPagamento }}</td>
          <td scope="row">{{ item.servico }}</td>
          <td scope="row">
            <button class="btn btn-danger" @click="deleteCompany(item.codigo)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CompanyTables',
  emits: ['delete'],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    filterPaid: {
      type: Boolean,
      default: false
    },
  },
 
  computed: {
    filteredItems() {
      if (this.filterPaid) {
        return this.items.filter(item => item.situacaoPagamento === 'PAGO');
      } else {
        return this.items;
      }
    }
  },
  methods: {
    deleteCompany(codigo) {
      this.$emit('delete', codigo);
      console.log('here');
    }
  }
};
</script>
