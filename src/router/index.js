import Vue from 'vue'
import Router from 'vue-router'
import list from '@/construct/BoardList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    }
  ]
})
