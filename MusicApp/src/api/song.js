import axios from "axios"

import {commonParams} from '@/api/config'

export function getLyric(mid) {
	const url='/api/lyric'
	
	const data=Object.assign({},commonParams,{
		platform:'yqq',
		needNewCode:0,
		songmid:mid,
		pcachetime : +new Date(),
		g_tk:67232076,
		format:'json'
	})
	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
	
}
