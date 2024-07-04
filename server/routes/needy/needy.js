const express = require("express");
const verifyToken = require("../verifyToken");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const mysql = require("mysql");
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

router.post("/signup", async (req, res, next) => {
  
  // Getting Data
  let email = req.body.email,
    firstname = req.body.firstname,
    lastname = req.body.lastname,
    fathername = req.body.fathername,
    age = req.body.age,
    housenumber = req.body.housenumber,
    streetnumber = req.body.streetnumber,
    city = req.body.city,
    state = req.body.state,
    postalcode = req.body.postalcode,
    country = req.body.country,
    contact = req.body.contact,
    gender = req.body.gender,
    latitude = req.body.latitude,
    longitude = req.body.longitude,
    cnic = req.body.cnic,
    widow = req.body.widow,
    numberofchildren = req.body.numberofchildren,
    familyincome = req.body.familyincome,
    bothparrentsdied = req.body.bothparrentsdied,
    elderchildage = req.body.elderchildage,
    home = req.body.home;

  email = email.toLowerCase();
  let photo;

  try {
    var sql = "SELECT * FROM needies WHERE email = ? ";
    await db.query(sql, [email], function (err, result) {
      if (result.length > 0) {
        return res.status(201).json({ error: "Email is already registered" });
      } else {
        if (!req.files.avatar) {
          photo = "profile.png";
        } else {
          const avatar = req.files.avatar;
          photo = avatar.name.split(".");
          photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
          (async () => {
            avatar.mv(`${__dirname}/../../public/uploads/${photo}`, (err) => {
              if (err) {
                console.error(err);
              }
            });
          })();
        }
        let file_name;
        let file_type;
        if (req.files) {
          if (req.files.file) {
            const file = req.files.file;
            file_name = file.name.split(".");
            file_type = file_name[file_name.length - 1];
            file_name =
              file_name[0] +
              "." +
              Date.now() +
              "." +
              file_name[file_name.length - 1];
            file.mv(`${__dirname}/../../public/uploads/${file_name}`, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        }

        (async () => {
          var sql =
            "INSERT INTO `needies` ( email,firstname,lastname,fathername,gender,age,contact,avatar,housenumber,streetnumber,city,state,postalcode,country,latitude,longitude,file_name,file_type,cnic,widow,numberofchildren,familyincome,bothparrentsdied,elderchildage,home) VALUES (?)";
          var values = [
            email,
            firstname,
            lastname,
            fathername,
            gender,
            age,
            contact,
            photo,
            housenumber,
            streetnumber,
            city,
            state,
            postalcode,
            country,
            latitude,
            longitude,
            file_name,
            file_type,
            cnic,
            widow,
            numberofchildren,
            familyincome,
            bothparrentsdied,
            elderchildage,
            home,
          ];
          await db.query(sql, [values], function (err, result) {
            if (err) {
              console.log(err);
              res.status(201).json({ error: "Error while inseting data" });
            } else {
              res.status(201).json({ success: "Data Registered" });
            }
          });
        })();
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
