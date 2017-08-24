export function addClass(el,className){
//	console.log(hasClass(el,className))
	if(hasClass(el,className)){
		return 
	}
	let newClass=el.className.split(' ')//按空格分开原本的classname
	newClass.push(className)
	el.className=newClass.join(' ')
}

export function hasClass(el,className){
//	console.log(el)
	let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
	return reg.test(el.className)
}
