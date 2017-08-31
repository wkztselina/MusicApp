import jsonp from '@/common/js/jsonp'
import axios from "axios"

import {commonParams,options} from '@/api/config'

//jsonp来获取轮播图的详情
export function getRecommend(){
	 const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	 //QQ音乐的接口参数
	 const data = Object.assign({},commonParams,{
 	 	platform: 'h5',
	    uin: 0,
	    needNewCode: 1
	 })
	 
	 return jsonp(url,data,options)
	 
}

//获取歌单 使用代理
export function getDiscList() {
	const url = '/api/getDiscList'
	//QQ音乐的接口参数
	const data = Object.assign({},commonParams,{
 	 	platform: 'yqq',
	    hostUin: 0,
	    sin: 0,
	    ein: 29,
	    sortId: 5,
	    needNewCode: 0,
	    categoryId: 10000000,
	    rnd: Math.random(),
	    format: 'json'
	})
	
	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}


export function getSongList(disstid){
	 	const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

		  const data = Object.assign({}, commonParams, {
		    disstid,
		    type: 1,
		    json: 0,
		    utf8: 1,
		    onlysong: 0,
		    platform: 'yqq',
		    hostUin: 0,
		    needNewCode: 0,
		    g_tk:67232076
		  })
		  
		  return jsonp(url,data,options)

}
