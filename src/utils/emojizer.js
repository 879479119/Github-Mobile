import reflect from './emojiReflect'

export default function (str){
	if(!str) return ''
	let arr = str.split(':')
	let prevCover = false
	let r = arr.map((item, index)=>{
		if(item in reflect){
			if(prevCover === true){
				prevCover = false
				return ':'+item
			}
			prevCover = true
			return `<span class="emoji">${reflect[item]}</span>`
		}else{
			if(prevCover === true) prevCover = false
			return item
		}
	})
	return r.join('')
}
