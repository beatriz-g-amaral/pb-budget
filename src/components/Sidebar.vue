<template>
  <div class="lista">
    <h1>Lista de Clientes Ativos</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideBarHome',
  data() {
    return {
      items: [
        { id: 1, name: 'Alexandro ' },
        { id: 2, name: 'Milton ' },
        { id: 3, name: 'Karen ' },
        { id: 4, name: 'Pai ' },
        { id: 5, name: 'Gustavo' },
      ],
    };
  },
};
</script>
<style>
.lista{
  padding-top: 16px;
}

</style>
