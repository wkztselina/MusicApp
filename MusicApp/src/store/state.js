import {playMode}  from  '@/common/js/config'

const  state ={
	singer:{},
	playing :false,
	fullScreen :false,
	playList:[],//歌曲列表
	sequenceLsit:[],//顺序列表
	mode :  playMode.sequence ,
	currentIndex :-1,
	disc:{},
	top:{}
}


export default state