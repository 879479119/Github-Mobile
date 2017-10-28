const query = function (sql, param, callback) {
  global.pool.getConnection((err, conn) => {
    if (err) {
      callback(err, null, null)
    } else {
      conn.query(sql, param, (error, val, fields) => {
        conn.release()
        callback(error, val, fields)
      })
    }
  })
}

module.exports = query
