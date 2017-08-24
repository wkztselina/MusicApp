<template>
	<div class="singer">
		<h1>singer</h1>
	</div>
</template>

<script>
	import {getSingerList} from '@/api/singer'
	import {ERR_OK} from '@/api/config'
	
	const HOT_NAME='热门'
	const HOT_SINGER_LENGTH=10
	export default {
		data() {
			return {
				singers: []
			}
		},
		created() {
			this._getSingers()
		},
		methods:{
			//获得歌手的数据
			_getSingers() {
				getSingerList().then((res) => {
					if(res.code ===ERR_OK){
						this.singers=res.data.list
					}
				})
			},
			//整理和封装歌手的数据
			_normalizeSinger(list){
				let map ={
					hot :{
						title:HOT_NAME,
						items:[]
					}
				}
				list.forEach((item,index) => {
					
				})
				
			}
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