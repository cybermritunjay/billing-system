//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
function insertdata(data){
  var Datastore = require('nedb');
    var db = {};
    db.customers = new Datastore('assets/databases/customers.db');
    db.customers.loadDatabase();
    db.customers.insert(data, function (err, newDoc) {   
          console.log("inserted");
        });
}
   function updateform(){
    var Datastore = require('nedb');
    console.log("ran")
    var form = document.getElementById('userform');
    mob = form.mobile_number.value;
     var db = {};
    db.customers = new Datastore('assets/databases/customers.db');    
    db.customers.loadDatabase();
    db.customers.find({mobile: mob}, function (err, docs) {
      console.log(docs)
     form.mobile_number.value = docs[0].mobile
     form.email.value = docs[0].email
     form.customer_name.value = docs[0].name
     form.fathers_name.value = docs[0].fathersName
     form.city.value = docs[0].city
     form.district.value = docs[0].district
     form.state.value = docs[0].state
     form.zip.value = docs[0].zip
     form.refrence.value = docs[0].refrence
    });

   }
function findb(que){
  var Datastore = require('nedb');
    var db = {};
    db.customers = new Datastore('assets/databases/customers.db');
    que=que.toString()
    
    db.customers.loadDatabase();
    db.customers.find({mobile:new RegExp(que)}, function (err, docs) {
      var str= ""
      for (var i in docs) {
        str+= '<option >'+docs[i].mobile+"</option"
      }
      document.getElementById('customers').innerHTML = str;
    });
    
}

function fetchuser(dat){
  data= findb(dat);
}


function print_today() {

  var now = new Date();
  var months = new Array('जनवरी ',' फ़रवरी ',' मार्च ',' अप्रैल', "मई", "जून", "जुलाई ",' अगस्त ',' सितंबर', 'अक्टूबर ',' नवंबर', 'दिसंबर ');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  return today;
}
function printLayer(divName){
  var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}

// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function update_total() {
  var total = 0;
  $('.price').each(function(i){
    price = $(this).html().replace("$","");
    if (!isNaN(price)) total += Number(price);
  });

  total = roundNumber(total,2);

  $('#subtotal').html("$"+total);
  $('#total').html("$"+total);
  
  update_balance();
}

function update_balance() {
  var due = $("#total").html().replace("$","") - $("#paid").val().replace("$","");
  due = roundNumber(due,2);
  
  $('.due').html("$"+due);
}

function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace("$","") * row.find('.qty').val();
  price = roundNumber(price,2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("$"+price);
  
  update_total();
}

function bind() {
  $(".cost").blur(update_price);
  $(".qty").blur(update_price);
}
 $('input').click(function(){
    $(this).select();
  });

  $("#paid").blur(update_balance);

  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td class="item-name"><div class="delete-wpr"><textarea>Item Name</textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td><textarea class="cost">₹0</textarea></td><td><textarea class="qty">0</textarea></td><td><span class="price">₹0</span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  bind();
  
  $(".delete").on('click',function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  

  
  $("#date").val(print_today());
  
$(".next").click(function () {
  var form = document.getElementById('userform');
  var dat = findb(form.mobile_number.value);
  console.log(dat);
  var ins = { mobile: form.mobile_number.value
               , email: form.email.value
               , name: form.customer_name.value
               , fathersName: form.fathers_name.value
               , address: form.address.value
               , city: form.city.value
               , district : form.district.value
               , state: form.state.value
               , zip: form.zip.value
               , refrence: form.refrence.value
               };
  if (dat == undefined) {
    insertdata(ins)
  }
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  //activate next step on progressbar using the index of next_fs


  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate({ opacity: 0 }, {
    step: function (now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next_fs from the right(50%)
      left = now * 50 + "%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({
        'transform': 'scale(' + scale + ')',
        'position': 'absolute' });

      next_fs.css({ 'left': left, 'opacity': opacity });
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: 'easeInOutBack' });

});

$(".previous").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //de-activate current step on progressbar


  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate({ opacity: 0 }, {
    step: function (now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = (1 - now) * 50 + "%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({ 'left': left });
      previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: 'easeInOutBack' });

});

$(".submit").click(function () {
  return false;
});
//# sourceURL=pen.js
