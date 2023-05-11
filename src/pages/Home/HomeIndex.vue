<template>
  <div class="dashboard">
    <Header>
      <!-- Cabeçalho do painel de controle -->
    </Header>
    <MainContent>
      <!-- Conteúdo principal do painel de controle -->
    </MainContent>
    <Sidebar>
      <!-- Barra lateral do painel de controle -->
    </Sidebar>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import MainContent from '@/components/MainContent.vue';

export default {
  name: 'HomeDashboard',
  components: {
    Header,
    Sidebar,
    MainContent
  }
}
</script>
<style>
.dashboard {
  display: flex;
  padding: 78px;
}
</style>