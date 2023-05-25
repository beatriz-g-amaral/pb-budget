<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <label>Name:</label>
      <input v-model="name" />
    </div>
    <div>
      <label>Message:</label>
      <input v-model="text" />
    </div>
    <button @click="sendMessage">Send</button>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <strong>{{ message.name }}</strong>: {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name:"SideBarhome",
  data() {
    return {
      title: 'Chat',
      name: '',
      text: '',
      messages: [],
      socket: null,
    };
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit('msgToServer', message);
        this.text = '';
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
  created() {
    this.socket = io('http://localhost:3000');
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message);
    });
  },
};
</script>

<style>

</style>
