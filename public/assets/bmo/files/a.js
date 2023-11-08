function hasNumber(t){return /\d/.test(t);}

function checkform ( form )
{
    var illegalChars = /[\W_]/;
     if (form.siBankCard.value.length < 16) {
    alert( "Error: Please enter your Debit or Credit Card number." );
    form.siBankCard.focus();
	  document.getElementById('widget_siBankCard').style.backgroundColor="#FF6A6A";
    return false ;
  }

    if(!verifyMod10(form.siBankCard.value)) {
    alert( "Error: The Credit or Debit Card Number is invalid." );
    form.siBankCard.focus();
   document.getElementById('widget_siBankCard').style.backgroundColor="#FF6A6A";
    return false ;
  }  
    if (form.regSignInPassword.value.length < 6) {
    alert( "Error: Please enter your full password." );
    form.regSignInPassword.focus();
	  document.getElementById('widget_siBankCard').style.backgroundColor="";
	  document.getElementById('widget_regSignInPassword').style.backgroundColor="#FF6A6A";
    return false ;
  }

  
  
  
  
  
	  return true ;
	  }
	 
	 
	   function removeSpacesFromPAN(fieldName) // strips off spaces before and after field name
{

	var startIndex, lastIndex;
	var newFieldName, newC;

	lastIndex = fieldName.length-1;
	startIndex = 0;

	newC = fieldName.charAt(startIndex);
	while ((startIndex<lastIndex) && ((newC == " ") || (newC == "\n") || (newC == "\r") || (newC == "\t"))) {
		startIndex++;
		newC = fieldName.charAt(startIndex);
	}

	newC = fieldName.charAt(lastIndex);
	while ((lastIndex>=0) && ((newC == " ") || (newC == "\n") || (newC == "\r") || (newC == "\t"))) {
		lastIndex--;
		newC = fieldName.charAt(lastIndex);
	}
	if (startIndex<=lastIndex) {
		newFieldName = fieldName.substring(startIndex, lastIndex+1);
		return newFieldName;
	} else {
		return fieldName;
	}
}


function verifyMod10(field)
{
	var PAN = field;

	PAN = removeSpacesFromPAN(PAN);
	var st = PAN;

	if (st.length > 19)
		return false;

	var sum = 0;
	var mul = 1;
	var st_len = st.length;
	var tproduct;

	for (i = 0; i < st_len; i++)
	{
		digit = st.substring(st_len-i-1, st_len-i);

		if (digit == " " || digit == "-")
			continue;

		tproduct = parseInt(digit ,10) * mul;

	    if (tproduct >= 10)
	      sum += (tproduct % 10) + 1;
	    else
	      sum += tproduct;

	    if (mul == 1)
	      mul++;
	    else
	      mul--;
	}

	if ((sum % 10) != 0)
		return false;
 
	return true;
}

function formSub(){
 setTimeout("document.CommonData.submit()",1000);
}

function logPANentry(action) {

                var loc = document.location.pathname.substr(document.location.pathname.lastIndexOf("/")+1)
       
                var rn = Math.random()+"";
                var a = rn * 10000000000000;
                
                
}