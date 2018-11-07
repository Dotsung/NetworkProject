import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    }
  ]
})
