// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const User = require("../model/userSchema");
// const Car = require("../model/carSchema");
// const Book = require("../model/bookingSchema");
// const authenticate = require("../middleware/authenticate");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "public/carImages");
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// // router.get("/", (req, res) => {
// //     res.send("Hello world from the router file of auth");
// // });

// router.post("/reg", async (req, res) => {
//   const { name, email, address, password, phone, city, state, dob } = req.body;
//   if (
//     !name ||
//     !email ||
//     !address ||
//     !phone ||
//     !password ||
//     !city ||
//     !state ||
//     !dob
//   ) {
//     return res.status(422).json({ error: "Invalid " });
//   }

//   try {
//     const userExist = await User.findOne({ email: email });
//     if (userExist) {
//       return res.status(422).json({ error: "Email already exist" });
//     }
//     const user = new User({
//       name,
//       email,
//       address,
//       password,
//       phone,
//       city,
//       state,
//       dob,
//     });

//     await user.save();

//     res.status(201).json({ message: "user registered sucessfully" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       res.status(400).json({ error: "Your data is empty" });
//     }

//     const userLogin = await User.findOne({ email: email });

//     if (userLogin) {
//       const isMatch = await bcrypt.compare(password, userLogin.password);

//       if (!isMatch) {
//         res.status(400).json({ error: "Invalid Credentials" });
//       } else {
//         const token = await userLogin.generateAuthToken(userLogin);
//         res.cookie("jwtoken", token);
//         res.json({ message: "Successfully logged in" });
//       }
//     } else {
//       res.status(400).json({ error: "Invalid Credentials" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/userprofile", authenticate, (req, res) => {
//   // console.log("User profile");
//   res.send(req.rootUser);
// });

// router.post("/updateprofile", authenticate, async (req, res) => {
//   const { _id, name, email, address, password, phone, city, state, dob } =
//     req.body;
//   let new_password = await bcrypt.hash(password, 12);
//   try {
//     await User.updateOne(
//       { _id },
//       {
//         $set: {
//           name: name,
//           email: email,
//           address: address,
//           password: new_password,
//           phone: phone,
//           city: city,
//           state: state,
//           dob: dob,
//         },
//       }
//     );

//     return res.status(202).json({ message: "Updation sucessfull" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/logout", (req, res) => {
//   console.log("Logout Page");
//   res.clearCookie("jwtoken", { path: "/" });
//   res.status(200).send("User is Logged out");
// });

// router.post("/carreg", upload.single("carimage"), async (req, res) => {
//   let carpic = req.file ? req.file.filename : null;
//   const {
//     companyname,
//     carmodel,
//     carclass,
//     transmissiontype,
//     seatingcapacity,
//     fueltype,
//     carnumber,
//     priceperday,
//   } = req.body;
//   console.log(companyname);
//   if (
//     !companyname ||
//     !carmodel ||
//     !carclass ||
//     !transmissiontype ||
//     !fueltype ||
//     !seatingcapacity ||
//     !carnumber ||
//     !priceperday
//   ) {
//     return res.status(422).json({ error: "Invalid " });
//   }
//   try {
//     const car = new Car({
//       companyname,
//       carmodel,
//       carclass,
//       transmissiontype,
//       seatingcapacity,
//       fueltype,
//       carnumber,
//       priceperday,
//       carpic,
//     });
//     await car.save();
//     res.status(201).json({ message: "car registered sucessfully" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/getallcar", async (req, res) => {
//   try {
//     const car = await Car.find({});
//     res.send(car);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/carcall", async (req, res) => {
//   const { id } = req.body;
//   try {
//     const car = await Car.findById(id);
//     res.send(car);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/updatecar", upload.single("carimage"), async (req, res) => {
//   const {
//     _id,
//     companyname,
//     carmodel,
//     carclass,
//     transmissiontype,
//     seatingcapacity,
//     fueltype,
//     carnumber,
//     priceperday,
//   } = req.body;
//   let carpic = req.file ? req.file.filename : null;
//   if (carpic) {
//     try {
//       await Car.updateOne(
//         { _id },
//         {
//           $set: { carpic: carpic },
//         }
//       );
//     } catch (err) {
//       res.status(422).json({ error: "Cannot Update Car Profile" });
//       console.log(err);
//     }
//   }
//   try {
//     await Car.updateOne(
//       { _id },
//       {
//         $set: {
//           companyname: companyname,
//           carmodel: carmodel,
//           carclass: carclass,
//           transmissiontype: transmissiontype,
//           seatingcapacity: seatingcapacity,
//           fueltype: fueltype,
//           carnumber: carnumber,
//           priceperday: priceperday,
//         },
//       }
//     );
//     return res.status(202).json({ message: "Updation sucessfull" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/availcar", authenticate, async (req, res) => {
//   try {
//     const car = await Car.find({ isbooked: false }).exec();
//     if (car) {
//       res.send(car);
//     } else {
//       return res.status(400).json({ message: "Car Not Found" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/confirmbookdetails", authenticate, async (req, res) => {
//   const { id } = req.body;
//   try {
//     const car = await Car.findById(id);
//     res.send(car);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/confirmbook", authenticate, async (req, res) => {
//   const { carid, userid, totalamount, startDate, endDate } = req.body;
//   console.log(startDate);
//   console.log(endDate);

//   // console.log(typeof (startDate));
//   // startdate = Date.parse(startDate).toISOString();

//   var startdate = new Date(startDate);
//   var enddate = new Date(endDate);
//   // startdate = startdate.toISOString();
//   // startdate = Date.parse(startDate);

//   // console.log(startdate);
//   // var enddate = Date.parse(endDate);
//   startdate.setDate(startdate.getDate() + 1);
//   enddate.setDate(enddate.getDate() + 1);
//   console.log(typeof startdate);
//   console.log(startdate);
//   console.log(enddate);
//   const book = new Book({ carid, userid, totalamount, startdate, enddate });
//   await book.save();
//   // await Car.updateOne({ _id: carid }, {
//   //     $set: {
//   //         isbooked: true,
//   //     }
//   // });
//   res.status(201).json({ message: "Booking Successfully" });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../model/userSchema");
const Car = require("../model/carSchema");
const Book = require("../model/bookingSchema");
const Admin = require("../model/adminSchema");
const authenticate = require("../middleware/authenticate");
const adminauthenticate = require("../middleware/adminauthenticate");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/carImages");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// router.get("/", (req, res) => {
//     res.send("Hello world from the router file of auth");
// });

router.post("/reg", async (req, res) => {
  const { name, email, address, password, phone, city, state, dob } = req.body;
  if (
    !name ||
    !email ||
    !address ||
    !phone ||
    !password ||
    !city ||
    !state ||
    !dob
  ) {
    return res.status(422).json({ error: "Invalid " });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const user = new User({
      name,
      email,
      address,
      password,
      phone,
      city,
      state,
      dob,
    });

    await user.save();

    res.status(201).json({ message: "user registered sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Your data is empty" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        const token = await userLogin.generateAuthToken(userLogin);
        res.cookie("jwtoken", token);
        res.json({ message: "Successfully logged in" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/userprofile", authenticate, (req, res) => {
  // console.log("User profile");
  res.send(req.rootUser);
});

router.post("/updateprofile", authenticate, async (req, res) => {
  const { _id, name, email, address, password, phone, city, state, dob } =
    req.body;
  let new_password = await bcrypt.hash(password, 12);
  try {
    await User.updateOne(
      { _id },
      {
        $set: {
          name: name,
          email: email,
          address: address,
          password: new_password,
          phone: phone,
          city: city,
          state: state,
          dob: dob,
        },
      }
    );

    return res.status(202).json({ message: "Updation sucessfull" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  console.log("Logout Page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User is Logged out");
});

router.get("/logoutadmin", (req, res) => {
  console.log("Logout Page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User is Logged out");
});

router.post(
  "/carreg",
  [adminauthenticate, upload.single("carimage")],
  async (req, res) => {
    let carpic = req.file ? req.file.filename : null;
    const {
      companyname,
      carmodel,
      carclass,
      transmissiontype,
      seatingcapacity,
      fueltype,
      carnumber,
      priceperday,
    } = req.body;
    console.log(companyname);
    if (
      !companyname ||
      !carmodel ||
      !carclass ||
      !transmissiontype ||
      !fueltype ||
      !seatingcapacity ||
      !carnumber ||
      !priceperday
    ) {
      return res.status(422).json({ error: "Invalid " });
    }
    try {
      const car = new Car({
        companyname,
        carmodel,
        carclass,
        transmissiontype,
        seatingcapacity,
        fueltype,
        carnumber,
        priceperday,
        carpic,
      });
      await car.save();
      res.status(201).json({ message: "car registered sucessfully" });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/getallcar", adminauthenticate, async (req, res) => {
  try {
    const car = await Car.find({});
    res.send(car);
  } catch (err) {
    console.log(err);
  }
});

router.post("/carcall", adminauthenticate, async (req, res) => {
  const { id } = req.body;
  try {
    const car = await Car.findById(id);
    res.send(car);
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/updatecar",
  [adminauthenticate, upload.single("carimage")],
  async (req, res) => {
    const {
      _id,
      companyname,
      carmodel,
      carclass,
      transmissiontype,
      seatingcapacity,
      fueltype,
      carnumber,
      priceperday,
    } = req.body;
    let carpic = req.file ? req.file.filename : null;
    if (carpic) {
      try {
        await Car.updateOne(
          { _id },
          {
            $set: { carpic: carpic },
          }
        );
      } catch (err) {
        res.status(422).json({ error: "Cannot Update Car Profile" });
        console.log(err);
      }
    }
    try {
      await Car.updateOne(
        { _id },
        {
          $set: {
            companyname: companyname,
            carmodel: carmodel,
            carclass: carclass,
            transmissiontype: transmissiontype,
            seatingcapacity: seatingcapacity,
            fueltype: fueltype,
            carnumber: carnumber,
            priceperday: priceperday,
          },
        }
      );
      return res.status(202).json({ message: "Updation sucessfull" });
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/availcar", async (req, res) => {
  try {
    const car = await Car.find({ isbooked: false }).exec();
    if (car) {
      res.send(car);
    } else {
      return res.status(400).json({ message: "Car Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/confirmbookdetails", authenticate, async (req, res) => {
  const { id } = req.body;
  try {
    const car = await Car.findById(id);
    res.send(car);
  } catch (err) {
    console.log(err);
  }
});

router.post("/confirmbook", authenticate, async (req, res) => {
  const { carid, userid, totalamount, startDate, endDate } = req.body;
  console.log(startDate);
  console.log(endDate);

  // console.log(typeof (startDate));
  // startdate = Date.parse(startDate).toISOString();

  var startdate = new Date(startDate);
  var enddate = new Date(endDate);
  // startdate = startdate.toISOString();
  // startdate = Date.parse(startDate);

  // console.log(startdate);
  // var enddate = Date.parse(endDate);
  startdate.setDate(startdate.getDate() + 1);
  enddate.setDate(enddate.getDate() + 1);
  console.log(typeof startdate);
  console.log(startdate);
  console.log(enddate);
  const book = new Book({ carid, userid, totalamount, startdate, enddate });
  await book.save();
  res.status(201).json({ message: "Booking Successfully" });
});

// router.post("/filter", authenticate, async (req, res) => {
//   const minamount = req.body.minamount;
//   const maxamount = req.body.maxamount;
//   let fil;
//   fil = {
//     $and: [
//       { priceperday: { $gte: minamount } },
//       { priceperday: { $lte: maxamount } },
//     ],
//   };
//   try {
//     const car = await Car.find(fil);
//     return res.status(201).json(car);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/filter", async (req, res) => {
  const minamount = req.body.minamount;
  const maxamount = req.body.maxamount;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  var startdate = new Date(startDate);
  var enddate = new Date(endDate);
  startdate.setDate(startdate.getDate() + 1);
  enddate.setDate(enddate.getDate() + 1);

  let fil;
  let fill;
  let f;
  if (minamount && maxamount && !startDate && !endDate) {
    fil = {
      $and: [
        { priceperday: { $gte: minamount } },
        { priceperday: { $lte: maxamount } },
      ],
    };
    try {
      const car = await Car.find(fil);
      return res.status(201).json(car);
    } catch (err) {
      console.log(err);
    }
  } else if (!minamount && !maxamount && startDate && endDate) {
    fill = {
      $or: [{ startdate: { $gt: enddate } }, { enddate: { $lt: startdate } }],
    };
    f = {
      $not: [
        {
          $or: [
            { startdate: { $gt: enddate } },
            { enddate: { $lt: startdate } },
          ],
        },
      ],
    };
    let data = [];
    let notrequired = [];
    try {
      const b = await Book.find(fill);
      const nb = await Book.find(f);
      for (let i = 0; i < nb.length; i++) {
        const t = await Car.findOne({ _id: nb[i].carid });
        notrequired.push(t._id);
      }
      for (let i = 0; i < b.length; i++) {
        const temp = await Car.findOne({ _id: b[i].carid });
        data.push(temp);
        notrequired.push(temp._id);
      }
      const c = await Car.find({ _id: { $nin: notrequired } });
      for (let i = 0; i < c.length; i++) {
        data.push(c[i]);
      }
      return res.status(201).json(data);
    } catch (err) {
      console.log(err);
    }
  } else if (minamount && maxamount && startDate && endDate) {
    fill = {
      $or: [{ startdate: { $gt: enddate } }, { enddate: { $lt: startdate } }],
    };
    f = {
      $not: [
        {
          $or: [
            { startdate: { $gt: enddate } },
            { enddate: { $lt: startdate } },
          ],
        },
      ],
    };

    let data = [];
    let notrequired = [];
    try {
      const b = await Book.find(fill);
      const nb = await Book.find(f);
      for (let i = 0; i < nb.length; i++) {
        const t = await Car.find({ _id: nb[i].carid });
        notrequired.push(t._id);
      }
      for (let i = 0; i < b.length; i++) {
        const temp = await Car.findOne({ _id: b[i].carid });
        data.push(temp);
        notrequired.push(temp._id);
      }
      fil = {
        $and: [
          { priceperday: { $gte: minamount } },
          { priceperday: { $lte: maxamount } },
          { _id: { $nin: notrequired } },
        ],
      };
      const c = await Car.find(fil);
      for (let i = 0; i < c.length; i++) {
        data.push(c[i]);
      }
      return res.status(201).json(data);
    } catch (err) {
      console.log(err);
    }
  }
  let te = [];
  return res.json(te);
});

router.post("/bookedcar", authenticate, async (req, res) => {
  const { id } = req.body;
  try {
    const book = await Book.find({ carid: id });
    return res.json(book);
  } catch (err) {
    console.log(err);
  }
});

router.post("/adminreg", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(422).json({ error: "Invalid" });
  }
  try {
    const admin = new Admin({ username, email, password });
    await admin.save();
    res.status(201).json({ message: "Admin registered sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/adminsignin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Empty Credentials" });
    }
    const adminLogin = await Admin.findOne({ username: username });

    if (adminLogin) {
      const isMatch = await bcrypt.compare(password, adminLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        const token = await adminLogin.generateAuthToken(adminLogin);
        res.cookie("jwtoken", token);
        res.json({ message: "Successfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/deletecar", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    await Car.deleteOne({ _id: id });
    res.json("Car Deleted Successfully!!");
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
