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
              placeholder="Enter city name"
              class="p-2 border border-gray-300 rounded-l-md w-64"
              @input = "getAutoComplete"
              @keydown.esc = "city = ''"
          />
          <button
              class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
          <div v-if="allCities.length && showAutoComplete" class="absolute mt-10 mr-14 bg-white w-64 border rounded-r shadow-md">
            <p class="bg-sky-400 p-2 ">Please select a city ro proceed</p>
            <p
                v-for="city in allCities"
                :key="city.id"
                class="p-2 cursor-pointer hover:bg-gray-200"
            >
              {{ city.name }}, {{ city.country }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const city = ref('');
const allCities = ref([]);
const errorMessage = ref('');
const showAutoComplete = ref(false);

const getAutoComplete = async () => {
  if(city.value.length < 2)return;
  errorMessage.value = "";
  const data = await $fetch(`/api/cities?q=${city.value}`);
  if(data){
    allCities.value = data || [];
    showAutoComplete.value = true;
  }
}


</script>