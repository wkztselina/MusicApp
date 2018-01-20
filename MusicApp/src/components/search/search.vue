<template>
	<div class="search">
		<div class="search-box-wrapper">
			<search-box ref="searchBox" @query="onQueryChange"></search-box>
		</div>
		<div ref="shortcutwrapper" class="shortcut-wrapper" v-show="!query">
			<scroll class="shortcut" ref="shortcut" :data="shortcut">
				<div >
					
				
				<div class="hot-key">
					<h1 class="title">热门搜索</h1>
					<ul>
						<li class="item" v-for="item in hotkey" @click="addQuery(item.k)">
							<span>{{item.k}}</span>
						</li>
					</ul>
				</div>
				<div class="search-history" v-show="searchHistory.length">
					<h1 class="title">
						<span class="text">搜索历史</span>
						<span class="clear" @click="deleteAll">
							<i class="icon-clear"></i>
						</span>
					</h1>
					<search-list :searches="searchHistory" @select="addQuery"  ></search-list>
				</div>
				</div>
			</scroll>
		</div>
		<div  ref="searchresult" class="search-result" v-show="query">
			<suggest ref="suggest" @delete="deleteOne" @select="saveSearchHistory(query)" :query="query" ></suggest>
		</div>
		<confirm ref="confirm" text="是否清空所有搜索历史" @confirm="clearSearchHistory"></confirm>
		<router-view></router-view>
	</div>
</template>

<script>
	import SearchBox from '@/base/search-box/search-box'
	import {getHotKey} from '@/api/search'
	import {ERR_OK} from '@/api/config'
	import Suggest from '@/components/suggest/suggest'
	import {mapActions,mapGetters} from 'vuex'
	import SearchList from '@/base/search-list/search-list'
	import Confirm from '@/base/confirm/confirm'
	import Scroll from '@/base/scorll/scorll'
	import {playingMixin} from '@/common/js/mixin'
	export default{
		mixins:[playingMixin],
		created(){
			this._getHotKey()
		},
		data(){
			return {
				hotkey:[],
				query:''
			}
		},
		computed :{
			shortcut() {
				return this.hotkey.concat(this.searchHistory)
			},
			...mapGetters([
				'searchHistory'
			])
		},
		watch:{
			query(newQuery){
				if(!newQuery) {
					setTimeout(() => {
						this.$refs.shortcut.refresh()
					},20)
				}
			}
		},
		components:{
			SearchBox,Suggest,SearchList,Confirm,Scroll
		},
		methods:{
			handlePlayList(playList) {
				const bottom =playList.length > 0 ? '60px' : ''
				this.$refs.searchresult.style.bottom = bottom
				this.$refs.suggest.refresh()
				this.$refs.shortcutwrapper.style.bottom = bottom
				this.$refs.shortcut.refresh()	
			},
			deleteAll(){
				this.$refs.confirm.show()
//				this.clearSearchHistory()
			},
			deleteOne(item){
				this.deleteSearchHistory(item)
			},
			saveSearch(){
				this.saveSearchHistory(this.query)
			},
			addQuery(query){
				this.$refs.searchBox.setQuery(query)
			},
			onQueryChange(query){
				this.query=query
				console.log(query)
			},
			_getHotKey(){
				getHotKey().then( (res) =>{
					this.hotkey = res.data.hotkey.slice(0,10)
				})
			},
			...mapActions([
				'saveSearchHistory',
				'deleteSearchHistory',
				'clearSearchHistory'
			])
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>