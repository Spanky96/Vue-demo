<template>
  <div id="app">
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  export default {
    name: 'App',
    components: {
      'v-header': header
    }
  };
</script>

<style lang="scss">
</style>
