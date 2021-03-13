import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _94d2b3ae = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _a6ed58c4 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _364d2eec = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _256f82ec = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _7618c331 = () => interopDefault(import('..\\pages\\setting' /* webpackChunkName: "" */))
const _ac706728 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _57dafc52 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _94d2b3ae,
    children: [{
      path: "",
      component: _a6ed58c4,
      name: "home"
    }, {
      path: "/home",
      component: _a6ed58c4,
      name: "home1"
    }, {
      path: "/login",
      component: _364d2eec,
      name: "login"
    }, {
      path: "/register",
      component: _364d2eec,
      name: "register"
    }, {
      path: "/profile/12",
      component: _256f82ec,
      name: "profile"
    }, {
      path: "/settings",
      component: _7618c331,
      name: "settings"
    }, {
      path: "/editor",
      component: _ac706728,
      name: "editor"
    }, {
      path: "/article",
      component: _57dafc52,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
