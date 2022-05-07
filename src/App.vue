<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {useBankAccountStore} from './stores/bankAccount'
import { ref } from 'vue'

const store = useBankAccountStore();

store.$onAction(({ name, store, after}) => {
  after( result => {
    if(result){
      store.processTransation(result);
    }
  })
})

const payAmount = ref(0);
const submitPayment = () => {
  if(payAmount.value){
    store.pay(payAmount.value);
    payAmount.value = 0;
  }
}

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Bank Account Pinia" />
      <button @click="store.reconcile()">reconcile</button>
      <h3>Balance : {{ store.runningBalance }} </h3>
      <button @click="store.charge(5)">Buy coffee for $5</button>

      <div>
        Payment Amount : <input type="number" v-model="payAmount" />
        <button @click="submitPayment">PAY</button>
      </div>

      <h3>Pending : </h3>
      <ul>
        <li v-for="item in store.pendingTransactions" :key="item.id">
          ${{ item.amount }}
        </li>
      </ul>

      <h3>Processed : </h3>
      <ul>
        <li v-for="item in store.processedTransactions" :key="item.id">
          ${{ item.amount }}
        </li>
      </ul>
    </div>
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

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
