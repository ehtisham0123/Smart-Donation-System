var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "smart_donation_system",
});

// connect to database
db.connect();



/* GET needies listing. */
router.get("/:name?", verifyToken, async function (req, res, next) {
  if (req.params.name) {
    var sql = `SELECT * FROM needies WHERE (CONCAT(firstname, ' ', lastname) LIKE ?) AND active_status='1'`;
    name = "%" + req.params.name + "%";
    await db.query(sql, [name], function (err, result) {
      for (let i = 1; i < result.length; i++) {
        for (let j = 0; j < result.length - i; j++) {
          var radlat1 = (Math.PI * parseFloat(req.latitude)) / 180;
          var radlat2 = (Math.PI * parseFloat(result[j].latitude)) / 180;
          var theta =
            parseFloat(req.longitude) - parseFloat(result[j].longitude);
          var radtheta = (Math.PI * theta) / 180;
          var dist1 =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist1 > 1) {
            dist1 = 1;
          }
          dist1 = Math.acos(dist1);
          dist1 = (dist1 * 180) / Math.PI;
          dist1 = dist1 * 60 * 1.1515;
          dist1 = dist1 * 1.609344;
          radlat1 = (Math.PI * parseFloat(req.latitude)) / 180;
          radlat2 = (Math.PI * parseFloat(result[j + 1].latitude)) / 180;
          theta =
            parseFloat(req.longitude) - parseFloat(result[j + 1].longitude);
          radtheta = (Math.PI * theta) / 180;
          var dist2 =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist2 > 1) {
            dist2 = 1;
          }
          dist2 = Math.acos(dist2);
          dist2 = (dist2 * 180) / Math.PI;
          dist2 = dist2 * 60 * 1.1515;
          dist2 = dist2 * 1.609344;
          if (dist2 < dist1) {
            temp = result[j];
            result[j] = result[j + 1];
            result[j + 1] = temp;
          }
        }
      }
      res.status(201).json({ result: result });
    });
  } else {
    var sql = ` SELECT needies.* FROM needies WHERE active_status='1'`;
    await db.query(sql, function (err, result) {
      if (err) throw err;
      for (let i = 1; i < result.length; i++) {
        for (let j = 0; j < result.length - i; j++) {
          var radlat1 = (Math.PI * parseFloat(req.latitude)) / 180;
          var radlat2 = (Math.PI * parseFloat(result[j].latitude)) / 180;
          var theta =
            parseFloat(req.longitude) - parseFloat(result[j].longitude);
          var radtheta = (Math.PI * theta) / 180;
          var dist1 =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist1 > 1) {
            dist1 = 1;
          }
          dist1 = Math.acos(dist1);
          dist1 = (dist1 * 180) / Math.PI;
          dist1 = dist1 * 60 * 1.1515;
          dist1 = dist1 * 1.609344;
          radlat1 = (Math.PI * parseFloat(req.latitude)) / 180;
          radlat2 = (Math.PI * parseFloat(result[j + 1].latitude)) / 180;
          theta =
            parseFloat(req.longitude) - parseFloat(result[j + 1].longitude);
          radtheta = (Math.PI * theta) / 180;
          var dist2 =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist2 > 1) {
            dist2 = 1;
          }
          dist2 = Math.acos(dist2);
          dist2 = (dist2 * 180) / Math.PI;
          dist2 = dist2 * 60 * 1.1515;
          dist2 = dist2 * 1.609344;
          if (dist2 < dist1) {
            temp = result[j];
            result[j] = result[j + 1];
            result[j + 1] = temp;
          }
        }
      }
      res.status(201).json({ result: result });
    });
  }
});


/* GET needies listing. */
router.get("/profile/:id", verifyToken, async function (req, res, next) {
  try {
      var sql = `SELECT needies.* FROM needies WHERE needies.id = ?`;
      await db.query(sql, [req.params.id], function (err, result) {
            res.status(201).json({ result: result });
      });
    } catch (er) {
      console.log(err);
    }

});



module.exports = router;
