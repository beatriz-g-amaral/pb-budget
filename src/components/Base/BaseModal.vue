<template>
  <div>

    <div class="modal" :class="{ 'show': isOpen }" v-if="isOpen">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="openModal">Confirmar</button>
            <button class="btn btn-secondary" @click="closeModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseModal',
  emits: ['close', 'submit', 'open'],
  props: {
    title: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleModal() {
      if (this.isOpen) {
        console.log('chegou aqui no toggleModal is open');
        this.closeModal();
      } else {
        console.log('chegou aqui no toggleModal else');
        this.openModal();
      }
    },
    openModal() {
      console.log('chegou aqui no open modal do base modal');
      this.$emit('submit');
      this.$emit('open');
    },

    closeModal() {
      console.log('chegou aqui no close modal do base modal');
      this.$emit('close');
    }
  }
};
</script>

<style>
.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal.show {
  display: block;
}

.modal-dialog {
  position: relative;
  margin: 10% auto;
  padding: 20px;
  max-width: 500px;
  background-color: #fff;
}

.modal-header {
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

.modal-title {
  margin: 0;
}

.modal-body {
  padding: 10px;
}

.modal-footer {
  padding: 10px;
  border-top: 1px solid #dee2e6;
  text-align: right;
}
</style>
