<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      // selected: this.$route.name
    }
  },
  created () {
    // console.log(this.$route.name)
  }
}
</script>
