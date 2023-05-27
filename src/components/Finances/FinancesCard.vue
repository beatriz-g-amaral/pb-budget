<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Compras</h5>
    </div>
    <div class="card-body">
      <div v-for="item in items" :key="item" class="card mb-3" :class="{ 'selected-row': item === selectItem }"
        @click="selectItem(item)">
      <div class="card-body">
        <h5 class="card-title">{{ item.local }}</h5>
        <p class="card-text">R${{ item.valor }}</p>
        <p class="card-text">Vence:{{ item.vencimento }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>


export default {
  name: 'FinancesCard',
  emits: ['delete', 'update', 'select'],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    selectedItems: Object,
  },
  data() {
    return {
      selectedItemDetails: null,
    }
  },
  methods: {
    editItem(local) {
      this.$emit('update', local);
    },
    deleteItem(local) {
      this.$emit('delete', local);
    },
    selectItem(item) {
      this.selectedItemDetails = item;
      this.$emit('select', item);
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
