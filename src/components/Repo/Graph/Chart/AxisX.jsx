import React from "react";
import formatDate from "../../../../utils/formatDate";

export default function ({data, width, height, category= 8, selector}) {
	let day = 60 * 60 * 24
	let week = day * 7
	//get the copy of the data, since we may render it again
	let arr = data.concat(),
		len = arr.length,
		start = arr[0].w,
		end = arr[len-1].w
	let weeksCount = (arr[len-1].w - arr[0].w) / week + 1
	let span = width / weeksCount

	//dealing with the axisX, generate the category

	let count = (end - start) / day
	let everyday = width / count
	//period means the gap between labels (day)
	let period = (count / category) >>> 0
	let labels = []
	//noinspection FallThroughInSwitchStatementJS
	switch (true){
		case count > 30 * 12 * 3:
			//label it with year only
			let year = new Date(start * 1000).getFullYear() + 1
			let first = new Date('1 1,'+year),
				last = new Date(end * 1000).getFullYear(),
				offset = (first.getTime() / 1000 - start) / day * everyday
			for(let k = 0;k <= last - year;k ++){
				labels.push({x: offset + k * everyday * 365, text: year + k})
			}
		//there is no statement like break, we would like to add some label on it
		case count > 30 * 12:
			if(count > 30 * 20 * 3) break
			//add months to the array of years
			//first year
			if(offset - everyday * 183 > 0) labels.push({x: offset - everyday * 183, text: 'July'})
			for(let k = 0;k <= last - year;k ++){
				if(offset + k * everyday * 183 > width) break
				labels.push({x: offset + k * everyday * 183, text: 'July'})
			}
			break
		case count > 30:
			let block = weeksCount / category
			if(selector){
				for(let i = 0;i < len;i += selector + 1){
					let text = formatDate((start + i * week) * 1000, 1)
					labels.push({x: i * width / len, text})
				}
			}else{
				for(let i = 1;i < category;i ++){
					let text = formatDate((start + i * period * day) * 1000, 1)
					labels.push({x: i * block * span, text})
				}
			}
			break
	}

	return (
		<g>
			{
				labels.map((item, index)=>(
					<line x1={item.x} x2={item.x} y2={3} key={'l'+index} style={{stroke: '#aaa'}}/>
				))
			}
			<g  transform={`translate(10,10)`}>
				{
					labels.map((item, index)=>(
						<text x={item.x-15} key={'t'+index} style={{fill: '#aaa',fontSize: 10,userSelect: 'none'}}>{item.text}</text>
					))
				}
			</g>
		</g>

	)
}