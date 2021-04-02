var form1 = document.getElementById("form1")
var form2 = document.getElementById("form2")
var form3 = document.getElementById("form3")
var form4 = document.getElementById("form4")

var next1 = document.getElementById("next1")
var next2 = document.getElementById("next2")
var next3 = document.getElementById("next3")

var back1 = document.getElementById("back1")
var back2 = document.getElementById("back2")
var back3 = document.getElementById("back3")

var progress = document.getElementById("progress")

var submit = document.getElementById("submit")

function validateForm() {
	var firstname = document.querySelector(".firstname");
	var lastname = document.querySelector(".lastname");
	var dob1 = document.querySelector(".dob1");
	var dob2 = document.querySelector(".dob2");
	var dob3 = document.querySelector(".dob3");
	var username1 = document.querySelector(".username");
	var password1 = document.querySelector(".password");
	var conf_password1 = document.querySelector(".conf_password");
	var security_question1 = document.querySelector(".security_question");
	var security_answer = document.querySelector(".security_answer");
	var email1 = document.querySelector(".email");

	if(firstname.value == ""){
		firstname.classList.add("hasError");
	}
	else{
		firstname.classList.remove("hasError");
	}

	if(lastname.value == ""){
		lastname.classList.add("hasError");
	}
	else{
		lastname.classList.remove("hasError");
	}

	if(dob1.value == ""){
		dob1.classList.add("hasError");
	}
	else{
		dob1.classList.remove("hasError");
	}

	if(dob2.value == ""){
		dob2.classList.add("hasError");
	}
	else{
		dob2.classList.remove("hasError");
	}

	if(dob3.value == ""){
		dob3.classList.add("hasError");
	}
	else{
		dob3.classList.remove("hasError");
	}

	if(username1.value == ""){
		username1.classList.add("hasError");
	}
	else{
		username1.classList.remove("hasError");
	}

	if(password1.value == ""){
		password1.classList.add("hasError");
	}
	else{
		password1.classList.remove("hasError");
	}

	if(conf_password1.value == ""){
		conf_password1.classList.add("hasError");
	}
	else{
		coonf_password1.classList.remove("hasError");
	}

	if(security_question1.value == ""){
		security_question1.classList.add("hasError");
	}
	else{
		security_question1.classList.remove("hasError");
	}

	if(security_answer.value == ""){
		security_answer.classList.add("hasError");
	}
	else{
		security_answer.classList.remove("hasError");
	}

	if(email1.value == ""){
		email1.classList.add("hasError");
	}
	else{
		email1.classList.remove("hasError");
	}


	var fname = document.getElementsByName("fname")[0].value;
	var lname = document.getElementsByName("lname")[0].value;
	var dob_month = document.getElementsByName("dob_month")[0].value;
	var dob_day = document.getElementsByName("dob_day")[0].value;
	var dob_year = document.getElementsByName("dob_year")[0].value;
	var formIsValid = true;

	if (!!fname && !!lname && !!dob_month && !!dob_day && !!dob_year) {
		form1.style.left = "-600px";
		form2.style.left = "40px";
		progress.style.width = "240px";
		document.getElementById("errorMessage1").innerHTML = '';
	}else{
		document.getElementById("errorMessage1").innerHTML = "All fields must be filled out.";
		formIsValid = false;
	}
	var username = document.getElementsByName("username")[0].value;
	var email = document.getElementsByName("email")[0].value;
	var password = document.getElementsByName("password")[0].value;
	var conf_password = document.getElementsByName("conf_password")[0].value;

	if (!!username && !!email && !!password && !!conf_password) {
		form2.style.left = "-600px";
		form3.style.left = "40px";
		progress.style.width = "360px";
		document.getElementById("errorMessage2").innerHTML = '';
	}else{
		document.getElementById("errorMessage2").innerHTML = "All fields must be filled out.";
		formIsValid = false;
	}
	var security_question = document.getElementsByName("security_question")[0].value;
	var answer = document.getElementsByName("security_answer")[0].value;
	
	if (!!security_question && !!answer) {
		form3.style.left = "-600px";
		form4.style.left = "40px";
		progress.style.width = "480px";
		document.getElementById("errorMessage3").innerHTML = '';
	}else{
		document.getElementById("errorMessage3").innerHTML = "All fields must be filled out.";
		formIsValid = false;
	}
	return formIsValid;
}

next1.onclick = function () {
	var fname = document.getElementsByName("fname")[0].value;
	var lname = document.getElementsByName("lname")[0].value;
	var dob_month = document.getElementsByName("dob_month")[0].value;
	var dob_day = document.getElementsByName("dob_day")[0].value;
	var dob_year = document.getElementsByName("dob_year")[0].value;

	if (!!fname && !!lname && !!dob_month && !!dob_day && !!dob_year) {
		form1.style.left = "-600px";
		form2.style.left = "40px";
		progress.style.width = "240px";
		document.getElementById("errorMessage1").innerHTML = '';
	}else{
		document.getElementById("errorMessage1").innerHTML = "All fields must be filled out.";
	}
}

next2.onclick = function () {
	var username = document.getElementsByName("username")[0].value;
	var email = document.getElementsByName("email")[0].value;
	var password = document.getElementsByName("password")[0].value;
	var conf_password = document.getElementsByName("conf_password")[0].value;

	if (!!username && !!email && !!password && !!conf_password) {
		form2.style.left = "-600px";
		form3.style.left = "40px";
		progress.style.width = "360px";
		document.getElementById("errorMessage2").innerHTML = '';
	}else{
		document.getElementById("errorMessage2").innerHTML = "All fields must be filled out.";
	}
}

next3.onclick = function () {
	var security_question = document.getElementsByName("security_question")[0].value;
	var answer = document.getElementsByName("answer")[0].value;
	
	if (!!security_question && !!answer) {
		form3.style.left = "-600px";
		form4.style.left = "40px";
		progress.style.width = "480px";
		document.getElementById("errorMessage3").innerHTML = '';
	}else{
		document.getElementById("errorMessage3").innerHTML = "All fields must be filled out.";
	}
}

back1.onclick = function () {
	form1.style.left = "40px";
	form2.style.left = "600px";
	progress.style.width = "120px";
}
back2.onclick = function () {
	form2.style.left = "40px";
	form3.style.left = "600px";
	progress.style.width = "240px";
}
back3.onclick = function () {
	form3.style.left = "40px";
	form4.style.left = "600px";
	progress.style.width = "360px";
}