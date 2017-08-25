import jsonp from '@/common/js/jsonp'
import {commonParams,options} from '@/api/config'

//歌手列表
export function getSingerList() {
	const url='https://c.y.qq.com/v8/fcg-bin/v8.fcg'
	const data = Object.assign({},commonParams,{
		pagesize:100,
		pagenum:1,
		channel:'singer',
		page:'list',
		key:'all_all_all',
		hostUin:0,
		needNewCode:0,
		platform:'yqq'
	})
	
	return jsonp(url,data,options)
}

export function  getSingerDetail(singermid) {
	const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
	
	const data=Object.assign({},commonParams,{
		hostUin:0,
		platform:'yqq',
		needNewCode:0,
		order: 'listen',
		begin: 0,
		num:100,
		songstatus: 1,
		singermid:singermid
	})
	
	return jsonp(url,data,options)
}
