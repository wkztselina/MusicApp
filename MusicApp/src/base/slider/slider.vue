<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot>
			</slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex == index}"></span>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	import {addClass} from "@/common/js/dom"
	export default{
		data(){
			return {
				dots:[],
				currentPageIndex:0//当前页
			}
		},
		props:{
			//循环标志
			loop:{
				type:Boolean,
				default:true
			},
			//自动标志
			autoplay:{
				type:Boolean,
				default:true
			},
			//隔时间标志
			interval:{
				type:Number,
				default:4000
			}
		},
		mounted() {
			setTimeout(() => {
				this._setSliderWidth()
				this._initDots()
				this._initSlider()
				
				if(this.autoplay){
					this._play()
				}
			}, 20)
			
			window.addEventListener('resize', () => {
				if(!this.slider){
					return 
				}
				console.log('resiz')
				this._setSliderWidth(true);
				this.slider.refresh()
			})
		},
		methods:{
			_setSliderWidth(isResize) {
				this.children = this.$refs.sliderGroup.children
				let width=0
				let sliderWidth=this.$refs.slider.clientWidth
				for(let i=0; i<=this.children.length-1;i++){
					let child=this.children[i]
					addClass(child,'slider-item')
//					console.log(child.className)
					//等于父容器的宽度
					child.style.width=sliderWidth+'px'
					//计算总的宽度
					width+=sliderWidth
				}
				//如果循环需要在头尾再增加2个
				if(this.loop && !isResize){
					width+=2*sliderWidth
				}
				this.$refs.sliderGroup.style.width = width+'px'
				
			},
			_initSlider() {
				this.slider=new BScroll(this.$refs.slider,{
					scrollX:true,//横向滑动
					scrollY:true,
					momentum:false,//惯性
					snap:true,//
					snapLoop:this.loop,//循环
					snapThreshold:0.3,
					snapSpeed:400,//速度
					click:true//可点击
				})
				//绑定滚动事件
				this.slider.on('scrollEnd',() => {
					let pageIndex=this.slider.getCurrentPage().pageX
					if(this.loop){
						pageIndex-=1
					}
					this.currentPageIndex=pageIndex
					//清除定时
					if(this.autoplay){
						clearTimeout(this.timer)
						this._play()
					}
				})
				
				
			},
			_play(){
				let pageIndex=this.currentPageIndex+1
				if(this.loop){
					pageIndex+=1
				}
				this.timer=setTimeout(() => {
					this.slider.goToPage(pageIndex,0,400)
//					console.log(pageIndex)
				},this.interval)
			},
			_initDots() {
				this.dots = new Array(this.children.length)
			}
		},
		destroyed() {
			//资源清理
			clearTimeout(this.timer)
		}
		
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>