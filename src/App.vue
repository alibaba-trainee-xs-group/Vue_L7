<template>
  <div id="app">
    <Map msg="Hello Vue in CodeSandbox!" />
    <Clock/>
  </div>
</template>

<script>

import Map from "./components/Map";
import Clock from "./components/Clock"
//import Prompt from "./components/Prompt"
export default {
  name: "App",
  components: {
    //Prompt,
    Map,
    Clock
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
