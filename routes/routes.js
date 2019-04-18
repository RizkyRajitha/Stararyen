const express = require("express");
const router = express.Router();
//const passport = require("passport");
const User = require("../db/users");
//const Candidate = require("../db/candidates");
const ObjectID = require("mongodb").ObjectID;
//require("../config/passport");
//const emailhandler = require("../config/emailhandler");
const path = require("path");
//const Evaluation = require("../db/evaluation");

// const profileimgupload = require("./fileupload.routes");
// const adminRoutes = require('./admin.routes')

//const mailhandleremailconfirm = require('../config/emailhandler')

// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '/../../client/build/index.html'));
// });

router.post("/reg", (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("-----in reg ------");
      console.log(info);

      if (user) {

       

        console.log(`************${req.headers.authorization}****************`);

        const newuser = new User({
          email: req.body.email,
          hash: req.body.password,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          usertype: req.body.usertype
        });
        console.log(`email - ${req.body.email}  pass - ${req.body.password}`);
        //newuser.setpass(req.body.password);
        console.log('>>>>><<<<<<'+user.usertype)

        User.findById(ObjectID(user.id)).then((doc) => {
          console.log(doc.usertype)
          if(doc.usertype==='admin'){
            newuser
            .save()
            .then(result => {
              console.log("succsess");
              //var token = result.generateJWT();
              return res.status(200).send({});
            })
            .catch(err => {
              console.log(" reg err -  " + err);
  
              if (err.code === 11000) {
                console.log(" reg err duplicate email found ");
                res.status(403).json(err.code);
              } else {
                res.status(403).json(err);
              }
            });
          }else{
            res.status(403).json('no_previladges');
          }


          
        }).catch((err) => {
          
        });


        


      }
    }
  )(req, res, next);
});

router.post("/login1", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    console.log("ppppp");
    if (err) {
      console.log("error no user");
      return next(err);
    }
    if (!user) {
      console.log("error no1");
      console.log(info.message);
      return res.send(user);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      } else {
        console.log("done");
        var token = user.generateJWT();
        // res.cookie("jwt", token, { httpOnly: true, secure: true });
        return res.status(200).send(token);
      }
    });
  })(req, res, next);
});

router.get("/dashboard", (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + user);
      console.log("info -- " + info);

      if (!user) {
        res.status(401).send(info);
      } else {
        User.findById(ObjectID(user.id))
          .then(result => {
            const senddata = {
              id: result._id,
              email: result.email,
              emailverified: result.emailverified,
              firstName: result.firstName,
              lastName: result.lastName,
              usertype:result.usertype
            };
            console.log(senddata);
            res.status(200).json(senddata);
          })
          .catch(err => {
            res.status(403).json(err);
          });
      }
    }
  )(req, res, next);
});


router.post("/sendconfirmemail/:id", (req, res) => {
  console.log(req.params.id);


  User.findById(ObjectID(req.params.id))
    .then(doc => {
      console.log('tryna sent')
      emailhandler.mailhandleremailconfirm(doc.email, doc._id);
      res.status(200).send("email sent");
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/confirmemail/:id", (req, res) => {
  console.log(req.params.id);

  User.findOneAndUpdate(
    { _id: ObjectID(req.params.id) },
    { $set: { emailverified: true } }
  )
    .then(doc => {
      console.log("verified + " + doc.emailverified);
      res.send("email verified");
    })
    .catch(err => {
      console.log("error confirming email");
    });
});

router.post("/fogotpassword", (req, res) => {
  var email = req.body.email;

  User.find({ email: email })
    .then(result => {
      if (!result) {
        console.log(result + "not found error");
        res.send("no user found");
      } else {
        emailhandler.mailhandlerpasswordreset(email, result[0]._id);
        console.log(result[0]._id);
        res.json(result);
      }
    })
    .catch(err => {
      console.log("error - - - "+err);
      res.send("no_user_found");
    });
});


router.get("/getcandidate", (req, res) => {
  console.log("hiiii");
  // var iid = req.params.id;
  //console.log(iid);

  Candidate.find()
    .then(result => {
      res.status(200).json(result);
      console.log("candidates found");
    })
    .catch(err => {
      console.log("error - " + err);
    });

  // User.findById(ObjectID(iid))
  //   .then(result => {
  //     console.log("found" + result);
  //     res.json(result);
  //   })
  //   .catch(err => {
  //     console.log("err - " + err);
  //   });
});



router.get("/test", (req, res) => {
  // var ada = new Date();
  // console.log(ada);
  // const newuser = new User({
  //   email: "admin@auxenta.com",
  //   hash: "admin"
  // });

  // newuser
  //   .save()
  //   .then(result => {
  //     res.send(result);
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   });

can = ['aa','bb']

  User.findOneAndUpdate(
    { _id: ObjectID('5ca98a6200d8ab4264d7dffc') },
    {
      $set: {
        assinngedCandidates:can
      }
    }
  ).then(result=>{
    console.log(result)
    res.send(result)
  }).catch(err=>{
console.log(err)
  })




});

// router.post("/avatar/:id", profileimgupload.profileimgup);
// router.post("/cv/:id", profileimgupload.cvupload);
// router.post('/adminlogin',adminRoutes.adminLogin)
// router.get("/userdata",adminRoutes.userlist)






module.exports = router;
