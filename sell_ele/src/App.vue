<template>
    <div>
        <v-header :seller="seller"></v-header>
        <v-tab></v-tab>
        <router-view :seller="seller"></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  import navbar from './components/navbar/navbar.vue'
  import star   from './components/star/star.vue'


  export default {
    data () {
      return{
        seller:{}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response=response.body;
        if (response.errno === 0) {
          this.seller=response.data;
          console.log(this.seller)
        }
      })
    },
    components:{
      'v-header':header,
      'v-tab':navbar,
      'v-star': star,

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
