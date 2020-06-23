window.onload = function() {
	document.getElementById("name").focus();
}

/* ================================= 
  Job Roles
==================================== */

/**Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".**/

//get job role other input field
const otherInput = document.getElementById('other-title');
//hide other input field for now 
otherInput.style.display = 'none';


//show or hide other input field 
const showOtherInput = ()=>{
	otherInput.style.display = 'block';
}

const hideOtherInput = ()=>{
	otherInput.style.display = 'none';
}

document.addEventListener('input', function (event) {
	// Only run on title select menu
	if (event.target.id !== 'title') return;

	if (event.target.value === 'other') {
        showOtherInput();
    }
    if (event.target.value !== 'other') {
        hideOtherInput();
    }
	
}, false);

/* ================================= 
  T-shirt Theme
==================================== */

//Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
const colorSelection = document.getElementById('color');
const colorSectionDiv = document.getElementById('colors-js-puns');

const showColorDiv = ()=>{
	colorSectionDiv.style.display = 'block';
}

const hideColorDiv = ()=>{
	colorSectionDiv.style.display = 'none';
}

hideColorDiv();

//Adding "Please Select a T-shirt theme" as an option at position 0 in select
const option = document.createElement("option");
option.text = "Please select a T-shirt theme";
colorSelection.add(option, colorSelection[0]);
colorSelection[0].selected = true;


const hideColorOptions = () =>{
	//for loop to hide all options
	for ( let i = 1 ; i < colorSelection.length ; i++){
		colorSelection[i].style.display = "none";
	}
}
//hide all color options to start with
hideColorOptions();

const jspunsColorsIndex = [];
const iheartColorIndex = [];

for (let i = 0 ; i < colorSelection.length ; i++){

	const colorSelectionValue = colorSelection[i].value;

	if(colorSelectionValue === "cornflowerblue" || colorSelectionValue === "darkslategrey" || colorSelectionValue === "gold" ){
		 jspunsColorsIndex.push(i);
	}
	if(colorSelectionValue === "tomato" || colorSelectionValue === "steelblue" || colorSelectionValue === "dimgrey" ){
		 iheartColorIndex.push(i);
	}
}

//when selecting a theme, it should run this function to show the proper colors
const showCorrectColors = (colorIndexArray) =>{
	for (let i = 0 ; i < colorIndexArray.length ; i++){
		colorSelection[colorIndexArray[i]].style.display = "block";
	}
}

document.addEventListener('input', function (event) {
	
	// Only run on title select menu
	if (event.target.id !== 'design'){
		return;
	}else{
		showColorDiv();
	}

	if (event.target.value === 'js puns') {
		hideColorOptions();
		option.text = "Select a Color";
        showCorrectColors(jspunsColorsIndex);

    }
    if (event.target.value === 'heart js') {
    	hideColorOptions();
    	option.text = "Select a Color";
        showCorrectColors(iheartColorIndex);
    }

    if (event.target.value === 'Select Theme') {
    	option.text = "Please select a T-shirt theme";
    	hideColorOptions();
    }
	
}, false);

/* ================================= 
  Activities
==================================== */

/*Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.*/

let totalCost = 0;

const activitiesCheckboxes = document.querySelectorAll('.activities input');

const priceHTML = document.createElement('p');
const acitivitiesDiv = document.querySelector('.activities');
acitivitiesDiv.appendChild(priceHTML);  
	
const printTotal = () =>{
	priceHTML.innerHTML = "Total: $" + totalCost;
}


document.querySelector('.activities').addEventListener('change', (e) => {

	const clicked = e.target;	

	const clickedDayandTime = clicked.getAttribute('data-day-and-time');

	const clickedCost = parseInt(clicked.getAttribute('data-cost'));

	//calculate totalCost, if checked, add to total, if unchecked subtract from total
	if(clicked.checked === true){
		totalCost = totalCost + clickedCost;
	}else{
		totalCost = totalCost - clickedCost;
	}

	for (let i = 0 ; i < activitiesCheckboxes.length ; i++){
		const activitiesDayandTime = activitiesCheckboxes[i].getAttribute('data-day-and-time');
		
		//disabling activities in the same time slot
		if(clickedDayandTime === activitiesDayandTime && clicked !== activitiesCheckboxes[i]){
				activitiesCheckboxes[i].disabled = true;	
					
			}
		//*When a user unchecks an activity, activites in the same time slot are no longer disabled.			
		if(clickedDayandTime === activitiesDayandTime && clicked.checked !== true){
				activitiesCheckboxes[i].disabled = false;
					
			}
		
	}

	printTotal();

});

/* ================================= 
  Payment
==================================== */

//The "Credit Card" payment option should be selected by default.
const paymentSelection = document.getElementById('payment');
paymentSelection[1].selected = true;
//disabling select payment method option
paymentSelection[0].disabled = true;


// Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.

//hide all payment result divs 
const ccDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

const hide = (paymentOption) =>{
	paymentOption.style.display = 'none';
}

const show = (paymentOption) =>{
	paymentOption.style.display = 'block';
}

hide(paypalDiv);
hide(bitcoinDiv);

document.addEventListener('input', function (event) {
	
	if (event.target.id !== 'payment') return;

	//if creditcard option is selected, show credit card div. hide paypal div, hide bitcoin div.
	if (event.target.value === 'credit card') {
		hide(paypalDiv);
		hide(bitcoinDiv);
		show(ccDiv);	
    }
    // if paypaldiv is selected, show paypalDiv, hide CC div and hide bitcoin div
    if (event.target.value === 'paypal') {
		hide(ccDiv);
		hide(bitcoinDiv);
		show(paypalDiv);	
    }

    // if bitcoin div is selected, hide CC div, and hide palpal div. show bitcoin div
    if (event.target.value === 'bitcoin') {
		hide(ccDiv);
		hide(paypalDiv);
		show(bitcoinDiv);	
    }
    
	
}, false);

/* ================================= 
  Validations
==================================== */

const form = document.querySelector("form");
const name = document.querySelector("#name");
const mail = document.querySelector('#mail');


// Name field can't be blank.
const nameValidator = () =>{
	let nameValue = name.value;
	if(nameValue.length > 0){
		name.style.border = "solid white";
		return true;
	}else{
		name.style.border = "solid red";
		return false;
	}
}


const mailValidator = () => {
	let mailValue = mail.value;

	const isValid = (email) => {
	  return /[^@]+@[^@.]+\.[a-z]+/.test(email);
	}
	
		if(isValid(mailValue)) {
			mail.style.border = "solid white";
			return true;			
		}
	
	mail.style.border = 'solid red';
}

document.addEventListener('input', function (event) {
	
	if (event.target.id !== 'mail') return;
	if(!mailValidator()){
	  
	  console.log('Please enter a valid email.');
	  
	}

});


// User must select at least one checkbox under the "Register for Activities" section of the form.
const activitiesValidator = () => {
	for(let i=0 ; i < activitiesCheckboxes.length ; i++){
		if(activitiesCheckboxes[i].checked){
			acitivitiesDiv.style.border = "none";
			return true;
		}		
	}
		acitivitiesDiv.style.border = "solid red";
		return false;
	}


const cardNumber = document.querySelector('#cc-num');


// If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
const creditcardValidator = () => {

	// Credit Card field should only accept a number between 13 and 16 digits.
	const isValid = (creditcardnumber) => {
	  return /^(?=(?:.{13,16})$)[0-9]*$/.test(creditcardnumber);
	}
	if(paymentSelection[1].selected){
		if(cardNumber.value && isValid(cardNumber.value)) {
			ccDiv.style.border = "none";
			return true;			
		}
	}
	ccDiv.style.border = 'solid red';
}

// The Zip Code field should accept a 5-digit number.
const zipCode = document.querySelector('#zip');

const zipcodeValidator = () =>{

	const isValid = (zipcodenumber) =>{
		return /^[0-9]{5}$/.test(zipcodenumber)
	}

	if(zipCode.value && isValid(zipCode.value)){
		ccDiv.style.border = "none";
		return true;
	}

	ccDiv.style.border = 'solid red';

}



// The CVV should only accept a number that is exactly 3 digits long.
const cvv = document.querySelector('#cvv');

const cvvValidator = () =>{
	const isValid = (cvvNumber) =>{
		return /^[0-9]{3}$/.test(cvvNumber)
	}

	if(cvv.value && isValid(cvv.value)){
		ccDiv.style.border = "none";
		return true;
	}

	ccDiv.style.border = 'solid red';

}


//error message if any field is not correctly validated
const errorHTML = document.createElement('p');
errorHTML.innerHTML = "Please enter the correct information.";
errorHTML.style.color = "red"; 
const submitButton = document.querySelector('button');
submitButton.form.insertBefore(errorHTML, submitButton.nextSibling); 

const hideError = () =>{
	errorHTML.style.display = "none";

}

const showError = () =>{
	errorHTML.style.display = "block";

}

hideError();



// If any of the following validation errors exist, prevent the user from submitting the form:
form.addEventListener('submit', (e) => {
	nameValidator();
	mailValidator();
	activitiesValidator();
	creditcardValidator();
	zipcodeValidator();
	cvvValidator();

	if(!nameValidator()){
	  e.preventDefault();
	  console.log('Name field cannot be empty.');
	  showError();
	}

	if(!mailValidator()){
	  e.preventDefault();
	  console.log('Please enter a valid email.');
	  showError();
	}

	if(!activitiesValidator()){
	  e.preventDefault();
	  console.log('Please select activities.');
	  showError();
	}

	if(paymentSelection[1].selected){

		if(!creditcardValidator()){
		  e.preventDefault();
		  errorHTML.innerHTML = 'Please enter the correct information. Please enter the correct credit card number.';
		  showError();
		  return;
		}else{
			errorHTML.innerHTML = 'Please enter the correct information.';
		}

		if(!zipcodeValidator()){
		  e.preventDefault();
		  errorHTML.innerHTML = 'Please enter the correct information. Please enter the correct credit card number.';
		  showError();
		  return;
		}

		if(!cvvValidator()){
		  e.preventDefault();
		  errorHTML.innerHTML = 'Please enter the correct information. Please enter the correct credit card number.';
		  showError();
		  return;
		}
		ccDiv.style.border = 'none';
	}

});







