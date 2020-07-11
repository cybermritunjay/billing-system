	require('jquery')
if(typeof jQuery!=='undefined'){
    console.log('jQuery Loaded');
}
else{
    console.log('not loaded yet');
}

function tooltipdel(delid){
	console.log(delid);
	elem = document.getElementsByClassName('delcfm');
	console.log(elem)
	elem[0].setAttribute("id", delid+"del");

}
function tooltipedit(delid){
	console.log(delid);
	var elem =document.getElementById('editEmployeeForm').id;
	fill=delid.split("update");
	elem.setAttribute("value", fill[0]);

}

function delemp(cid){

	var Datastore = require('nedb');
 
    var db = {};
    db.users = new Datastore('assets/databases/users.db');
          var del= cid.split("del")[0]
    db.users.loadDatabase();
    db.users.remove({_id: del});
}
$(document).ready(function(){

	$('#submitaddemp').click(function(e){
		e.preventDefault();
		var dat =document.getElementById('addempform');

		var Datastore = require('nedb');
 
    var db = {};
    db.users = new Datastore('assets/databases/users.db');
           
    db.users.loadDatabase();
    var doc = { username: dat.username.value
               , password: dat.pass.value
               , accType: 'emp'
               , fullname: dat.name.value
               , email: dat.email.value
               , mob: dat.mobile.value
               , address : dat.address.value
               , dateCreated: new Date()
               };
    db.users.insert(doc, function (err, newDoc) {   
					console.log("inserted");
					window.location.reload();
				});
    

	})
		$('#submitEmployeeForm').click(function(e){
		e.preventDefault();
		var dat =document.getElementById('editEmployeeForm');

		var Datastore = require('nedb');
 
    var db = {};
    db.users = new Datastore('assets/databases/users.db');
     var idupdate = dat.id.value
    db.users.loadDatabase();
    var doc = { username: dat.username.value
               , password: dat.pass.value
               , accType: 'emp'
               , fullname: dat.name.value
               , email: dat.email.value
               , mob: dat.mobile.value
               , address : dat.address.value
               , dateCreated: new Date()
               };
    db.users.insert( { _id: idupdate },
   {
     doc
   },
   { upsert: true });

	})

	var Datastore = require('nedb');
 
    var db = {};
    db.users = new Datastore('assets/databases/users.db');
           
    db.users.loadDatabase();
    db.users.find({}, function (err, docs) {
                    if (docs != null){
                    	for ($i in docs){
                    	$dat='<tr><td><span class="custom-checkbox"><input type="checkbox" id="checkbox'+$i+'" name="options[]" value="'+docs[$i]._id+'"><label for="checkbox'+$i+'"></label></span></td><td>'+docs[$i].username+'</td><td>'+docs[$i].name+'</td><td>'+docs[$i].email+'</td><td>'+docs[$i].address+'</td><td>'+docs[$i].mob+'<td><a href="#editEmployeeModal" onclick="tooltipedit(this.id)" id="'+docs[$i]._id+'update" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><a href="#deleteEmployeeModal" onclick="tooltipdel(this.id)" id="'+docs[$i]._id+'" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td></tr>';
                        $("#empTable").append($dat);   
                                        }
                                    }
                    });

	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
	
});