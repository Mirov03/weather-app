<template>
  <div class="content">
    <sidebar></sidebar>
    <router-view v-slot="{ Component }">
      <transition name="app-tran" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import sidebar from './components/sidebar.vue';

export default {
  name: 'App',
  components: { sidebar }
}
</script>

<style>
@import './assets/css/imports.css';

.app-tran-enter-from {
  transform: translateY(20px);
  opacity: 0;
  transition: opacity 1s linear;
}

.app-tran-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.app-tran-enter-active,
.app-tran-leave-active {
  transition: transform .2s linear, opacity .2s linear;
}
</style>
