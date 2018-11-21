import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import sells from '../components/sells/sells.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode:'history',
  routes: [
    {
      path:'/goods',
      component:goods
    },
    {
      path:'/ratings',
      component:ratings
    },
    {
      path:'/sells',
      component:sells
    },
    {
      path:'/',
      component:goods
    }
  ]
})
