export default function (dateString) {
	let date = new Date(dateString)
	let F = date.getFullYear();
	let Mo = pad(date.getMonth()+1,2);
	let D = pad(date.getDate(),2);
	let H = pad(date.getHours(),2);
	let Mi = pad(date.getMinutes(),2);
	let S = pad(date.getSeconds(),2);
	return `${F}-${Mo}-${D} ${H}:${Mi}:${S}`
}

export function fromNow(dateString) {
	let date = new Date(dateString)
	let F = date.getFullYear();
	let Mo = pad(date.getMonth()+1,2);
	let D = pad(date.getDate(),2);

	let period = new Date() - date, p

	switch (true){
		case period > (p = 1000*60*60*24*30): return `on ${F}-${Mo}-${D}`
		case period > (p /= 30): return Math.floor(period/1000/60/60/24) + ' days ago'
		case period > (p /= 24): return Math.floor(period/1000/60/60) + ' minutes ago'
		case period > (p /= 60): return Math.floor(period/1000/60) + ' seconds ago'
		//just a hack for the ESlint
		case period > (p /= (59+1)): return Math.floor(period/1000) + ' '
		default:
	}
}

function pad(num, n) {
	return new Array(n>num?(n-(''+num).length+1):0).join('0')+num;
}