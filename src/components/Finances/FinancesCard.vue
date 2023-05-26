<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Companies</h5>
    </div>
    <div class="card-body">
      <div v-for="item in items" :key="item.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ item.local }}</h5>
          <p class="card-text">{{ item.valor }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'FinancesCard',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>
