<template>
  <div id="app" class="min-h-screen mx-2 sm:mx-6 md:max-w-2xl md:mx-auto flex flex-col justify-start sm:justify-between">
    <div>
      <h1 class="text-center my-6 sm:my-12">Die Losungen</h1>
      <div v-if="data" class="dark:bg-gray-800 light:bg-gray-200 rounded border dark:border-gray-700 light:border-gray-400 p-5 mb-6">
        <!-- weekday, date -->
        <h2>{{ data[1] }}, {{ data[0] }}</h2>
        <!-- special day description -->
        <div>{{ data[2]}}</div>
        <!-- losung -->
        <blockquote class="mt-5">
          <p>{{ data[4] }}</p>
          <cite class="block text-right text-gray-600">—&nbsp;{{ data[3].replace(' ', '&nbsp;') }}</cite>
        </blockquote>
        <!-- lehrvers -->
        <blockquote class="mt-5">
          <p>{{ data[6] }}</p>
          <cite class="block text-right text-gray-600">—&nbsp;{{ data[5].replace(' ', '&nbsp;') }}</cite>
        </blockquote>
      </div>
      <div v-else>No data available. Make sure, the data file for {{ today.getFullYear() }} was uploaded.</div>
      <div class="text-center dark:text-gray-700 light:text-gray-500">
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
    <footer class="text-center dark:text-gray-500 light:text-gray-700 my-10">
      <div>
        Version {{ version }}
      </div>
      <div>
        Built with 🤍 by <a href="https://devmount.de" target="_blank" class="dark:text-gray-100 light:text-black">Andreas Müller</a>.
        Download on <a href="https://github.com/devmount/losung" target="_blank" class="dark:text-gray-100 light:text-black">GitHub</a>.
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    var d = new Date()
    let version = require('../package.json').version
    return {
      today: d,
      data: '',
      version: version
    }
  },
  methods: {
    getLosung (text) {
      // get line without quotes
      var lines = text.replace(/\//g, '').replace(/"/g, '').split(/\r?\n/)
      for (let line of lines) {
        var record = line.split(/\t/)
        var date = record[0].split('.')
        date = date[2] + '-' + date[1] + '-' + date[0]
        if (date == this.today.toISOString().substring(0, 10)) {
          this.data = record
          break
        }
      }
    }
  },
  mounted () {
    var self = this
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", self.today.getFullYear() + '.csv', false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
        var text = rawFile.responseText;
        self.getLosung(text)
      } else {
        self.data = ''
      }
    }
    rawFile.send(null);
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

@import "tailwindcss/components";
@import "tailwindcss/utilities";

/* custom new utilities */

</style>
