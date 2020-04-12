<template>
  <div id="app">
    <index-content></index-content>
  </div>
</template>

<script>
import indexContent from 'views/index.vue'
export default {
  name: 'App',
  components: {
    indexContent,
  }
}
</script>

<style>
#app{
  display: flex;
}
</style>
