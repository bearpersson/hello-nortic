<template>
  <div>
    <h1>Hello Nortic</h1>
    <p>{{ fact }}</p>
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
