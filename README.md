# Github-Mobile
Application built with React, Redux, data powered by github

---
something you need to know

+ `webpack@2.0.0` instead of `1.0.0`
+ `react-router-dom` instead of `react-router@4.0.0`
+ `redux-saga` instead of `redux-thunk` or `redux-promise`
+ Chrome `Redux DevTool` extension instead of `redux-dev-tool` kit
+ `antd` in use
+ generator & async,await & decorator supported
+ `github` to authenticate and get some info
+ `express` based server
+ `cheerio` providing some info only from the pages

### Frame in work:
![home](http://7xsm7w.com1.z0.glb.clouddn.com/2549.png)

### Notice
If you want to use qiniu to deploy your resources on CDN, you can create a
file like `/config/CDNConfig.js`

```javascript
module.exports = {
	dist: "../server/dist",
	domain: "http://7xsm7w.com1.z0.glb.clouddn.com",
	bucket: "stones",
	prefix: "github",
	access_key: "<FIND_IT_IN_SETTING>",
	secret_key: "<FIND_IT_IN_SETTING>",
}
```

Then run `npm run upload`

*Upload HTML file is forbidden, and I don't know why*