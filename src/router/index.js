import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import Dashboard from '@/components/Dashboard'

// import BookList from '@/components/book/list'
// import BookCategoryList from '@/components/bookcategory/list'

// import UserList from '@/components/user/list'
// import UserChangePwd from '@/components/user/changepwd'
// import UserProfile from '@/components/user/profile'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

// import HelloWorld from '@/components/HelloWorld'
import GetKirinProtected from '@/components/kirinprotected/getkirinprotected'
import KirinProtectedService from '@/components/kirinprotected/kirinprotectedservice'
import SwellSettleClaim from '@/components/swellsettle/swellsettleclaim'
import DrumRoll from '@/components/kirinprotected/drumRoll'
import IntroductionKirinBao from '@/components/kirinprotected/IntroductionKirinBao'
import KirinBao from '@/components/kirinprotected/kirinBao'




Vue.use(Router)

let router = new Router({
  // mode: 'history',
  mode: 'hash',
  base: '',
  routes: [{
      path: '/kirinprotected/kirinBao',
      name: 'kirinBao',
      component: KirinBao,

    },
    {
      path: '/kirinprotected/IntroductionKirinBao',
      name: 'IntroductionKirinBao',
      component: IntroductionKirinBao,

    },
    {
      path: '/kirinprotected/drumRoll',
      name: 'drumRoll',
      component: DrumRoll,

    },
    {
      path: '/kirinprotected/kirinprotectedservice',
      name: 'kirinprotectedservice',
      component: KirinProtectedService,

    },
    {
      path: '/kirinprotected/getkirinprotected',
      name: 'getkirinprotected',
      component: GetKirinProtected,

    },
    {
      path: '/swellsettle/swellsettleclaim',
      name: 'swellsettleclaim',
      component: SwellSettleClaim,

    },
    // {
    //   path: '/helloworld',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: '/login',
    //   name: '登录',
    //   component: Login
    // },

    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   redirect: '/dashboard',
    //   leaf: true, // 只有一个节点
    //   menuShow: true,
    //   iconCls: 'iconfont icon-home', // 图标样式class
    //   children: [
    //     { path: '/dashboard', component: Dashboard, name: '用户图表', menuShow: true }
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Home,
    //   name: '用户管理',
    //   menuShow: true,
    //   leaf: true, // 只有一个节点
    //   iconCls: 'iconfont icon-users', // 图标样式class
    //   children: [
    //     { path: '/user/list', component: UserList, name: '用户列表', menuShow: true }
    //   ]
    // },
    /*{
      path: '/',
      component: Home,
      name: '审核管理',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/book/list', component: BookList, name: '审核列表', menuShow: true},
        {path: '/book/category', component: BookCategoryList, name: '审核分类', menuShow: true}
      ]
    },*/
    // {
    //   path: '/',
    //   component: Home,
    //   name: '设置',
    //   menuShow: true,
    //   iconCls: 'iconfont icon-setting1',
    //   children: [
    //     { path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true },
    //     { path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true }
    //   ]
    // }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('to:' + to.path)
  if (to.path.startsWith('/kirinprotected/getkirinprotected') || to.path.startsWith('/kirinprotected/kirinprotectedservice') || to.path.startsWith('/swellsettle/swellsettleclaim') || to.path.startsWith('/kirinprotected/drumRoll') || to.path.startsWith('/kirinprotected/IntroductionKirinBao') || to.path.startsWith('/kirinprotected/kirinBao')) {

    next()

  } else {
    if (to.path.startsWith('/kirinprotected/IntroductionKirinBao')) {
      window.sessionStorage.removeItem('access-user')
      next()
    } else {
      let user = JSON.parse(window.sessionStorage.getItem('access-user'))
      if (!user) {
        next({
          path: '/kirinprotected/IntroductionKirinBao'
        })
      } else {
        next()
      }
    }

  }
  return;

})

export default router
