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

function pad(num, n) {
	return new Array(n>num?(n-(''+num).length+1):0).join('0')+num;
}