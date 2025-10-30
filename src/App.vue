<template>
  <div
    id="app"
    class="min-h-screen transition duration-200 ease-in-out"
    :class="{ 'text-gray-100 bg-gray-900': dark, 'text-gray-900 bg-white': !dark }"
    tabindex="0"
    ref="container"
    @keydown.left.exact="prevDay"
    @keydown.right.exact="nextDay"
  >
    <section class="mx-2 sm:mx-6 md:max-w-2xl md:mx-auto flex flex-col justify-start sm:justify-between">
      <div>
        <h1 class="text-5xl text-center my-6 sm:my-12">Die Losungen</h1>
        <!-- card with losung content -->
        <div
          v-if="losung"
          class="rounded-sm border p-5 mb-6 transition duration-200 ease-in-out"
          :class="{
            'bg-gray-800 border-gray-700': dark,
            'bg-gray-200 border-gray-400': !dark
          }"
        >
          <h2 class="flex justify-between">
            <!-- weekday, date -->
            <span class="text-3xl">{{ losung[1] }}, {{ losung[0] }}</span>
            <nav class="flex items-center">
              <button
                @click="prevDay"
                class="w-10 text-xl px-1 text-gray-600 hover:text-white transition duration-200 ease-in-out cursor-pointer"
              >
                <icon-arrow-left />
              </button>
              <button
                @click="today"
                class="w-10 text-xl px-1 text-gray-600 hover:text-white stroke-width-10 transition duration-200 ease-in-out cursor-pointer"
              >
                <icon-refresh />
              </button>
              <button
                @click="nextDay"
                class="w-10 text-xl px-1 text-gray-600 hover:text-white transition duration-200 ease-in-out cursor-pointer"
              >
                <icon-arrow-right />
              </button>
            </nav>
          </h2>
          <!-- special day description -->
          <div>{{ losung[2]}}</div>
          <!-- losung -->
          <blockquote class="text-xl mt-5">
            <p>{{ losung[4] }}</p>
            <cite class="block text-right text-gray-600">—&nbsp;{{ losung[3].replace(' ', '&nbsp;') }}</cite>
          </blockquote>
          <!-- lehrvers -->
          <blockquote class="text-xl mt-5">
            <p>{{ losung[6] }}</p>
            <cite class="block text-right text-gray-600">—&nbsp;{{ losung[5].replace(' ', '&nbsp;') }}</cite>
          </blockquote>
        </div>
        <div v-else class="p-5 mb-6 text-center">
          No data available. Make sure, the data file for {{ d.getFullYear() }} was uploaded.
        </div>
        <div
          class="text-center leading-5 transition duration-200 ease-in-out"
          :class="{ 'text-gray-700': dark, 'text-gray-500': !dark }"
        >
          <div>
            <a href="http://www.losungen.de/" target="_blank" class="transition duration-200 ease-in-out">
              Die Losungen
            </a>
          </div>
          <div>
            &copy; Evangelische Brüder-Unität
          </div>
          <div>
            <a href="http://www.herrnhuter.de/" target="_blank" class="transition duration-200 ease-in-out">
              Herrnhuter Brüdergemeine
            </a>
          </div>
        </div>
      </div>
      <footer
        class="text-center my-10 transition duration-200 ease-in-out"
        :class="{ 'text-gray-500': dark, 'text-gray-700': !dark }"
      >
        <div>
          Version {{ version }}
          <button @click="dark = !dark" class="cursor-pointer ml-3 transition duration-200 ease-in-out">
            <span v-show="dark">
              <icon-sun class="inline w-5 h-5 mr-1 mb-1 align-middle text-yellow-500" />
              Turn lights on
            </span>
            <span v-show="!dark">
              <icon-moon class="inline w-5 h-5 mr-1 mb-1 align-middle text-gray-500" />
              Turn lights off
            </span>
          </button>
        </div>
        <div>
          Created with
          <icon-heart class="inline w-5 h-5 mb-1 align-middle" />
          by
          <a
            href="https://devmount.de"
            target="_blank"
            class="transition duration-200 ease-in-out"
            :class="{ 'text-gray-100': dark, 'text-black': !dark }"
          >devmount</a>.
          Available on    
          <a
            href="https://github.com/devmount/losung"
            target="_blank"
            class="transition duration-200 ease-in-out"
            :class="{ 'text-gray-100': dark, 'text-black': !dark }"
          >GitHub</a>.
        </div>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// icons
import {
  IconArrowLeft,
  IconArrowRight,
  IconRefresh,
  IconSun,
  IconMoon,
  IconHeart,
} from '@tabler/icons-vue';

// app properties
const version = APP_VERSION;
const d = ref(new Date());
const database = ref(null);
const losung = ref('');
const dark = ref(true);
const container = ref(null);

onMounted(async () => {
  container.value.focus();
  await getLosungData();
  getLosung();
});

const getLosungData = async () => {
  // fill database without quotes
  const response = await fetch(d.value.getFullYear() + '.csv');
  let text = await response.arrayBuffer()
  const decoder = new TextDecoder('iso-8859-1');
  text = decoder.decode(text);
  database.value = text.replace(/\//g, '').replace(/"/g, '').split(/\r?\n/)
};

const getLosung = () => {
  if (database.value) {
    for (let line of database.value) {
      const record = line.split(/\t/);
      var date = record[0].split('.').reverse().join('-');
      if (date == d.value.toISOString().substring(0, 10)) {
        losung.value = record;
      }
    }
  } else {
    losung.value = '';
  }
};

const nextDay = () => {
  d.value.setDate(d.value.getDate()+1);
  getLosung();
};

const prevDay = () => {
  d.value.setDate(d.value.getDate()-1);
  getLosung();
};

const today = () => {
  d.value = new Date();
  getLosung();
};
</script>
