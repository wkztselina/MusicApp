// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
//Vue.config.productionTip = false
fastclick.attach(document.body)

/* eslint-disable no-unused-vars */
import vConsole from 'vconsole'

Vue.use(VueLazyLoad,{
	loading:require('@/common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
  	store,
 	render: h => h(App)
})
