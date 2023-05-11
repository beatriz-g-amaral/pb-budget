<template>
  <div>
    <FinancesTable v-model:items="displayedfinances" />

  </div>
</template>


<script>
import axios from 'axios'
import FinancesTable from '@/components/Finances/FinancesTable.vue';

export default {
  name: 'FinancesPage',
  components: {
    FinancesTable
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
    axios.get('http://localhost:3000/finances')
      .then(response => {
        this.finances = response.data;
        this.displayedfinances = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    filterfinances(company) {
      this.displayedfinances = this.finances.filter(c => c.CDNOME === company.CDNOME);
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
