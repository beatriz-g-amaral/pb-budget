<template>
  <div class="row">
    <div v-for="item in items" :key="item.CDLOCAL" class="col-sm-4">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{ item.CDLOCAL }}</h5>
          <h5 class="card-text">{{ item.DSLOCAL }}</h5>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyCardList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>
