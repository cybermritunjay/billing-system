(function($) {
    "use strict";
    $('.input100').each(function() {
        $(this).on('blur', function() {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })
            
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function(e) {
        e.preventDefault();
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (check == true){
                        var Datastore = require('nedb');
 
            var db = {};
            db.users = new Datastore('assets/databases/users.db');
           
            db.users.loadDatabase();
            var dat=input;
            console.log("clicked")
            console.log(db)
            db.users.find({ username: dat[0].value,password: dat[1].value }, function (err, docs) {
                console.log("find ran");
                console.log(docs)
                if(err){
                    console.log(err)
                }
                    if (docs != null){
                                            console.log("authenticated");
                                            console.log(docs)
                                            window.sessionStorage.userid=docs[0]._id;
                                            if (docs[0].accType=="emp") {
                                                window.location = "window/dashbordEmploye.html";
                                            }else if (docs[0].accType=="admin") {
                                                window.location = "window/dashbord.html";
                                            }
                                        }else{
                                            alert("Wrong Credentials")
                                        }
                    });
        }
    });
    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function loginValidate(){
        
    }

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);