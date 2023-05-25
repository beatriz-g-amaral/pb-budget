<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadImage">Enviar Imagem</button>
  </div>
</template>
<script>
import axios from 'axios'; 

export default {
  name: 'ImageUploader',
  data() {
    return {
      imageFile: null
    };
  },
  methods: {
    handleFileChange(event) {
      this.imageFile = event.target.files[0];
    },
    async uploadImage() {
      const formData = new FormData();
      formData.append('image', this.imageFile);

      try {
        const response = await axios.post('http://localhost:3000/file/upload', formData, {
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
