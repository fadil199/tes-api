"use strict";
require("dotenv").config();
const webpush = require("web-push");
const fs = require("fs");

const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } = process.env;

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

let sub = require("../../subscriptions.json");
sub.splice(1, sub.length);

module.exports = {
  webPush: async (req, res) => {
    try {
      const subs = sub;
      const subscription = req.body;
      console.log("subs:", subscription);

      subs.push(subscription);
      fs.writeFile(
        "d:/Binar/npm/Final-Project-Binar/subscriptions.json",
        JSON.stringify(subs),
        (err) => {
          console.log = err;
        }
      );

      const payload = JSON.stringify({
        title: "Welcome to the Terbang Tinggi",
        body: "Where do you want to go?",
        url: 'http://localhost:3000/login'

      });

      const result = await webpush.sendNotification(subscription, payload);

      return res.status(200).json({
        status: true,
        message: "",
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  },

  webPush1: (req, res) => {
    const subscriptions = require("../../subscriptions.json");

    const payload = JSON.stringify({
      title: 'Terbang Tinggi',
      body: 'hehehe'
  });
  
  // user_id : user.id
  // data: JSON.stringify(subscription);

  subscriptions.forEach(subscription => {
      webpush.sendNotification(subscription, payload)
          .then(result => (result))
          .catch(e => (e.stack));
  });

  res.status(200).json({ 'success': true });
  },
};
