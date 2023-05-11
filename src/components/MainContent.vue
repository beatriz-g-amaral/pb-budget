<template>
  <div class="calendar">
    <h1>Calendário de Posts</h1>
    <div class="event-input">
      <input type="text" v-model="newEvent.title" placeholder="Evento" />
      <input type="date" v-model="newEvent.date" />
      <button type="button" @click="createEvent">Criar Evento</button>
    </div>
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
    <BaseModal :visible="showModal" :open="openModal" :header="header" :body="body" @close="closeModal" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import BaseModal from '@/components/Base/BaseModal.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/* TODO:
Criar o evendo direto do banco de dados e puxar de la, no momento esta criando apenas no local storage.
*/

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
      body: '',
      calendarOptions: {
        plugins: [interactionPlugin, dayGridPlugin, bootstrap5Plugin],
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        editable: true,
        events: [],
        eventClick: this.openModal
      },
      newEvent: {
        title: '',
        date: ''
      }
    };
  },
  methods: {
    openModal(info) {
      this.showModal = true;
      this.header = info.event.title;
      this.body = info.event.body;
    },
    closeModal() {
      this.showModal = false;
    },
    createEvent() {
      if (this.newEvent.title) {
        const newEvent = {
          title: this.newEvent.title,
          start: new Date()
        };
        this.calendarOptions.events.push(newEvent);
        this.newEvent.title = ''; // Limpar o input
        this.saveEventsToLocalStorage(); // Salvar os eventos no Local Storage
        alert('Evento criado com sucesso!');
      } else {
        alert('Por favor, insira um título para o evento.');
      }
    },
    saveEventsToLocalStorage() {
      const events = JSON.stringify(this.calendarOptions.events);
      localStorage.setItem('events', events);
    },
    loadEventsFromLocalStorage() {
      const events = localStorage.getItem('events');
      if (events) {
        this.calendarOptions.events = JSON.parse(events);
      }
    }
  },
  created() {
    this.loadEventsFromLocalStorage(); // Carregar os eventos do Local Storage ao inicializar o componente
  }
};
</script>

<style>
.calendar {
  padding: 16px;
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
