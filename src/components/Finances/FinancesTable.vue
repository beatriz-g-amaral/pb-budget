<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Codigo Cliente</th>
          <th>Nome Cliente</th>
          <th>Situacao Pagamento</th>
          <th>Data Pagamento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.CDNOME }}</td>
          <td>{{ item.DSNOME }}</td>
          <td>{{ item.SITUACAOPAGAMENTO }}</td>
          <td>{{ item.DATAPAGAMENTO }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FinancesTable',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

