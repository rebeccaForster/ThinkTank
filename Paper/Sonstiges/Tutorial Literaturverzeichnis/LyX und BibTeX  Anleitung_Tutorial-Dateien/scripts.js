$(document).ready(function(){
	//Kommentarformular
	$("div#commentformblock").hide();
	$("input.buttonShowCommentForm").click(function() {
		$(this).next("div#commentformblock").toggle(500);
		if ($(this).val()=="Kommentar hinzufügen"){//via notepad++ auf pures UFT-8 gestellt
			$(this).attr("value","Formular ausblenden");
	   }else{
		   $(this).attr("value","Kommentar hinzufügen");
		}
	});
	
	var affectedFormElements = "form[name=commentIt-form] input[name=author], form[name=commentIt-form] textarea[name=content], form[name=commentIt-form] input[name=sp]";
	$(affectedFormElements).keyup(function() { // works immediately when user press button inside of the input
        $(this).change(); // simulate "change" event
    });
    $(affectedFormElements).change(checkFields);
	
	//einmal initial ausfÃ¼hren
	checkFields();
	
	$("form[name=commentIt-form] #commentIt-status").css({color:"red"});//TODO
	
	//E-Mail-Spam-Protection aus jquery.emailSpamProtection.1.0.js
	//$("body").emailSpamProtection("email");
		
});

function checkFields(){
	var fields = getInvalidMandatoryFieldNames();
	if (fields == ""){
		$("form[name=commentIt-form] #commentIt-status").html("");
		$("form[name=commentIt-form] input[type=submit]").removeAttr("disabled");
	} else {
		$("form[name=commentIt-form] #commentIt-status").html("Bitte beachten Sie folgende Pflichtfelder: "+fields);
		$("form[name=commentIt-form] input[type=submit]").attr("disabled", "disabled");
	}
}

function getInvalidMandatoryFieldNames(){
	var resultString = "";
	if ($.trim($('form[name=commentIt-form] input[name=author]').val()) == ""){
		resultString += "Name, ";
	}
	if ($.trim($('form[name=commentIt-form] textarea[name=content]').val()) == ""){
		resultString += "Nachricht, ";
	}
	if ($("form[name=commentIt-form] input[name=sp]:checked").attr('id') == "spd"){
		resultString += "Spamschutz, ";
	}
	if (resultString != ""){
		//letzten 2 zeichen ", " entfernen	
		resultString = resultString.substr(0, resultString.length-2);
	}
	return resultString;
}