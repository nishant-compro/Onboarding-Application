<template>
  <div class="app">
    <TopBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from './home/components/TopBar.vue';

export default {
  components: { TopBar },
};
</script>

<style>
.app {
  align-items: center;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem 2rem;
}
</style>
