<template>
  <div class="d-flex justify-content-center align-items-center full-height">
    <div class="w-75 d-flex flex-column justify-content-center align-items-center ">
      <h1 class="fw-bold display-1 d-inline-block rainbow-text mb-5">Hello Nortic</h1>
      <p v-if="fact !== ''" class="lead text-center">{{ fact }}</p>
      <div v-else class="spinner-border text-secondary" role="status"></div>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { BackendRepository } from "@/api/backend-repository";
import { ref } from "vue";

const fact = ref<string>("");

const loadCatFact = () => {
  BackendRepository.getCatFact().then((response) => {
    fact.value = response.fact;
  });
};

loadCatFact();
</script>
