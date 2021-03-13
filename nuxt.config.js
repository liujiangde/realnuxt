
module.exports = {
  router: {
    // linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // console.log(routes)
      // 清除nuxt.js 基于pages生成的默认的路由表规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          name: '',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '',//默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/'),
            },
            {
              path: '/home',
              name: 'home1',
              component: resolve(__dirname, 'pages/home/'),
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/'),
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/'),
            },
            {
              path: '/profile/12',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/'),
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/setting/'),
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/'),
            },
            {
              path: '/article',
              name: 'article',
              component: resolve(__dirname, 'pages/article/'),
            }
          ]
        }
      ])
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]

}