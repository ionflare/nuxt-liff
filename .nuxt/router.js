import Vue from 'vue'
import Router from 'vue-router'

const _4c1a71ce = () => import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */).then(m => m.default || m)
const _e5b8f1e0 = () => import('..\\pages\\index.1.vue' /* webpackChunkName: "pages_index.1" */).then(m => m.default || m)
const _137819a2 = () => import('..\\pages\\index_ori3.vue' /* webpackChunkName: "pages_index_ori3" */).then(m => m.default || m)
const _11275798 = () => import('..\\pages\\index_ori.vue' /* webpackChunkName: "pages_index_ori" */).then(m => m.default || m)
const _139448a4 = () => import('..\\pages\\index_ori2.vue' /* webpackChunkName: "pages_index_ori2" */).then(m => m.default || m)
const _133fbb9e = () => import('..\\pages\\index_ori5.vue' /* webpackChunkName: "pages_index_ori5" */).then(m => m.default || m)
const _18a8a40d = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)

Vue.use(Router)


if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/main",
			component: _4c1a71ce,
			name: "main"
		},
		{
			path: "/index.1",
			component: _e5b8f1e0,
			name: "index.1"
		},
		{
			path: "/index_ori3",
			component: _137819a2,
			name: "index_ori3"
		},
		{
			path: "/index_ori",
			component: _11275798,
			name: "index_ori"
		},
		{
			path: "/index_ori2",
			component: _139448a4,
			name: "index_ori2"
		},
		{
			path: "/index_ori5",
			component: _133fbb9e,
			name: "index_ori5"
		},
		{
			path: "/",
			component: _18a8a40d,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
