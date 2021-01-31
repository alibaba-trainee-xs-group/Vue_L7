<template>
  <div class="clock">
    <button v-show="seen" class="btn" v-on:click="start">start</button>
    <div id="counter" class="flipdown"></div>
  </div>
</template>

<script>
import {Counter} from "../utils/counter"

export default {
    data() {
        return {
          seen: true,
        };
    },
    mounted() {
        this.counter = new Counter(30);
    },
    methods: {
      start: function(){
        this.counter.reset();
        this.seen = false;
      }
    }
}
</script>

<style>
    @import "../utils/counter.css";
    .clock{
      position: absolute;
      bottom: 5%;
      right: 0%;
    }
    .clock .btn{
      position: absolute;
      bottom: -7%;
      right: 107%;
      margin: 8px;
      padding: 6px 16px;
      min-width: 64px;
      border: 0;
      border-radius: 4px;
      cursor: pointer;
      outline: 0;
      vertical-align: middle;
      text-decoration: none;
      font-size: 0.875rem;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 600;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.87);
      background-color: #e0e0e0;
    }
    .clock .btn:active{
      opacity: 0.8;
    }
</style>