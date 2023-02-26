const express = require("express");
const router = express.Router();
const auth = require("./auth");

const webpush = require("./webpush");


// router.get("/", (req, res) => {
//   return res.status(200).json({
//     status: true,
//     version: "1.0",
//     message:
//       "Welcome to Terbang Tinggi API (Final Project Backend Javascript Binar Academy) ",
//     team: {
//       1: "Achmad Fadilla",
//       2: "John Tri Putra Sihombing",
//       3: "Muhammad Umar Mansyur",
//     },
//     location: {
//       country: "Indonesia",
//       state: "Jakarta, Medan, Madura",
//     },
//   });
// });

router.use("/auth", auth);
router.use("/webpush", webpush);


module.exports = router;
