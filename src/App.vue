<template>
  <div id="app">
    <!-- <lg-header :leftArrow="false" :titleType="1" :title='$route.meta.title'></lg-header> -->
    <router-view/>
    <!-- <lg-footer v-if="!$route.meta.noFooter" ></lg-footer> -->
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return{
        headerTitle: '',
      }
    },
    methods: {
      
    },
    
  }
</script>

<style lang="scss">

</style>
