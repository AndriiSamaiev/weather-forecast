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
               class="absolute mt-10 mr-14 bg-white w-64 border rounded-r shadow-md z-10">
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

      </div>
    </div>

    <div v-if="pendingRequest"
         class="flex items-center justify-center mt-6 mx-auto max-w-sm bg-white rounded-2xl shadow-md p-6 text-center w-74 h-64">
      <div role="status" class="flex items-center justify-center">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else-if="weather"
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

    <div v-else-if="errorMessage"
         class="flex items-center justify-center mt-6 mx-auto max-w-sm bg-white rounded-2xl shadow-md p-6 text-center w-74 h-64 text-red-500 font-semibold">
      {{ errorMessage }}
    </div>

  </div>
</template>
<script setup>
import {ref} from 'vue';

const city = ref('');
const weather = ref(null);
const allCities = ref([]);
const errorMessage = ref('');
const pendingRequest = ref(false);
const showAutoComplete = ref(false);

const searchWeather = async () => {
  if (!city.value) return;
  if (city.value.length < 3) {
    errorMessage.value = 'City not found. Please enter a valid city name';
    return;
  }
  pendingRequest.value = true;
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
    } else if (error.statusCode === 404) {
      errorMessage.value = error.statusMessage;
    } else {
      errorMessage.value = error.statusMessage;
    }
    weather.value = null;
  }
  pendingRequest.value = false;
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