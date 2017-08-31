<template>
	<div class="singer" ref="singer">
		<loading v-show="!singers.length"></loading>
		<list-view  :data="singers" ref="list" @select="selectSinger"></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSingerList} from '@/api/singer'
	import {ERR_OK} from '@/api/config'
	import Singer from '@/common/js/singer'
	import ListView from '@/base/listView/listView'
	import Loading from '@/base/loading/loading'
	import {playingMixin} from '@/common/js/mixin'
	import {mapMutations} from 'vuex'
	
	
	const HOT_NAME='热门'
	const HOT_SINGER_LENGTH=10
	export default {
		mixins:[playingMixin],
		data() {
			return {
				singers: []
			}
		},
		created() {
			this._getSingers()
		},
		components: {
			ListView,Loading
		},
		methods:{
			handlePlayList(playList) {
				const bottom =playList.length > 0 ? '60px' : ''
				this.$refs.singer.style.bottom = bottom
				this.$refs.list.refresh()
			},
			selectSinger(singer){
				this.$router.push({
          			path: `/singer/${singer.id}`
        		})
				console.log('xxx')
				this.setSinger(singer)
			},
			//获得歌手的数据
			_getSingers() {
				getSingerList().then((res) => {
					if(res.code ===ERR_OK){
						this.singers=this._normalizeSinger(res.data.list)
						
					}
				})
			},
			//整理和封装歌手的数据
			_normalizeSinger(list) {
				console.log(1)
				let map ={
					hot :{
						title:HOT_NAME,
						items:[]
					}
				}
				list.forEach((item,index) => {
					if(index < HOT_SINGER_LENGTH){
						map.hot.items.push(new Singer({
							id:item.Fsinger_mid,
							name:item.Fsinger_name
						}))
					}
					const key = item.Findex
					if(!map[key]){
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push(
						new Singer({
							id:item.Fsinger_mid,
							name:item.Fsinger_name
						})
					)
				})
				//按字母分类的歌手
				//得到有序的列表处理map
				let hot=[] 
				let ret = []
				for(let key in map){
					let val=map[key]
					if(val.title.match(/[a-zA-Z]/)) {
						ret.push(val)
					} else if(val.title === HOT_NAME) {
						hot.push(val)
					}
				}
				ret.sort((a,b) =>{
					return a.title.charCodeAt(0)-b.title.charCodeAt(0)
				})
				console.log(ret)
				
				return hot.concat(ret)
			},
			...mapMutations({
				setSinger:'SET_SINGER'
			})
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>