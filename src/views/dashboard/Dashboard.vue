
<template>
  <div id="dashboard">
    <lg-header :leftArrow="$route.meta.leftArrow" :titleType="1" :title='$route.meta.title'></lg-header>
    <!-- 缓存界面选择加载 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <lg-footer></lg-footer>
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'DashBoard',
  mounted() {},
  created() {
 
  },

  data() {
    return {

    }
  },
  components: {},

  computed: {

  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>

</style>
