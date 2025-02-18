<template>
  <div class="flex-col justify-center align-center">
    <div class="bg-gray-100 flex justify-center">
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold text-center">Weather Forecast</h1>
        <p class="text-gray-700 text-center mt-2">
          Enter a city name to enjoy its weather.
        </p>

        <div class="mt-4 flex justify-center">
          <input
              v-model.trim="city"
              type="text"
              placeholder="Enter city name" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const city = ref('');

</script>