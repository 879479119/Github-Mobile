import React from 'react'
import './RecentEvent.scss'
import temp from '../../../utils/template'
import formatDate from '../../../utils/formatDate'
import emojizer from '../../../utils/emojizer'

/**
 * all the event types here
 * @type {[*]}
 */

const types = [
	"CommitCommentEvent",
	"CreateEvent",
	"DeleteEvent",
	"DeploymentEvent",
	"DeploymentStatusEvent",
	"DownloadEvent",
	"FollowEvent",
	"ForkEvent",
	"ForkApplyEvent",
	"GistEvent",
	"GollumEvent",
	"IssueCommentEvent",
	"IssuesEvent",
	"LabelEvent",
	"MemberEvent",
	"MembershipEvent",
	"MilestoneEvent",
	"OrganizationEvent",
	"OrgBlockEvent",
	"PageBuildEvent",
	"ProjectCardEvent",
	"ProjectColumnEvent",
	"ProjectEvent",
	"PublicEvent",
	"PullRequestEvent",
	"PullRequestReviewEvent",
	"PullRequestReviewCommentEvent",
	"PushEvent",
	"ReleaseEvent",
	"RepositoryEvent",
	"StatusEvent",
	"TeamEvent",
	"TeamAddEvent",
	"WatchEvent"
]

function PushEvent() {
	let pushCount = 0,
		commits = {}
	return {
		getPushCount:()=>{
			return pushCount
		},
		getCommits:()=>{
			return commits
		},
		add:(evt, index)=>{
			//TODO: rename the repo will cause some exception
			if(evt.repo.name in commits){
				commits[evt.repo.name].size += evt.payload.size
			}else{
				commits[evt.repo.name] = {
					size: evt.payload.size,
					href: evt.repo.url
				}
			}
			pushCount ++
		},
		render:function (){
			let labels = []
			let p = this.getCommits()
			for(let key in p){
				if(p.hasOwnProperty(key)) labels.push(<p key={key}><a href={p[key].href}>{key}</a><span style={{float:'right'}}>{p[key].size}</span></p>)
			}
			return labels
		}
	}
}

function CreateEvent() {
	let list = []
	return {
		add:(evt)=>{
			switch (evt.payload.ref_type){
				case "repository": list.push({
					repo_id: evt.repo.id,
					name: evt.repo.name,
					date: formatDate(evt.created_at),
					description: evt.payload.description
				})
			}
		},
		render:function () {
			return list.map((item,index)=>{
				return (
					<div key={'i'+index} className="create-repo">
						<a href="#">{item.name}</a><em style={{float:'right'}}>{item.date.split(' ')[0]}</em>
						<p style={{background:'#f1f1f1'}} dangerouslySetInnerHTML={{__html:emojizer(item.description)}} />
					</div>
				)
			})
		}
	}
}
function ForkEvent() {
	let list = []
	return {
		add:(evt)=>{
			list.push({
				repo: evt.repo.name,
				baseUrl: evt.repo.url,
				forkee: evt.payload.forkee.full_name,
				url: evt.payload.forkee.html_url,
				date: formatDate(evt.created_at)
			})
		},
		render:function () {
			return list.map((item, key)=>(
				<p key={key}>
					<a href={item.baseUrl}>{item.repo}</a>
					<span>&nbsp;&nbsp;&nbsp;->&nbsp;&nbsp;&nbsp;</span>
					<a href={item.url}>{item.forkee}</a>
					<em style={{float:'right'}}>{item.date.split(' ')[0]}</em>
				</p>
			))
		}
	}
}

export default function (props) {
	let { style, data } = props,
		pushEvent = PushEvent(),
		createEvent = CreateEvent(),
		forkEvent = ForkEvent()
	// data = temp
	data.forEach((item, index)=>{
		switch (item.type){
			case "PushEvent": return pushEvent.add(item, index)
			case "CreateEvent": return createEvent.add(item, index)
			case "ForkEvent": return forkEvent.add(item, index)
		}
	})

	return (
		<div style={style} className="recent-event">
			<h3>Recent Events</h3>
			<section className="commits">
				<h4>Commits</h4>
				{pushEvent.render()}
			</section>
			<section className="forks">
				<h4>Forks</h4>
				{forkEvent.render()}
			</section>
			<section className="creates">
				<h4>Creates</h4>
				{createEvent.render()}
			</section>
		</div>
	)
}