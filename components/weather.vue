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
              @input="getAutoComplete"
              @keydown.enter="searchWeather"
              @keydown.esc="city = ''"
          />
          <button
              @click="searchWeather"
              class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
          <div v-if="allCities.length && showAutoComplete"
               class="absolute mt-10 mr-14 bg-white w-64 border rounded-r shadow-md">
            <p class="bg-sky-400 p-2 ">Please select a city to proceed</p>
            <p
                v-for="city in allCities"
                :key="city.id"
                class="p-2 cursor-pointer hover:bg-gray-200"
                @click="selectCity(city)"
            >
              {{ city.name }}, {{ city.country }}
            </p>
          </div>
        </div>
        <div v-if="weather"
             class="relative mt-6 mx-auto max-w-sm bg-white rounded-2xl shadow-md p-6 text-center w-74 h-64 hover:bg-gray-100">
          <button
              type="button"
              @click="weather = null"
              class="absolute top-3 right-3 ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
          <h2 class="text-2xl font-semibold text-gray-800">{{ weather.location.name }} </h2>
          <div class="text-gray-500">{{ weather.location.country }}</div>
          <div class="flex my-5 items-center justify-around">
            <NuxtImg :src="`https:${weather.current.condition.icon}`" class="w-20 h-20"/>
            <h2 class="text-lg font-medium text-gray-700">{{ weather.current.condition.text }}</h2>
          </div>
          <p class="text-3xl font-bold text-blue-600">{{ weather.current.temp_c }}&deg;C</p>

        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue';

const city = ref('');
const weather = ref(null);
const allCities = ref([]);
const errorMessage = ref('');
const showAutoComplete = ref(false);

const searchWeather = async () => {
  if (!city.value) return;
  if (city.value.length < 3) {
    errorMessage.value = 'City not found. Please enter a valid city name';
    return;
  }
  try {
    const data = await $fetch(`/api/weather?q=${city.value}`);
    if (!data || data.error) {
      throw new Error('City not found. Please enter a valid city name.');
    }
    weather.value = data;
    errorMessage.value = '';
    city.value = "";
  } catch (error) {
    if (error instanceof TypeError) {
      errorMessage.value = 'Network error. Please check your connection and try again.';
    } else {
      errorMessage.value = error.message;
    }
    weather.value = null;
  }
};
const getAutoComplete = async () => {
  if (city.value.length < 2) return;
  errorMessage.value = "";
  const data = await $fetch(`/api/cities?q=${city.value}`);
  if (data) {
    allCities.value = data || [];
    showAutoComplete.value = true;
  }
}

const selectCity = (selectedCity) => {
  city.value = selectedCity.name;
  showAutoComplete.value = false;
}

</script>