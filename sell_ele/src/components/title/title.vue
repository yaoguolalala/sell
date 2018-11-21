<template>
    <div class="title">
        <div class="line"></div>
        <div class="text" >{{textContent}}</div>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          text: '填充内容'
        }
      },
      props:{
        inputText:{
          type: String
        }
      },
      computed:{
        textContent(){
          this.text=this.inputText||this.text
          return this.text
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .title
        display: flex
        width: 80%
        margin: 28px auto 24px auto
        .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255,255,255,.2)
        .text
            padding: 0 12px
            font-weight: 700
            font-size: 14px
</style>
