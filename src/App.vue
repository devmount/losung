<template>
  <div id="app">
    <div class="container grid-xs">
      <div class="columns">
        <div class="column col-12 text-center mb-2">
          <h1>Die Losungen</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column col-12">

          <div v-if="data" class="card">
            <div class="card-header">
              <div class="card-title h4">{{ data[1] }}, {{ data[0] }}</div>
              <div class="card-subtitle text-gray">{{ data[2]}}</div>
            </div>
            <div class="card-body text-large">
              <blockquote>
                <p>{{ data[4] }}</p>
                <cite class="float-right">—&nbsp;{{ data[3].replace(' ', '&nbsp;') }}</cite>
              </blockquote>
              <blockquote>
                <p>{{ data[6] }}</p>
                <cite class="float-right">—&nbsp;{{ data[5].replace(' ', '&nbsp;') }}</cite>
              </blockquote>
            </div>
          </div>
          <div v-else>No data available. Make sure, the data file for {{ today.getFullYear() }} was uploaded.</div>

        </div>
      </div>
      <div class="columns mt-3 pb-5">
        <div class="column col-12 text-center text-gray">
          <p>Die Losungen<br />&copy; Evangelische Brüder-Unität<br />Herrnhuter Brüdergemeine</p>
        </div>
      </div>
    </div>

    <footer>
      <div class="container grid-xs">
        <div class="columns">
          <div class="column col-12 text-center">
            <p>
              <span class="d-block">Version 0.1.4</span>
              <i class="icon icon-resize-horiz"></i> with love by <a href="https://twitter.com/devmount" target="_blank">Andreas Müller</a>.
              <i class="icon icon-download ml-1"></i> on <a href="https://github.com/devmount/losung" target="_blank">GitHub</a>.
            </p>
          </div>
        </div>
      </div>
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
$primary-color: #30cef2;
$error-color: #ed2f47;
$body-font-color: #9ea4ad;
$bg-color: #181a1b;
$bg-color-light: #181a1b;
$bg-color-dark: #2c3638;
$border-color: #222627;
$gray-color: #595d65;
$gray-color-dark: #595d65;

@import "node_modules/spectre.css/src/spectre";
@import "node_modules/spectre.css/src/spectre-icons";
// @import "node_modules/spectre.css/src/spectre-exp";

body {
  background: #111;
}

#app {
  margin-top: 2em;
  min-height: calc(100vh - 3em);
  position: relative;

  blockquote {
    color: #c0c7d1;
    border: none;
    padding: 0 0 2em 0;
    margin: 0 0 1em 0;

    p {
      margin: 0;
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    
    p {
      color: $body-font-color;
    }
    a {
      color: #eee;
    }
  }

  .mt-3 {
    margin-top: 1em;
  }
  .pb-5 {
    padding-bottom: 5em;
  }
}
</style>
