<template>
  <div class="d-flex justify-content-center align-items-center full-height">
    <div class="w-75 d-flex flex-column justify-content-center align-items-center ">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Tid</th>
            <th scope="col">Föregående år</th>
            <th scope="col">Idag</th>
            <th scope="col">Skillnad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">13:00</th>
            <td>10 kr</td>
            <td>8 kr</td>
            <td>2 kr</td>
          </tr>
          <tr>
            <th scope="row">14:00</th>
            <td>10 kr</td>
            <td>8 kr</td>
            <td>2 kr</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { BackendRepository } from "@/api/backend-repository";
import { ref, defineProps } from "vue";

defineProps({
  hello: {
    type: String,
    required: true,
  }
});

const elpris = ref<string[]>([]);

const loadCatFact = () => {
  BackendRepository.getElPris().then((response) => {

    elpris.value = response.map((item) => {
      return `${item.SEK_per_kWh} - ${item.time_start}`
    })
  });
};

loadCatFact();
</script>
