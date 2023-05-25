<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>compra</th>
          <th>valor</th>
          <th>dataPagamento</th>
          <th>situacaoPagamento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.compra }}</td>
          <td>{{ item.valor }}</td>
          <td>{{ item.dataPagamento }}</td>
          <td>{{ item.situacaoPagamento }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EmpresasTable',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>
