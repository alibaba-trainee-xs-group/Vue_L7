<template>
  <div>
    <div id="counter" class="flipdown"></div>
  </div>
</template>

<script>
import {Counter} from "../utils/counter"

export default {
    data() {
        return {};
    },
    mounted() {
        new Counter().start();
    }
}
</script>

<style>
    @import "../utils/counter.css";
</style>