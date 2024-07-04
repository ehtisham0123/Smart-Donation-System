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

/* GET students listing. */
router.get("/new-students/:name?", verifyToken, async function (req, res, next) {
  if (req.params.name) {
    var sql = `SELECT * FROM students WHERE (CONCAT(firstname, ' ', lastname) LIKE ?) AND active_status=0`;
    name = "%" + req.params.name + "%";
    await db.query(sql, [name], function (err, result) {
      res.status(201).json({ result: result });
    });
  } else {
    var sql = ` SELECT students.* FROM students WHERE active_status=0`;
    await db.query(sql, function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
  }
});


router.get("/new/:id?",verifyToken, async (req, res, next) => {
    sql = `UPDATE students SET active_status = 1  WHERE id = ? ;`;
    db.query(
      sql,[req.params.id],
      function (err, result) {
       if (err) {
            console.log(err);
        } else {
             res.status(201).json({success: "Profile Updated" });
     }
      }
    );
})


/* GET students listing. */
router.get("/:name?", verifyToken, async function (req, res, next) {
  if (req.params.name) {
    var sql = `SELECT * FROM students WHERE (CONCAT(firstname, ' ', lastname) LIKE ?) AND active_status='1'`;
    name = "%" + req.params.name + "%";
    await db.query(sql, [name], function (err, result) {
      res.status(201).json({ result: result });
    });
  } else {
    var sql = ` SELECT students.* FROM students WHERE active_status='1'`;
    await db.query(sql, function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
  }
});


/* GET students listing. */
router.get("/edit/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT students.* FROM students WHERE students.id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      res.status(201).json({ result: result });
    });
  } catch (er) {
    console.log(err);
  }
});

/* GET students listing. */
router.get("/profile/:id", verifyToken, async function (req, res, next) {
  try {
      var sql = `SELECT students.* FROM students WHERE students.id = ?`;
      await db.query(sql, [req.params.id], function (err, result) {
            res.status(201).json({ result: result });
      });
    } catch (er) {
      console.log(err);
    }

});

 

router.put("/update",verifyToken, async (req, res, next) => {
  let id = req.body.id,
    name = req.body.name,
    email = req.body.email,
    firstname = req.body.firstname,
    lastname = req.body.lastname,
    age = req.body.age,
    housenumber = req.body.housenumber,
    streetnumber = req.body.streetnumber,
    city = req.body.city,
    state = req.body.state,
    postalcode = req.body.postalcode,
    country = req.body.country,
    contact = req.body.contact,
    gender = req.body.gender,
    avatar = req.body.avatar,
    latitude = req.body.latitude,
    longitude = req.body.longitude,
    oldEmail = req.body.oldEmail,
    cnic = req.body.cnic,
    familyincome = req.body.familyincome,
    bothparrentsdied = req.body.bothparrentsdied,
    eldersiblingage = req.body.eldersiblingage,
    studentof = req.body.studentof,
    fee = req.body.fee,
    institute = req.body.institute,
    home = req.body.home,
    updated_at = "24";

  email = email.toLowerCase();
  let photo;
  try {
    var sql = "SELECT * FROM students WHERE email = ? ";
    await db.query(sql, [email], function (err, result) {
      if (result.length > 0 && result[0].email != oldEmail) {
        return res.status(201).json({ error: "Email is already registered" });
      } else {
        if (req.files === null) {
          photo = avatar;
        } else {
          if (req.body.avatar != 'profile.png') {
            fs.unlinkSync(
              `${__dirname}/../../public/uploads/${req.body.avatar}`
            );
          }
          const avatar = req.files.file;
          photo = avatar.name.split(".");
          photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
          (async () => {
            avatar.mv(
              `${__dirname}/../../public/uploads/${photo}`,
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          })();
        }
        sql = `UPDATE students SET  email = ? , firstname = ? , lastname = ? , gender = ? , age = ? , contact = ? , avatar = ? , housenumber = ? , streetnumber = ? , city = ? , state = ? , postalcode = ? , country = ? , latitude = ? , longitude = ? , cnic = ? ,familyincome = ? , bothparrentsdied = ? , eldersiblingage = ? , home = ? , studentof = ? ,  institute = ?  , fee = ? ,  updated_at = ? WHERE id = ? ;`;
        db.query(
          sql,
          [
            email,
            firstname,
            lastname,
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
            cnic,
            familyincome,
            bothparrentsdied,
            eldersiblingage,
            home,
            studentof,
            institute,
            fee,
            updated_at,
            id
          ],
          function (err, result) {
            if (err) {
              res.status(201).json({ error: "Error while updating data" });
            } else {
                res.status(201).json({ avatar:photo ,success: "Profile Updated" });
         }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
});



router.delete("/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT students.avatar FROM students WHERE students.id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      if (result[0].avatar != 'profile.png') {
        fs.unlinkSync(
          `${__dirname}/../../public/uploads/${result[0].avatar}`
        );
      }
      (async () => {
        try {
          var sql = `DELETE FROM students WHERE id = ?`;
          await db.query(sql, [req.params.id], function (err, result) {
            res.status(201).json({ result: result });
          });
        } catch (err) {
          console.log(err);
        }
      })();
    });
  } catch (er) {
    console.log(err);
  }
});

module.exports = router;
