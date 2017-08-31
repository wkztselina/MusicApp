import {mapGetters} from 'vuex'

export const playingMixin = {
	computed: {
		...mapGetters([
			'playList'
		])
	},
	mounted() {
		this.handlePlayList(this.playList)
	},
	activated() {
		this.handlePlayList(this.playList)
	},
	watch: {
		playList(newVal) {
			this.handlePlayList(newVal)
		}
	},
	methods: {
		handlePlayList() {
			throw new Error('组件必须实现这个函数 handlePlayList')
		}
	}
}
