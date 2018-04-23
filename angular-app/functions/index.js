const functions = require('firebase-functions');
//const fb = require('firebase')
var  admin = require('firebase-admin');
const emailjs = require('emailjs/email');
const pdfdocument = require('pdfkit');


exports.sendmailNOW = functions.database.ref('/users/{userid}/itinerary/{itineraryid}').onWrite(event => {
  // console.log( fb.database().app.auth().listUsers());

  var doc = new pdfdocument();
  var email = event.data.val().currentemail;

  doc.image('images/Logo.png', 100, 20,{
    width: 300,
    height:80});

  message = "Name: " + event.data.val().hotelname + "\nAddress: " + event.data.val().address +
    "\nGuest(s): " + event.data.val().numberofguests + "\nRooms: " + event.data.val().numberofrooms +
    "\nCheck In Date: " + event.data.val().checkindate + "\nCheck out Date: " + event.data.val().checkoudate +
    "\nTotal Before Tax: $" + event.data.val().totalbeforetax + "\nRewards: " + event.data.val().rewardsapplied +
    " \nTax: $" + event.data.val().tax + "\nTotal: $" + event.data.val().ordertotal;




  doc.fontSize(10);

  //doc.Author("Inncredible");
  //doc.font('Times-Roman');
  doc.text(message, 100, 100, {

    width: 310,
    align: 'left'
  });

  doc.end();


  var server = emailjs.server.connect({
    user: 'webtestingapp415@gmail.com',
    password: 'fishmonkey',
    host: 'smtp.gmail.com',
    ssl: true
  });
// name, address, guests, rooms, checkindate, checkoutdate, tbt, rewards, tax, total, Email
  server.send({
    text: "Thank you for booking with InnCredible. " +
    "We hope you enjoy your trip, and we look forward to serving you again",

    from: 'myself@thisvideo.com',
    to: event.data.val().currentemail,//email,//'webtestingapp415@gmail.com',
    subject: 'Hotel Booking Itinerary',

    attachment: [
      {data: 'somerandomdata', type:'application/pdf', stream: doc, name: 'Itinerary.pdf'}
    ],
  }, (err, message) => {
    if (err)
      console.log(err)
  })
})
