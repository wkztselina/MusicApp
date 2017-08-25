<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs" ></music-list>
	</transition>
	
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from '@/api/singer'
	import {ERR_OK} from '@/api/config'
	import MusicList from '@/components/music-list/music-list'
	
	import {createSong} from '@/common/js/song'
	export default {
		computed: {  
			title() {
				return this.singer.name
			},
			bgImage(){
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		created() {
			this._getDetail()
		},
		data() {
			return {
				songs:[]
			}
		},
		components: {
			MusicList
		},
		methods:{
			_getDetail() {
				if( !this.singer.id) {
					this.$router.push('/singer')
					return 
				}
				getSingerDetail(this.singer.id).then( (res) => {
					if(res.code === ERR_OK){
						this.songs=this._normalizeSong(res.data.list)	
						console.log(this.songs)
					}
				})
			},
			_normalizeSong(list) {
				let ret=[]
				list.forEach((item) => {
					let {musicData}=item
					if(musicData.songid && musicData.albumid){
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>