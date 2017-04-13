let query = function(sql, callback){

	global.pool.getConnection(function(err,conn){
		if(err){
			callback(err,null,null)
		}else{
			conn.query(sql, function(err,val,fields){
				conn.release()
				callback(err,val,fields)
			})
		}
	})
}

module.exports = query