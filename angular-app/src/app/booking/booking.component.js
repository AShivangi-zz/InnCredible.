$(function(){
  $('a[title]').tooltip();
});

//Check in date
$(function() {
  $('#datetimepicker4').datetimepicker({
    pickTime: false
  });
});

//Check out date
$(function() {
  $('#datetimepicker5').datetimepicker({
    pickTime: false
  });
});

//Stripe token processing
var stripe = require("stripe")("sk_test_S62sR6QYYNM9biuvTdPZOH7V");
export function createCharge(token){
  stripe.charges.create({
    amount: 2000,
    currency: "usd",
    source: token,
    description: "Charge for sophia.davis@example.com"
  }, function(err, charge) {
    // asynchronously called
  });
}

//Muda muda muda muda