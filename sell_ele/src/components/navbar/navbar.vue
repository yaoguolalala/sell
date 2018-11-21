<template>
    <div class="tab border-1px">
       <div class="tab-item" :class="{on:'/goods'===$route.path}" @click="goTo('/goods')">商品</div>
       <div class="tab-item" :class="{on:'/ratings'===$route.path}" @click="goTo('/ratings')">评论</div>
       <div class="tab-item" :class="{on:'/sells'===$route.path}" @click="goTo('/sells')">商家</div>
    </div>
</template>

<script>
    export default {
      methods:{
        goTo(path){
          this.$router.replace(path);
        }
      }
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        /*border-bottom : 1px solid rgba(7,27,37,.1)*/
        bottom-border-1px(rgba(7,17,27,.1))
        .tab-item
            flex:1
            text-align center
            font-size: 14px
            color: #778593
            &.on
                color:rgb(240,20,20)


</style>
