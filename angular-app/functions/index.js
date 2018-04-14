const functions = require('firebase-functions');
//const fb = require('firebase')
var  admin = require('firebase-admin');
const emailjs = require('emailjs/email');
const pdfdocument = require('pdfkit');


exports.sendmailNOW = functions.database.ref('/users/{userid}/itinerary/{itineraryid}').onWrite(event => {
  // console.log( fb.database().app.auth().listUsers());


//var doc = new pdfdocument();
//var email = event.data.val().emailid;

//doc.text('This email was sent as soon as the user logged in');
//doc.end();
  console.log("HERE");
  console.log(event.data.val());

  var email = event.data.val().currentemail;
  console.log(email);

  var server = emailjs.server.connect({
    user: 'webtestingapp415@gmail.com',
    password: 'fishmonkey',
    host: 'smtp.gmail.com',
    ssl: true
  });
// name, address, guests, rooms, checkindate, checkoutdate, tbt, rewards, tax, total, Email
  server.send({
    text: "Name:" + event.data.val().hotelname + "Address:" + event.data.val().address +
    "Guest:" + event.data.numberofguests + "Rooms:" + event.data.val().numberofrooms +
    "Check In Date:" + event.data.val().checkindate + "Check out Date:" + event.data.val().checkoudate +
    "Total Before Tax:" + event.data.val().totalbeforetax + "Rewards:" + event.data.val().rewardsapplied +
    " Tax:" + event.data.val().tax + "Total:" + event.data.val().ordertotal,

    from: 'myself@thisvideo.com',
    to: event.data.val().currentemail,//email,//'webtestingapp415@gmail.com',
    subject: 'Wow, we can send an email this way',
  }, (err, message) => {
    if (err)
      console.log(err)
  })
})
