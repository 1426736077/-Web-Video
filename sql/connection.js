const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'location:3036',
    user:'root',
    password:'2002211long',
    database:'user'
})

connection.connect()

module.exports = connection