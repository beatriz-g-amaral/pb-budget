<template>
  <div>
    <button class="btn btn-primary" @click="showModal = true">Criar Cliente</button>
    <BaseModal :title="modalTitle" :is-open="showModal" @open="openModal" @close="closeModal" @submit="createFinance">
      <input class="form-control" type="text" v-model="localFinaceName" placeholder="Local">
      <input class="form-control" type="number" v-model="localFinanceValue" placeholder="Valor">
      <input class="form-control" type="date" v-model="localFinaceDate" placeholder="Data de Vencimento">
    </BaseModal>
    <FinancesCard v-model:items="displayedfinances" />
  </div>
</template>


<script>
import axios from 'axios'
import FinancesCard from '@/components/Finances/FinancesCard.vue';
import BaseModal from '@/components/Base/BaseModal.vue';

export default {
  name: 'FinancesPage',
  components: {
    BaseModal,
    FinancesCard
  },
  data() {
    return {
      finances: [],
      modalTitle: 'Criar Cliente',
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
    filterfinances(finances) {
      this.displayedfinances = this.finances.filter(c => c.nome === finances.nome);
    },
    createFinance(financeData) {
      axios.post('http://localhost:3000/finances', financeData)
        .then(response => {
          console.log(response.data);
          this.closeModal();
          axios.get('http://localhost:3000/finances')
            .then(response => {
              this.finances = response.data;
              this.displayedfinances = response.data;
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            console.error('Finance code already exists');
          } else {
            console.error(error);
          }
        });
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
