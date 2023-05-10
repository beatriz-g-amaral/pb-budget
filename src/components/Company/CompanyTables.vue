<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>CDLOCAL</th>
          <th>DSLOCAL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.CDLOCAL">
          <td>{{ item.CDLOCAL }}</td>
          <td>{{ item.DSLOCAL }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CompanyTable',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>
