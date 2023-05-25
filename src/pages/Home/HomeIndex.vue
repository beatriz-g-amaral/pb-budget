<template>
  <div class="dashboard">
    <MainContent>
      <!-- Conteúdo principal do painel de controle -->
    </MainContent>
 
</div>
</template>
<script>
import MainContent from '@/components/MainContent.vue';

export default {
  name: 'HomeDashboard',
  components: {

    MainContent
  }
}
</script>
<style>
.dashboard {
  display: flex;
  padding: 0px;
}
</style>