import Vue from 'vue'
import Router from 'vue-router'
import list from '../components/BoardList.vue'
import detail from '../components/detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    }
  ]
})
