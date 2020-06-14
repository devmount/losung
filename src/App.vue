<template>
  <div id="app">
    <h1>Die Losungen</h1>
    <div v-if="data">
      <div>{{ data[1] }}, {{ data[0] }}</div>
      <div>{{ data[2]}}</div>
      <blockquote>
        <p>{{ data[4] }}</p>
        <cite>—&nbsp;{{ data[3].replace(' ', '&nbsp;') }}</cite>
      </blockquote>
      <blockquote>
        <p>{{ data[6] }}</p>
        <cite>—&nbsp;{{ data[5].replace(' ', '&nbsp;') }}</cite>
      </blockquote>
    </div>
    <div v-else>No data available. Make sure, the data file for {{ today.getFullYear() }} was uploaded.</div>
    <div>
      <p>Die Losungen<br />&copy; Evangelische Brüder-Unität<br />Herrnhuter Brüdergemeine</p>
    </div>
    <footer>
      <p>
        <span class="d-block">Version 0.1.4</span>
        Built with 🤍 by <a href="https://twitter.com/devmount" target="_blank">Andreas Müller</a>.
        Download on <a href="https://github.com/devmount/losung" target="_blank">GitHub</a>.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    var d = new Date()
    return {
      today: d,
      data: ''
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
    // -- ES6:
    // fetch('2019.csv')
    //   .then(response => response.text())
    //   .then(text => self.getLosung(text))
    var rawFile = new XMLHttpRequest();
    // -- older browsers:
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

<style lang="scss">

</style>
