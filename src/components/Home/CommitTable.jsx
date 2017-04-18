import React from 'react'
import './CommitTable.scss'

const DATA = {
	"code": 10000,
	"message": "operation success ^_^",
	"data": [
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-01T03:57:37.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-13T14:54:17.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-10-16T09:46:44.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-11T16:10:00.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-10T12:36:52.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-01T03:59:24.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-08T05:05:14.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-06T07:30:27.000Z"
		},
		{
			"repo_name": "Magic-Resume",
			"time": "2017-03-22T03:31:54.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-10T16:55:20.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-26T16:25:10.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-03T08:33:37.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-16T08:43:05.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-07T13:24:37.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-09T02:35:17.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-08T03:14:42.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-04T10:12:31.000Z"
		},
		{
			"repo_name": "Magic-Resume",
			"time": "2017-03-20T07:32:48.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-03T11:55:57.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-27T09:04:09.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-14T13:26:32.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-12T03:45:16.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-02T16:25:04.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-09T08:40:48.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-14T08:40:28.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-26T10:54:32.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-02T06:26:10.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-06T06:32:55.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-27T07:25:21.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-27T00:45:32.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-28T10:09:51.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-19T01:37:02.000Z"
		},
		{
			"repo_name": "Magic-Resume",
			"time": "2017-03-22T15:32:59.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-27T07:23:42.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-31T13:08:42.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-01T18:21:32.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-04T11:26:09.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-13T16:08:39.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-06T16:42:41.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-14T06:30:06.000Z"
		},
		{
			"repo_name": "Magic-Resume",
			"time": "2017-03-23T05:29:05.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-04T10:40:28.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-14T05:15:34.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-24T03:03:04.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-08T05:55:27.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-02T15:46:47.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-09T05:27:33.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-26T00:03:57.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-27T12:17:46.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-02-21T08:47:03.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-08T07:27:52.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-02T10:37:18.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-02T12:54:08.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-04T10:12:55.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-07T12:45:40.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-09T15:59:24.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-04T04:37:02.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-11T05:43:06.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-12T11:19:10.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-14T09:51:02.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-04T05:05:23.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-05T15:07:50.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-21T06:12:06.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-03T16:25:06.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-04T08:41:08.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-12T17:26:33.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-06T06:54:03.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-10-16T07:41:20.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-14T03:09:14.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-08T12:41:35.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-30T16:29:54.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-29T16:31:17.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-30T02:59:19.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-31T13:49:21.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-25T23:35:21.000Z"
		},
		{
			"repo_name": "PythonCrawler",
			"time": "2016-08-07T13:58:06.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-26T00:06:43.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-12T03:33:56.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-10T16:11:37.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-09-09T05:11:38.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-15T15:30:50.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-14T16:29:42.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-13T16:33:18.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-07-26T05:11:04.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-07T12:46:38.000Z"
		},
		{
			"repo_name": "Battle-City-Advanced",
			"time": "2017-03-11T17:02:39.000Z"
		},
		{
			"repo_name": "Bilibili-React-Native",
			"time": "2016-08-14T09:43:01.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-01T03:18:53.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-04T14:59:22.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-06T16:50:30.000Z"
		},
		{
			"repo_name": "Github-Mobile",
			"time": "2017-04-04T13:16:16.000Z"
		}
	]
}

function dataFormat(commits) {
	//get end of the table - today
	let today = new Date(),
		weekToday = today.getDay(),
		totalDay = 52 * 7 + weekToday + 1,
		firstDay = new Date(today.getTime() - totalDay*24*60*60*1000)       //all day should be concerned

	let tableData = []
	for(let i = 0;i < totalDay;i ++)
		tableData.push(0)

	commits.map(item => {
		let d = new Date(item.time)
		if(d >= firstDay){
			let index = Math.floor((d.getTime() - firstDay.getTime())/24/60/60/1e3)
			tableData[index] ++
		}
	})

	//format the table into a two-dimensional matrix
	let result = []
	for(let i = 0;i < 7;i ++){
		let temp = []
		for(let k = 0;k < 53*7;k += 7){
			temp.push(tableData[k+i])
		}
		result.push(temp)
	}

	return result
}

export default function (props) {
	let data = dataFormat(DATA.data)

	return (
		<div className="commit-table">
			<table>
				<tbody>
				{
					data.map((item,i)=>{
						return (
							<tr key={i}>
								{
									item.map((t,j)=><td key={i+'-'+j} className={`level-${t>=4?4:t}`}> </td>)
								}
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>
	)
}