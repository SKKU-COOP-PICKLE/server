module.exports = router;
const express = require('express');
var router = express.Router();
var mysql_dbc = require('../config/database.js')();
var connection = mysql_dbc.init();

mysql_dbc.test_open(connection);

router.get('/', function (req, res, next) {

  var sql = "SELECT id, img_url FROM `vw_items` WHERE `category` LIKE '상의%' OR `category` LIKE '하의%' ORDER BY RAND() LIMIT 20";
  // var sql2 = "SELECT * FROM vw_items"
  try {
    connection.query(sql, function (error, rows, fields) {
      if (!error) {
        res.send(rows)
        // for (var i = 0; i < rows.length; i++) {
        //   console.log("this is ", i, "th data ", rows[i]);
        // }
      } else {
        console.log('query error : ' + error);
      }
    });
  } catch {
    console.log("query error")
  }
  // res.status(201).end()
})

module.exports = router;