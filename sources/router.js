import Layout from './layout/index.vue'

const Login = resolve => require(['./login/index.vue'], resolve)

export default {
  routes: [{
    path: '/',
    component: Login
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/layout',
    component: Layout,
    children: [{
      path: 'template',
      meta: {
        auth: true
      },
      component: resolve => require(['./template/index.vue'], resolve)
    }, {
      path: 'trial',
      meta: {
        auth: true
      },
      component: resolve => require(['./trial/index.vue'], resolve)
    }, {
      path: 'judge',
      meta: {
        auth: true
      },
      component: resolve => require(['./judge/index.vue'], resolve)
    }, {
      path: 'cases',
      meta: {
        auth: true
      },
      component: resolve => require(['./cases/index.vue'], resolve)
    }, {
      path: 'demo',
      meta: {
        auth: true
      },
      component: resolve => require(['./demo/index.vue'], resolve)
    }]
  }]
}
