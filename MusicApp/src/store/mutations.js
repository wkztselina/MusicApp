import * as types from '@/store/mutation-types'

const matutaions = {
	[types.SET_SINGER](state,singer) {
		state.singer=singer
	}
}

export default matutaions