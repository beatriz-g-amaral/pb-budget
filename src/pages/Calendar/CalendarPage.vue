<template>
  <div>
    <div class="calendar">
      <button class="btn btn-primary" @click="openModal">Criar Evento</button>
      <BaseModal :title="modalTitle" :is-open="showModal" @close="closeModal" @submit="createEvent">
        <input class="form-control" type="text" v-model="newEvent.nome_evento" placeholder="Evento" />
        <input class="form-control" type="date" v-model="newEvent.data_evento" />
        <input class="form-control" type="file" @change="handleFileChange" />
      </BaseModal>
    </div>
    <div class="calendar">
      <FullCalendar :options="calendarOptions" />
    </div>
    <BaseModal :title="secondModalTitle" :is-open="showSecondModal" @close="closeSecondModal" v-if="selectedEvent">
      <img :src="selectedEvent.image" alt="Evento" class="img-fluid" v-if="selectedEvent.image" />
      <p v-html="selectedEvent.body"></p>
    </BaseModal>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BaseModal from '@/components/Base/BaseModal.vue';

export default {
  name: 'CalendarPage',
  components: {
    FullCalendar,
    BaseModal
  },
  data() {
    return {
      showSecondModal: false,
      showModal: false,
      modalTitle: 'Criar Evento',
      secondModalTitle: 'Informações do Evento',
      selectedEvent: {
        title: '',
        image: '',
        body: ''
      },
      calendarOptions: {
        plugins: [interactionPlugin, dayGridPlugin, bootstrap5Plugin],
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        editable: true,
        events: [],
        eventClick: this.openEventInfo,
        contentHeight: '500px'
      },
      newEvent: {
        nome_evento: '',
        data_evento: '',
        image: null,
        criado_por: '',
      }
    };
  },
  methods: {
    openEventInfo(info) {
      if (info.event.extendedProps) {
        this.selectedEvent.title = info.event.title;
        this.selectedEvent.image = info.event.extendedProps.image;
        this.selectedEvent.body = info.event.extendedProps.body;
      }
      this.showSecondModal = true;
    },
    closeSecondModal() {
      this.showSecondModal = false;
      this.selectedEvent.title = '';
      this.selectedEvent.image = '';
      this.selectedEvent.body = '';
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    handleFileChange(event) {
      this.newEvent.image = event.target.files[0];
    },
    async createEvent() {
      if (this.newEvent.nome_evento && this.newEvent.data_evento && this.newEvent.image) {
        const formData = new FormData();
        const evento_id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        formData.append('nome_evento', this.newEvent.nome_evento);
        formData.append('data_evento', this.newEvent.data_evento);
        formData.append('criado_por', this.newEvent.criado_por);
        formData.append('evento_id', evento_id);
        formData.append('image', this.newEvent.image);
        try {
          const response = await axios.post('http://localhost:3000/file/upload', formData);
          console.log(response.data);
          console.log(formData);
          this.calendarOptions.events.push(response.data.event);
          this.newEvent.nome_evento = '';
          this.newEvent.data_evento = '';
          this.newEvent.image = null;
          alert('Evento criado com sucesso!');
          location.reload();
        } catch (error) {
          console.error('Erro ao criar evento:', error);
          alert('Ocorreu um erro ao criar o evento.');
        }
      } else {
        alert('Por favor, preencha todos os campos e selecione uma imagem.');
      }
    },
    async loadEvents() {
      try {
        const response = await axios.get('http://localhost:3000/eventos');
        const events = response.data.map(event => ({
          title: event.nome_evento,
          start: event.data_evento,
          extendedProps: {
            image: `http://localhost:3000/file/${event.imagem}`,
            body: event.nome_evento
          }
        }));
        this.calendarOptions.events = events;
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        alert('Ocorreu um erro ao carregar os eventos.');
      }
    },
  },
  created() {
    this.loadEvents();
  }
};
</script>

<style>
.createEvent {
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  align-items: flex-start;
}

.calendar {
  padding: 16px;
  width: 1000px;
  margin: 0 auto;
}

.event-input {
  margin-bottom: 16px;
}

.event-input input {
  margin-right: 8px;
}

.event-input button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
}

.modal-footer>* {
  margin: 0.25rem;
}

.modal-footer>button {
  margin-right: 0.25rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}
</style>
