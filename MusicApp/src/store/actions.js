
import * as types from '@/store/mutation-types'
import {playMode}  from  '@/common/js/config'
import {shuffle} from  '@/common/js/util'
import {saveSearch,deleteSearch,clearSearch} from  '@/common/js/cache'

function findIndex(list,song) {
	return list.findIndex( (item) => {
		return item.id ===song.id
	})
}

export const selectPlay = function ({commit,state},{list,index}) {
	commit(types.SET_SEQUENCE_LIST,list)
	if( state.mode == playMode.random){
		let randomlist = shuffle(list)
		commit(types.SET_PLAYLIST,randomlist)
		index = findIndex(randomlist,list[index])
	}else{
		commit(types.SET_PLAYLIST,list)
	}
	commit(types.SET_CURRENT_INDEX,index)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)
}

export const randomPlay = function ({commit},{list}) {
	commit(types.SET_PLAY_MODE,playMode.random) 
	commit(types.SET_SEQUENCE_LIST,list)
	let randomlist = shuffle(list)
	commit(types.SET_PLAYLIST,randomlist)
	commit(types.SET_CURRENT_INDEX,0)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)
	
}

export const insertSong= function ({commit,state},song) {
	let playList = state.playList.slice()
	let sequenceLsit =state.sequenceLsit.slice()
	let currentIndex = state.currentIndex
	//记录当前的歌曲
	let currentSong = playList[currentIndex]
	//查找当前列表中是否有待插入的歌曲并返回索引
	let fpIndex = findIndex(playList,song)
	//插入歌曲
	currentIndex++
	//插入这首歌到当前索引为止
	playList.splice(currentIndex,0,song)
	//如果已经包含了这首歌
	if(fpIndex > -1) {
		//如果当前插入的序号大于表中的序号
		if(currentIndex > fpIndex) 
		{
			playList.splice(fpIndex,1)
			currentIndex--
		}else{
			playList.splice(fpIndex+1,1)
		}
	}
	
	let currentSIndex = findIndex(sequenceLsit,currentSong) + 1
	let fsIndex = findIndex(sequenceLsit,song)
	sequenceLsit.splice(currentSIndex,0,song)
	
	if(fsIndex > -1){
		if(currentSIndex > fsIndex){
			sequenceLsit.splice(fsIndex,1)
		}else{
			sequenceLsit.splice(fsIndex+1,1)
		}
	}
	
	commit(types.SET_PLAYLIST,playList)
	commit(types.SET_SEQUENCE_LIST,sequenceLsit)
	commit(types.SET_CURRENT_INDEX,currentIndex)
	
	
}

export const saveSearchHistory = function ({commit},query) {
	commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function ({commit},query) {
	commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function ({commit}){
	commit(types.SET_SEARCH_HISTORY,clearSearch())
}

