<template>
  <div class="calendar">
    <h1>Calendário de Posts</h1>
    <div class="calendar">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
  <BaseModal :title="modalTitle" :is-open="showModal" @close="closeModal" v-if="selectedEvent">
      <img :src="selectedEvent.image" alt="Evento" class="img-fluid" v-if="selectedEvent.image" />
      <p v-html="selectedEvent.body"></p>
    </BaseModal>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import BaseModal from '@/components/Base/BaseModal.vue';

import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  name: 'MainContent',
  components: {
    FullCalendar,
    BaseModal
  },
  data() {
    return {
      showModal: false,
      header: '',
      modalTitle: 'Informacoes do Evento',
      body:'',
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
        eventClick: this.openModal,
        contentHeight: '400px'
      },
    };
  },
  methods: {
    openModal(info) {
      console.log(info);
      console.log(info.event);
      console.log(info.event.extendedProps);
      if (info.event.extendedProps) {
        this.selectedEvent.title = info.event.title;
        this.selectedEvent.image = info.event.extendedProps.image;
        this.selectedEvent.body = info.event.extendedProps.body;
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    handleFileChange(event) {
      this.newEvent.image = event.target.files[0];
    },
    async loadEvents() {
      try {
        const response = await axios.get('http://localhost:3000/eventos');
        console.log(response);
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
.calendar {
  width: 300px;
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
</style>
