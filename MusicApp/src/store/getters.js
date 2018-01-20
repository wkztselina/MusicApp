export const singer=state =>state.singer

export const playing =state =>state.playing

export const fullScreen =state =>state.fullScreen

export const playList =state =>state.playList

export const sequenceLsit =state =>state.sequenceLsit

export const mode =state =>state.mode

export const currentIndex =state =>state.currentIndex


export const currentSong= (state) => {
	return state.playList[state.currentIndex] || {}
}

export const disc =state => state.disc

export const top =state => state.top

export const searchHistory =state => state.searchHistory