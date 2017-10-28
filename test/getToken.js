const fetch = require('node-fetch')

// access_token=b14a6741eb3b4c904f484a6604590f099aa06008&scope=repo&token_type=bearer
// fetch("http://127.0.0.1:3000").then(res => res.text())
// 	.then(res => console.log(res))
// 	.catch(err => console.log(err))

// let s = {
// 	client_id: 'af4fdd0b77c3a4073f0c',
// 	client_secret: '663866e018c8796b2947164c148a11a5e760ade2',
// 	code: '156f1693872d61139785'
// }
//
// fetch("https://github.com/login/oauth/access_token",{
// 	method: 'POST',
// 	body: `client_id=${s.client_id}&client_secret=${s.client_secret}&code=${s.code}`
// })
// 	.then(res => res.text())
// 	.then(res=>{console.log(res)})
// 	.catch(e=>console.log(e))

const GitHubApi = require('github')

const github = new GitHubApi({
  debug: true,
  protocol: 'https',
  host: 'api.github.com', // should be api.github.com for GitHub
  headers: {
    'user-agent': 'trial', // GitHub is happy with a unique user agent
  },
  Promise: require('bluebird'),
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 50000,
})

// github.users.getFollowingForUser({
// 	username: "879479119"
// }, function(err, res) {
// 	console.log(JSON.stringify(res));
// });

github.authenticate({
  type: 'oauth',
  token: 'b14a6741eb3b4c904f484a6604590f099aa06008',
})

github.users.get({
}, (err, res) => {
  console.log(res)
})

