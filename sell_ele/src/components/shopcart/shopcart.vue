<template>
    <div>
        <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':toalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight':toalCount>0}"></i>
                    </div>
                    <div class="num" v-show="toalCount>0">{{toalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass" @click.stop.prevent="pay">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <transition name="fold">
             <div class="shopcart-list" v-show="listshow">
                 <div class="list-header">
                     <h1 class="title">购物车</h1>
                     <span class="empty" @click="empty">清空</span>
                 </div>
                 <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>￥{{food.price*food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
        <transition name="mask">
        <div class="list-mask" v-show="listshow" @click="hideList"></div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import BScroll from 'better-scroll'

    export default {
      components: {
            cartcontrol
    },
      data(){
        return {
          fold: true
        }
      },
      props:{
        selectFoods:{
          type: Array,
          default(){
            return [
              {
                price:21,
                count: 1
              }
            ];
          }
        },
        deliveryPrice:{
          type: Number,
          default: 0
        },
        minPrice:{
          type: Number,
          default: 0
        }
      },
      computed:{
        totalPrice(){
          let total = 0;
          this.selectFoods.forEach((food) => {
            total +=food.price*food.count;
          });
          return total
        },
        toalCount(){
          let count = 0;
          this.selectFoods.forEach((food) => {
            count +=food.count;
          });
          return count;
        },
        payDesc(){
          if (this.totalPrice === 0){
            return `￥${this.minPrice}元起送`;
          }else if(this.totalPrice<this.minPrice){
            let diff = this.minPrice - this.totalPrice;
            return '还差'+diff+'元起送';
          }else{
            return `去结算`
          }
        },
        payClass(){
          if (this.totalPrice < this.minPrice){
            return 'notEnough'
          }else{
            return 'enough'
          }
        },
        listshow(){
            if (!this.toalCount){
                this.fold = true
                return false
            }
            let show = !this.fold;
            if (show){
              this.$nextTick(() => {
                if (!this.scroll){
                  this.scroll = new BScroll(this.$refs.listContent,{
                    click: true
                  });
                } else {
                  this.scroll.refresh();
                }
              });
            }
            return show;
        }
      },
      methods:{
        toggleList(){
          if (!this.toalCount){
            return;
          }
          this.fold = !this.fold;
        },
        empty(){
          this.selectFoods.forEach((food) => {
            food.count = 0;
          })
        },
        hideList(){
          this.fold = true;
        },
        pay(){
          if(this.totalPrice < this.minPrice){
            return;
          }
          window.alert('支付'+this.totalPrice+'元')
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl';


    .shopcart
        position: fixed
        left: 0
        bottom: 0
        z-index: 50
        width: 100%
        height: 48px
        .content
            display: flex
            background: #141d27
            font-size: 0
            .content-left
                flex: 1
                .logo-wrapper
                    display: inline-block
                    position: relative
                    top: -10px
                    margin: 0 12px
                    padding: 6px
                    width: 56px
                    height: 56px
                    box-sizing: border-box
                    vertical-align: top
                    border-radius: 50%
                    background: #141d27
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        text-align: center
                        background: #2b343c
                        &.highlight
                            background: rgb(0,160,220)
                        .icon-shopping_cart
                            font-size: 24px
                            color: #80858a
                            line-height: 44px
                            &.highlight
                                color: #fff
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        line-height: 16px
                        text-align: center
                        border-radius: 16px
                        font-size: 9px
                        font-weight: 700
                        color: #fff
                        background: rgb(240,20,20)
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
                .price
                    display: inline-block
                    vertical-align: top
                    line-height: 24px
                    margin-top: 12px
                    box-sizing: border-box
                    padding-right: 12px
                    border-right: 1px solid rgba(255,255,255,.1)
                    font-size : 16px
                    font-weight : 700
                    color: rgba(255,255,255,.4)
                    &.highlight
                        color: #fff
                .desc
                    display: inline-block
                    vertical-align : top
                    margin: 12px 0 0 12px
                    line-height: 24px
                    font-size: 10px
                    color: rgba(255,255,255,.4)
            .content-right
                flex: 0 0 105px
                width: 105px
                .pay
                    height: 48px
                    line-height: 48px
                    text-align: center
                    font-size:  12px
                    font-weight: 700
                    color: rgba(255,255,255,.4)
                    background: #2b333b
                    &.notEnough
                        background: #2b333b
                    &.enough
                        background: #00b43c
                        color: #fff
        .shopcart-list
            position: absolute
            transform : translate3d(0,-100%,0)
            top: 0
            left: 0
            z-index: -1
            width: 100%
            &.fold-enter-active,&.fold-leave-active
                transition: 0.5s
            &.fold-enter,&.fold-leave-active
                transform : translate3d(0,0,0)
            &.fold-enter-active,&.fold-leave
                transform : translate3d(0,-100%,0)
            .list-header
                height: 40px
                line-height: 40px
                padding: 0 18px
                background : #f3f5f7
                border-bottom: 1px solid rgba(1,17,27,.1)
                .title
                    float: left
                    font-size: 14px
                    color: rgb(7,17,27)
                .empty
                    float: right
                    font-size: 12px
            .list-content
                padding: 0 18px
                max-height: 217px
                background : #fff
                overflow: hidden
                .food
                    position: relative
                    padding: 12px
                    box-sizing: border-box
                    bottom-border-1px( rgba(7,17,27,.1))
                    .name
                        line-height: 24px
                        font-size : 14px
                        color: rgb(7,17,27)
                    .price
                        position: absolute
                        right: 90px
                        bottom: 12px
                        line-height: 24px
                        font-size: 14px
                        color: rgb(240,20,20)
                        font-weight: 700
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 6px
    .list-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 40
        backdrop-filter: blur(10px)
        background: rgba(7,17,27,.6)
        &.mask-enter-active,&.mask-leave-active
            transition: all 0.3s
            opacity: 1
            background: rgba(7,17,27,.6)
        &.fold-enter,&.fold-leave-active
            opacity: 0
            background: rgba(7,17,27,0)
        &.fold-enter-active,&.fold-leave
            opacity: 1
            background: rgba(7,17,27,.6)
</style>
