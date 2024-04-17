<template>
  <header v-if="showMenu">
      <nav>
        <RouterLink to="/">MainView</RouterLink>
        <RouterLink to="/about">SubView</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

const showMenu = false;
</script>
