<template>
  <div
    id="app"
    class="min-h-screen fade"
    :class="{ 'text-gray-100 bg-gray-900': dark, 'text-gray-900 bg-white': !dark }"
    tabindex="0"
    ref="container"
    @keydown.left.exact="dayDifference--"
    @keydown.right.exact="dayDifference++"
  >
    <section class="mx-2 sm:mx-6 md:max-w-2xl md:mx-auto flex flex-col justify-start sm:justify-between">
      <div>
        <h1 class="text-center my-6 sm:my-12">Die Losungen</h1>
        <!-- card with losung content -->
        <div v-if="losung" class="rounded border p-5 mb-6 fade" :class="{ 'bg-gray-800 border-gray-700': dark, 'bg-gray-200 border-gray-400': !dark }">
          <h2 class="flex justify-between">
            <!-- weekday, date -->
            {{ losung[1] }}, {{ losung[0] }}
            <nav class="flex-shrink-0 flex align-top">
              <button @click="dayDifference--" class="text-xl px-1 fade text-gray-600 hover:text-white">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
              <button @click="dayDifference=0" class="text-xl px-1 fade text-gray-600 hover:text-white stroke-width-10">
                <ion-icon name="refresh-outline"></ion-icon>
              </button>
              <button @click="dayDifference++" class="text-xl px-1 fade text-gray-600 hover:text-white">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            </nav>
          </h2>
          <!-- special day description -->
          <div>{{ losung[2]}}</div>
          <!-- losung -->
          <blockquote class="mt-5">
            <p>{{ losung[4] }}</p>
            <cite class="block text-right text-gray-600">—&nbsp;{{ losung[3].replace(' ', '&nbsp;') }}</cite>
          </blockquote>
          <!-- lehrvers -->
          <blockquote class="mt-5">
            <p>{{ losung[6] }}</p>
            <cite class="block text-right text-gray-600">—&nbsp;{{ losung[5].replace(' ', '&nbsp;') }}</cite>
          </blockquote>
        </div>
        <div v-else class="p-5 mb-6 text-center">No data available. Make sure, the data file for {{ displayDate.getFullYear() }} was uploaded.</div>
        <div class="text-center fade" :class="{ 'text-gray-700': dark, 'text-gray-500': !dark }">
          <div>
            <a href="http://www.losungen.de/" target="_blank">Die Losungen</a>
          </div>
          <div>
            &copy; Evangelische Brüder-Unität
          </div>
          <div>
            <a href="http://www.herrnhuter.de/" target="_blank">Herrnhuter Brüdergemeine</a>
          </div>
        </div>
      </div>
      <footer class="text-center my-10 fade" :class="{ 'text-gray-500': dark, 'text-gray-700': !dark }">
        <div>
          Version {{ appVersion }}
          <button @click="dark = !dark" class="cursor-pointer ml-3">
            <span v-show="dark"><ion-icon name="sunny-outline" class="w-5 h-5 mr-1 mb-1 align-middle text-yellow-500"></ion-icon> Turn lights on</span>
            <span v-show="!dark"><ion-icon name="moon-outline" class="w-5 h-5 mr-1 mb-1 align-middle text-gray-500"></ion-icon> Turn lights off</span>
          </button>
        </div>
        <div>
          <ion-icon name="code-slash-outline" class="mb-1 align-middle"></ion-icon> with <ion-icon name="heart-outline" class="mb-1 align-middle"></ion-icon> by <a href="https://devmount.de" target="_blank" :class="{ 'text-gray-100': dark, 'text-black': !dark }">Andreas Müller</a>.
          <ion-icon name="cloud-download-outline" class="mb-1 align-middle"></ion-icon> from <a href="https://github.com/devmount/losung" target="_blank" :class="{ 'text-gray-100': dark, 'text-black': !dark }">GitHub</a>.
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    let d = new Date()
    let version = require('../package.json').version
    return {
      displayDate: d,
      dayDifference: 0,
      database: null,
      dark: true,
      version: version
    }
  },
  mounted () {
    this.getLosung()
    this.$refs.container.focus()
  },
  methods: {
    getLosung () {
      let self = this
      let rawFile = new XMLHttpRequest()
      let d = new Date()
      rawFile.open("GET", d.getFullYear() + '.csv', false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
          // fill database without quotes
          self.database = rawFile.responseText.replace(/\//g, '').replace(/"/g, '').split(/\r?\n/)
        }
      }
      rawFile.send(null);
    }
  },
  computed: {
    losung () {
      let d = new Date()
      d.setDate(d.getDate()+this.dayDifference)
      if (this.database) {
        for (let line of this.database) {
          var record = line.split(/\t/)
          var date = record[0].split('.')
          date = date[2] + '-' + date[1] + '-' + date[0]
          if (date == d.toISOString().substring(0, 10)) {
            return record
          }
        }
        return ''
      } else {
        return ''
      }
    },
    appVersion() {
      return process.env.PACKAGE_VERSION;
    }
  }
}
</script>

<style>
@import "tailwindcss/base";

/* custom base styles */
h1 {
  @apply text-5xl;
}
h2 {
  @apply text-3xl;
}
blockquote {
  @apply text-xl;
}
a,
button,
.fade {
  @apply transition;
  @apply duration-200;
  @apply ease-in-out;
}

@import "tailwindcss/components";
@import "tailwindcss/utilities";

/* custom new utilities */
.stroke-width-10 {
  --ionicon-stroke-width: 2.5rem;
}

</style>
