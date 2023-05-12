<template>
  <div v-if="haveButton">
    <button type="button" class="btn btn-primary" @click="open">{{ name }}</button>
  </div>
  <transition name="modal">
    <div v-if="visible" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container modal-content">
          <div class="modal-header">
            <slot name="header">{{ header }}</slot>
          </div>
          <div class="modal-body">
            <input v-if="isCreation" class="input" type="text" v-model="localCompanyName" placeholder="Name">
            <input v-if="isCreation" class="input" type="text" v-model="localCompanyCode" placeholder="companyCode">
            <input v-if="isCreation" class="input" type="text" v-model="localCompanypaymentsituation"
              placeholder="paymentsituation">
            <input v-if="isCreation" class="input" type="date" v-model="localCompanyPaymentDate"
              placeholder="companyDate">
            <input v-if="isCreation" class="input" type="text" v-model="localCompanyService" placeholder="service">
            <slot name="body" v-else>{{ body }}</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-primary" @click="submitModal">Save changes</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  emits: ['close', 'submit'],
  props: {
    header: {
      type: String
    },
    body: {
      type: String
    },
    name: {
      type: String
    },
    visible: Boolean,
    haveButton: Boolean,
    open: Function
  },
  data() {
    return {
      localCompanyName: '',
      localCompanyCode: '',
      situacaoPagamento: '',
      localCompanyPaymentDate: '',
      localCompanyService: '',
      localCompanypaymentsituation: ''
    };
  },
  computed: {
    isCreation() {
      // Retorne aqui a condição que define se é uma criação ou não
      return true;
    }
  },
  methods: {
    submitModal() {
      this.$emit('submit', {
        nome: this.localCompanyName,
        codigo: this.localCompanyCode,
        situacaoPagamento: this.localCompanypaymentsituation,
        dataPagamento: this.localCompanyPaymentDate,
        servico: this.localCompanyService
      });
    },

    closeModal() {
      this.$emit('close');
    }
  }
};
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(79, 78, 78, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff; /* Updated to an opaque color */
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column-reverse;
  flex-wrap: wrap;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
