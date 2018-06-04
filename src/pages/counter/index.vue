<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index/main" class="home">去往首页</a>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  COUNT_DECREMENT,
  COUNT_INCREMENT
} from '@/store/mutations-type'

export default {
  computed: {
    ...mapState('counter', {
      count: state => state.count
    })
  },
  methods: {
    ...mapMutations('counter', {
      decrement: COUNT_DECREMENT,
      increment: COUNT_INCREMENT
    })
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
