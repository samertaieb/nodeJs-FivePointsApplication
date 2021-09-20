var express = require("express");
const user = require("../models/user");
var router = express.Router();
var User = require("../models/user");
const nodemailer = require("nodemailer");

/* GET users listing. */
router.post("/addUser", function (req, res, next) {
  var user = new User(req.body);
  user
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
});
router.get("/getUsers", (req, res, next) => {
  User.find()
    .populate("todos")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/getUserbyId/:idUser", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});
router.put("/updateUser/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      res.json(user);
    })
    .catch(error => res.json(error));
});
router.delete("/deleteUser/:id", (req, res, next) => {
  User.findByIdAndRemove(req.params.id).then(user => {
    res.json(user).catch(err => res.json(err));
  });
});
router.post("/sendEamil/:id", async (req, res, next) => {
  const user = await User.findById(req.params.id);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL || "taieb.samer3@gmail.com", // TODO: your gmail account
      pass: process.env.PASSWORD || "samerxmfyv819frkxa", // TODO: your gmail password
    },
  });
  // Step 2
  let mailOptions = {
    from: "taieb.samer3@gmail.com", // TODO: email sender
    to: user.email, // TODO: email receiver
    subject: "Nodemailer - Test",
    text: "Wooohooo it works!!",
  };
  // Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json(err);
      console.log(err);
    }
    console.log("email sent");
    return res.json("Email sent!");
  });
});

router.post("/sendMultipleEmails", async (req, res, next) => {
  const users = await User.find(req.params.id);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL || "taieb.samer3@gmail.com", // TODO: your gmail account
      pass: process.env.PASSWORD || "samerxmfyv819frkxa", // TODO: your gmail password
    },
  });
  users.forEach(user => {
    // Step 2
    let mailOptions = {
      from: "taieb.samer3@gmail.com", // TODO: email sender
      to: user.email, // TODO: email receiver
      subject: "Nodemailer - Test",
      text: "Wooohooo it works!!",
      html: "<b>test</b>",
    };
    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        res.json(err);
        console.log(err);
      }
      console.log("email sent");
    });
  });
  return res.json("Email sent!");
});

module.exports = router;
