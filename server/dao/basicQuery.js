const query = function (sql, callback) {
  global.pool.getConnection((err, conn) => {
    if (err) {
      callback(err, null, null)
    } else {
      conn.query(sql, (error, val, fields) => {
        conn.release()
        callback(error, val, fields)
      })
    }
  })
}

module.exports = query
