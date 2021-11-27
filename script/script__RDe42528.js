function verify(form) {
	if (
		validateFirstName(form) &&
		validateLastName(form) &&
		validateAge(form) &&
		validateEmail(form) &&
		validateDate(form) &&
		validatePhone(form) &&
		validateTimeSlots(form)
	) {
		return true;
	} else return false;
}

function validateFirstName(form) {
	let fname = form.elements["firstName"];

	// check whether the input is missing/empty or not
	if (fname.validity.valueMissing) {
		fname.setCustomValidity("Please enter your First name");
		return false;
	} else {
		// turn off the custom message
		fname.setCustomValidity("");
		localStorage.setItem("fname", fname.value);
		return true;
	}
}

function validateLastName(form) {
	let lname = form.elements["lastName"];

	// check whether the input is missing/empty or not
	if (lname.validity.valueMissing) {
		lname.setCustomValidity("Please enter your Last name");
		return false;
	} else {
		// turn off the custom message
		lname.setCustomValidity("");
		localStorage.setItem("lname", lname.value);
		return true;
	}
}

function validateAge(form) {
	let age = form.elements["age"];
	if (age.validity.valueMissing || isNaN(age.value)) {
		age.setCustomValidity("Please enter Age in Number");
		return false;
	} else if (age.validity.rangeUnderflow || age.validity.rangeOverflow) {
		age.setCustomValidity("Age should  be between 5 and 120");
		return false;
	} else {
		age.setCustomValidity("");
		return true;
	}
}

function validateEmail(form) {
	let email = form.elements["email"];
	if (email.validity.valueMissing) {
		email.setCustomValidity("Please enter Email");
		return false;
	} else if (email.validity.patternMismatch) {
		email.setCustomValidity(
			"Email " + email.value + " is not in a correct format"
		);
		return false;
	} else {
		email.setCustomValidity("");
		localStorage.setItem("email", email.value);
		return true;
	}
}

function validateDate(form) {
	let today = new Date();
	let dateCheck = new Date();
	let appoinmentDate = form.elements["appoinmentDate"];

	dateCheck.setMonth(appoinmentDate.value.substring(5, 7) - 1);
	dateCheck.setDate(appoinmentDate.value.substring(8, 10));
	dateCheck.setFullYear(appoinmentDate.value.substring(0, 4));

	if (appoinmentDate.validity.valueMissing) {
		appoinmentDate.setCustomValidity("Please Enter the Date.");
		return false;
	} else if (appoinmentDate.validity.rangeUnderflow) {
		appoinmentDate.setCustomValidity(
			"Please enter the date greater than October 1, 2020."
		);
		return false;
	} else if (appoinmentDate.validity.rangeOverflow) {
		appoinmentDate.setCustomValidity(
			"Please enter the date no later than October 1, 2023."
		);
		return false;
	} else if (dateCheck - today <= 0) {
		appoinmentDate.setCustomValidity("Cannot Enter Current or Previous Date");
		return false;
	} else {
		appoinmentDate.setCustomValidity("");
		return true;
	}
}

function validatePhone(form) {
	let phone = form.elements["phone"];

	if (phone.validity.valueMissing) {
		phone.setCustomValidity("Please enter Phone Number");
		return false;
	} else if (phone.validity.patternMismatch) {
		phone.setCustomValidity("Please Input Phone Number in the Correct format");
		return false;
	} else {
		phone.setCustomValidity("");
		return true;
	}
}

function validateTimeSlots(form) {
	var slots = document.getElementById("slots1");
	//form.elements["violation"] not selecting

	if (document.querySelectorAll('input[name="slots"]:checked').length == 0) {
		slots.setCustomValidity("Please Select Atleast 1 slot.");
		return false;
	} else {
		slots.setCustomValidity("");
		return true;
	}
}

function showResult(form) {
	var target = document.getElementById("regForm");
	target.style.display = "none";
	document.getElementById("messageDiv").style.display = "inline-block";

	let generatedMessage = document.getElementById("generatedMessage");
	generatedMessage.innerText =
		"Name : " +
		localStorage.getItem("fname") +
		" " +
		localStorage.getItem("lname") +
		"\n";

	generatedMessage.innerText += "Email : " + localStorage.getItem("email");
	+"\n";
}
