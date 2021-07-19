<template>
  <button @click="count++">
    You clicked me {{ count }} times.
  </button>
</template>

<script>
export default {
  name: 'Negozio',
  data() {
    return {
      count: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
