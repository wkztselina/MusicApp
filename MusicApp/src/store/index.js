import Vue from 'vue'
import Vuex from 'vuex'
//import * as actions from './action'
import * as getters from '@/store/getters'
import state from '@/store/state'
import mutations from '@/store/mutations'
import createlogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
//	actions,
	getters,
	state,
	mutations,
	strict:debug,
	plugins:debug?[createlogger()]:[]
})
