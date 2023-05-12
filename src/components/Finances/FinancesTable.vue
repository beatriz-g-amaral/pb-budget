<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Código Cliente</th>
          <th>Nome Cliente</th>
          <th>Situação Pagamento</th>
          <th>Data Pagamento</th>
          <th>Servico</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.situacaoPagamento }}</td>
          <td>{{ item.dataPagamento }}</td>
          <td>{{ item.servico }}</td>
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
