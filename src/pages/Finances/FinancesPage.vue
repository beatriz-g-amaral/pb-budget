<template>
    <button class="btn btn-primary" @click="showModal = true">Criar Conta</button>
    <div class="finances">
    <BaseModal :title="modalTitle" :is-open="showModal" @close="closeModal" @delete="deleteFinance" @submit="createFinance">
      <input class="form-control" type="text" v-model="FinanceData.local" placeholder="Local">
      <input class="form-control" type="number" v-model="FinanceData.valor" placeholder="Valor">
      <input class="form-control" type="date" v-model="FinanceData.vencimento" placeholder="Data de Vencimento">
    </BaseModal>
    <FinancesCard :items="displayedfinances" @select="showFinances" />
    <BaseModal :title="SecondmodalTitle" :is-open="showItemModal" @close="closeModalFinance">
      <h2>{{ selectedFinance.local }}</h2>
      <p>Código: {{ selectedFinance.valor }}</p>
      <p>Situação de Pagamento: {{ selectedFinance.vencimento }}</p>
    </BaseModal>
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
      modalTitle: 'Criar Conta',
      SecondmodalTitle: '',
      displayedfinances: [],
      FinanceData: {
        local: '',
        valor: '',
        vencimento: ''
      },
      selectedFinance: null,
      showItemModal: false,
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
      if (finances){
      this.displayedfinances = this.finances.filter(c => c.local === finances.local);
    } else {
        this.displayedfinances = this.finances;
      }
    },
    createFinance() {
      if (this.FinanceData.local && this.FinanceData.valor && this.FinanceData.vencimento) {
        axios.post('http://localhost:3000/finances', this.FinanceData)
          .then(response => {
            console.log(response.data);
            this.closeModal();
            axios.get('http://localhost:3000/finances')
              .then(response => {
                this.finances = response.data;
                this.FinanceData.local = '';
                this.FinanceData.valor = '';
                this.FinanceData.vencimento = '';
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
      } else {
        alert('Por favor, preencha todos os campos de Nome, Valor e  Vencimento');
      }
    },
    deleteFinance(local) {
      axios.delete(`http://localhost:3000/company/${local}`)
        .then(response => {
          console.log(response.data);
          this.displayedCompanies = this.displayedCompanies.filter(company => company.local !== local);
        })
        .catch(error => {
          console.error(error);
        });
    },
    showFinances(item) {
      this.selectedFinance = item;
      this.showItemModal = true;
    },
    closeModalFinance() {
      this.showItemModal = false;
    },
    closeModal() {
      console.log("Closing modal");
      this.showModal = false;
    }
  }

}
</script>
<style>
.finances{
}

</style>
