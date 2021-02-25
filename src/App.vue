<template>
  <div id="app">
    <Card title="Fill your credit card information"  />
  </div>
</template>

<script>
import Vue from 'vue'
import Card from './components/Card'
import VueMask from 'v-mask'

Vue.use(VueMask)

export default {
  name: 'App',
  components: {
    Card
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin-top: 30px;

}
</style>
