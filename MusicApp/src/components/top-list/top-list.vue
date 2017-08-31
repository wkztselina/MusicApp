<template>
	<transition name="slide">
		<music-list :rank="rank"  :title="title" :bg-image="bgImage" :songs="songs"></music-list>
	</transition>
</template>

<script>
	import MusicList from '@/components/music-list/music-list'
	import {getMusicList} from '@/api/rank'
	import {mapGetters} from 'vuex'
	import {ERR_OK} from '@/api/config'
	import {createSong} from '@/common/js/song'
	export default {
		data(){
			return {
				songs:[],
				rank:true
			}
		},
		computed:{
			title() {
		        return this.top.topTitle
	      	},
	      	bgImage() {
		        if (this.songs.length) {
		          return this.songs[0].image
		        }
		        return ''
	     	},
			...mapGetters([
				'top'
			])
		},
		created(){
			this._getMusicList()
		},
		components:{
			MusicList
		},
		methods:{
			_getMusicList(){
//				console.log(this.top.id)
				if(!this.top.id){
				  	this.$router.push('/rank')
				  	return
				}
				getMusicList(this.top.id).then((res) => {
					if(ERR_OK === res.code){
						this.songs=this._normalizeSongs(res.songlist)
					}
				})
			},
			_normalizeSongs(list) {
		        let ret = []
		        list.forEach((item) => {
		          const musicData = item.data
		          if (musicData.songid && musicData.albummid) {
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
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>