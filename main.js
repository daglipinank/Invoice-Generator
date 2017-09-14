'use strict';
$(document).ready(function (){
	init();
	$('')
	$('form').on('submit', function(e) {
	    e.preventDefault();
	    var $inputs = $('#InvoiceForm :input');
	    var values = {};
	    $inputs.each(function() {
	    	values[this.name] = $(this).val();
	    });
	    formSubmit(values);
	});
});

var cgstAmt, sgstAmt, igstAmt;

function init() {
	cgstAmt = 0;
	sgstAmt = 0;
	igstAmt = 0;
	$('#InvoiceForm').show();
	$('#Company').on('select', function(e) {

	});
	adjustTabSize();	
	$(window).resize(function() {
		adjustTabSize();	
	});
	populateList(ListOfCompanies, $('#CompanyList'));
	populateList(ListOfProducts, $('#ProductList'));
}

function formSubmit(formValues) {
	$('#dueDate').text(calcDueDate());
	var taxableAmount = getTaxableTotal();
	if(cgst) {
		cgstAmt = getCgstAmount(taxableAmount);
	}
	if(sgst) {
		sgstAmt = getSgstAmount(taxableAmount);
	}
	if(igst) {
		igstAmt = getIgstAmount(taxableAmount);
	}
	$('#grossAmount').text(getGrossAmt(taxableAmount));
}

function populateList(obj, element) {
	$.each(obj, function(key, value) {  
		element
		.append($("<option></option>")
			.val(key)
			.html(value.name)); 
	});
	return element;
}

function adjustTabSize() {
	$('#InvoiceDetailsTab2').height($('#InvoiceDetailsTab1').height());
	$('#InvoiceDetailsTab4').height($('#InvoiceDetailsTab3').height());
	$('#TCSection1').height($('#TCSection2').height());
	return true;
}

function calcDueDate() {
	return new Date();
}

var cgst = 9;
var sgst = 9;
var igst = 9;

function getTaxableTotal() {
	return $('#amount1').text();
}

function getCgstAmount(total) {
	return total * cgst / 100;
}

function getSgstAmount(total) {
	return total * cgst / 100;
}

function getIgstAmount(total) {
	return total * cgst / 100;
}

function getGrossAmt(total) {
	return total + cgstAmt + sgstAmt + igstAmt;
}

var ListOfProducts = {
	"JETEX": {
		"name" : "JETEX",
		"code" : "29151290",
		"rateRangeMin" : "20",
		"rateRangeMax" : "30",
		"unit" : "KG"
	},
	"PINEX - WSR": {
		"name" : "PINEX - WSR",
		"code" : "",
		"rateRangeMin" : "80",
		"rateRangeMax" : "125"
	}
}

var ListOfCompanies = {
	"JaiAmbe": {
		"name" : "Jai Ambe Maa Processors",
		"addressLine1": "Shelar",
		"addressLine2": "",
		"addressLine3": "",
		"city": "Bhiwandi",
		"state": "Maharashtra - 27",
		"gstn": "27AAHFJ4145N1ZZ"
	},
	"Kailash": {
		"name" : "Shree Kailash Processors",
		"addressLine1": "Kamatghar",
		"addressLine2": "Narpoli",
		"addressLine3": "",
		"city": "Bhiwandi",
		"state": "Maharashtra - 27",
		"gstn": "27ABLFS9890C1ZL"
	},
	"Balaji": {
		"name" : "Balaji Polyester Pvt. Ltd.",
		"addressLine1": "Kamatghar",
		"addressLine2": "Narpoli",
		"addressLine3": "",
		"city": "Bhiwandi",
		"state": "Maharashtra - 27",
		"gstn": "27AACCB72421ZX"
	},
	"Devish": {
		"name" : "Devish Chemicals",
		"addressLine1": "D/5, Parshwanath Apartment",
		"addressLine2": "Desai and Sheth Nagar",
		"addressLine3": "Sai Baba Mandir Road",
		"city": "Borivali West",
		"state": "Maharashtra - 27",
		"gstn": "27AAAPR5206R1Z9"
	},
	"Shreehari": {
		"name" : "Shreehari Fabrics Pvt. Ltd.",
		"addressLine1": "Umroli - Palghar Road",
		"addressLine2": "Palghar",
		"addressLine3": "",
		"city": "Thane",
		"state": "Maharashtra - 27",
		"gstn": "27AAACS5334G1ZH"
	},
	"Khatore": {
		"name" : "Khatore Fiber and Fabrics",
		"addressLine1": "M.I.D.C. Saravali",
		"addressLine2": "Kalyan Bhiwandi Road",
		"addressLine3": "",
		"city": "Kalyan",
		"state": "Maharashtra - 27",
		"gstn": "27AABCK2793A1ZR"
	},
	"Avni": {
		"name" : "Avni Textile Mills",
		"addressLine1": "M.I.D.C. Saravali",
		"addressLine2": "Kalyan Bhiwandi Road",
		"addressLine3": "",
		"city": "Bhiwandi",
		"state": "Maharashtra - 27",
		"gstn": "27AALFA0857C1ZO"
	}
}