import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListTransition_01 from '@/components/ListTransition_01'
import ListTransition_02 from '@/components/ListTransition_02'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/transition-01',
      name: 'ListTransition_01',
      component: ListTransition_01
    },
    {
      path: '/transition-02',
      name: 'ListTransition_02',
      component: ListTransition_02
    }
  ]
})
