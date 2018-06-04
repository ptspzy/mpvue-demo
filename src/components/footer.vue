<template>
  <div>
    <p class="card">
      {{text}}{{name}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data () {
    return {
      name: '!!!'
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
