/**
 * this might be the most complex part of application
 * TODO: we need to optimize its performance and abstract it
 *
 * @param asyncFunc
 * @param perPage
 * @param start
 * @param end
 * @return {Promise}
 */
module.exports = function (asyncFunc, perPage, start, end=Infinity){

	return new Promise((sol, rej)=>{
		let p = Promise.resolve(start), result = [], t
		function call(page){
			return new Promise((resolve, reject) => {
				asyncFunc(page, (err, res) => {
					if(err) rej(err)
					page ++
					result.push([...res])
					if(page > end || res.length < perPage) {
						sol(result)
					}else{
						t = t.then(call)
						resolve(page)
					}
				})
			})
		}
		return t = p.then(call)
	})
}