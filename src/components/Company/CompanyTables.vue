<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Código Cliente</th>
          <th>Nome Cliente</th>
          <th>Situação Pagamento</th>
          <th>Data Pagamento</th>
          <th>Serviço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.situacaoPagamento }}</td>
          <td>{{ item.dataPagamento }}</td>
          <td>{{ item.servico }}</td>
          <td>
            <button @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CompanyTables',
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
  emits: ['delete'],
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
    deleteItem(id) {
      console.log('delete', id);
      this.$emit('delete', id); 
    }
  }
};
</script>
