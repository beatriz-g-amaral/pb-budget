<template>
  <div>
    <FinancesCard v-model:items="displayedfinances" />

  </div>
</template>


<script>
import axios from 'axios'
import FinancesCard from '@/components/Finances/FinancesCard.vue';

export default {
  name: 'FinancesPage',
  components: {
    FinancesCard
  },
  data() {
    return {
      finances: [],
      displayedfinances: [],
      selectedCompany: null,
      showModal: false
    }
  },
  created() {
    axios.get('http://localhost:3000/company')
      .then(response => {
        this.finances = response.data;
        this.displayedfinances = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    filterfinances(finances) {
      this.displayedfinances = this.finances.filter(c => c.nome === finances.nome);
    },
    openModal() {
      console.log("Opening modal");
      this.showModal = true;
    },
    closeModal() {
      console.log("Closing modal");
      this.showModal = false;
    }
  }

}
</script>
