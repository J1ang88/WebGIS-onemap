import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import onemap from '@/components/onemap'
import Tileset from '@/components/Tileset'
// import Data from '@/components/Data'
import user_data from '@/components/user_data'
import map from '@/components/map'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
 return originalPush.call(this, location).catch(err => err)
}
const router =new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/map',
      name: 'map',
      component: map,
      children:[
        {
          path: '',
          name: 'index',
          component: index
        },
        {
          path: 'onemap',
          name: 'onemap',
          component: onemap
        },
        {
          path: 'Tileset',
          name: 'Tileset',
          component: Tileset
        },
        {
          path: 'user_data',
          name: 'user_data',
          component: user_data
        }
      ]
    }]
})
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router;
 
