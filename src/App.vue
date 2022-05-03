<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from './stores/counter'

const store = useCounterStore();
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="hello pinia" />
      <!-- #1 solution -->
      <button @click="store.increment()">{{ store.counter }}</button>
      <!-- #2 solution -->
      <!-- <button @click="store.counter++">{{ store.counter }}</button> -->
      <!-- #3 solution -->
      <!-- <button @click="store.$patch({ counter: store.counter + 1 })">{{ store.counter }}</button> -->

      <button @click="store.$reset()">RESET</button>
    </div>
      <span>{{ store.doubleCount }}</span>
  </header>


</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
 
}
</style>
