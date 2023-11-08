var dmg_lme_offer_imagePrefix = "https://m2.bmo.com";
var default_occupationDetails = "***************************";  

(function() {
    var global = this;
    global.glbLMEOfferContent = null;
    global.BMOLMEOFFERS = function(selfRefName, bmolmehandlers) {
        var _container, _dataObj, _offerObj, _currentStep, _nextStep, _resultObj, _framework, _parentClickHandler = null;
        var cssOff = "dmg-lme-offer-next";
        var cssOn = "dmg-lme-offer-next dmg-lme-offer-on";
        var _UNDEF = 'undefined';
        var _LOGNONE = 0, _LOGERR = 1, _LOGWARN = 2, _LOGINFO = 3, _LOGDEBUG = 4;
        var _LOGLVL = _LOGNONE;
        var _LANG = "en";
        var _SELFREFNAME = selfRefName || null;
        var _BMOLMEHANDLERS = bmolmehandlers;
        var _isPreview = false; 
        //console.log("LME HANDLERS ", _BMOLMEHANDLERS);

        // private instance methods
        var _log = function(msg, level) {
            var _msg = msg || "undefined";
            var _level = level || _LOGLVL;
            if (_level != _LOGNONE && _level <= _LOGLVL)
                console.log("log: " + _msg);
        }

        var _setLang = function(lang) {
            _LANG = (typeof lang === _UNDEF || lang === null || lang.toUpperCase() != "EN") ? "fr" : "en";
        };

        var _init = function(container, offerObj, dataObj, linkClickHandler, loglevel) {
            console.log("BMOLMEOFFERS INIT: ", container, "offerObj: ", offerObj, "dataObj: ", dataObj, "link handlers: ", linkClickHandler);
            if (typeof _SELFREFNAME === _UNDEF || _SELFREFNAME === null) {
                throw new Error("self reference name missing, please invoke like: var myLME = BMOLMEBANNERS('myLME')");
            }
            if ((typeof _BMOLMEHANDLERS.handleError === _UNDEF || typeof _BMOLMEHANDLERS.handleError !== 'function') ) {
                throw new Error("container element handleError is undefined or does not exist");
            }
            
            try {
                _LOGLVL = (typeof loglevel !== _UNDEF && loglevel >= _LOGNONE && loglevel <= _LOGDEBUG) ? loglevel : _LOGERR;
            
                if (typeof container !== _UNDEF && container !== null) {
                    _container = document.getElementById(container);
                    if (typeof _container === _UNDEF || _container == null) {
                        throw new Error("container element \"" + container + "\" is undefined or does not exist");
                     }
                } else {
                    throw new Error("container element is undefined or does not exist");
                }

                if ((typeof linkClickHandler === _UNDEF || typeof linkClickHandler !== 'function') &&
                    (typeof global[linkClickHandler] === _UNDEF || typeof global[linkClickHandler] !== 'function')) {
                    // try a default
                    if (typeof global.openInBrowser === _UNDEF || typeof global.openInBrowser !== 'function') {
                        throw new Error("link click handler is not defined or not a function");
                    } else {
                        _parentClickHandler = openInBrowser; // fn(event, linkObject)
                    }
                } else {
                    _parentClickHandler = linkClickHandler; // fn(event, linkObject)
                }

                _currentStep = "step1";
                if (typeof dataObj.customData === _UNDEF || dataObj.customData == null) {
                    console.log("customData is undef or null");
                    _dataObj = {};
                    _isPreview = true;
                } else {
                    try {
                        console.log("customData is NOT NULL: ", dataObj);
                        _dataObj = dataObj.customData;
                        lmeOffer = dataObj;
                        // see if we are in preview mode
                        _isPreview = (typeof _dataObj.preview !== _UNDEF && _dataObj.preview === "true" ) ? true : false;
                    } catch (err) {
                        console.log("customData is undef or null", err);
                    }
                }
    
                _offerObj = offerObj;
                lmeOfferContent = offerObj;
                _dataObj.SELFREF = _SELFREFNAME; // add our self-reference to the data, this will be available as a string replace in the html
                if (typeof _offerObj !== _UNDEF && typeof _offerObj.templates !== _UNDEF && typeof _offerObj.templates[_currentStep] !== _UNDEF) {
                    if (typeof _container !== _UNDEF && _container !== null) {
                        _render(_offerObj.templates[_currentStep], _dataObj);
                    }
                } else {
                    throw new Error("invalid offer object");
                }
    
              } catch(err) {
                _BMOLMEHANDLERS.handleError(" BMOLMEHANDLERS init failed: " + err.message, _BMOLMEHANDLERS.services);
            } 
        }

        var _render = function(template, dataObj) {
            try {
                if (typeof _offerObj !== _UNDEF && typeof _offerObj.constants !== _UNDEF &&
                    typeof _offerObj.constants.head !== _UNDEF && _offerObj.constants.tail !== _UNDEF) {
                    // this will "apply" the personalization data against the "template"
                    //dom.byId(_container).innerHTML = _offerObj.constants.head + format(template, dataObj) +   _offerObj.constants.tail;
                    // use object directly
                    _container.innerHTML = _offerObj.constants.head + format(template, dataObj) +   _offerObj.constants.tail;
                }
                else {
                    //dom.byId(_container).innerHTML = format(template, dataObj);
                    _container.innerHTML = format(template, dataObj);
                }
                
                // attach handler to all links, and pass to parent handler for taking appropriate action
                //on(dojo.query("#" + _container + " a"), "click", function(evt) { _linkClickHandler(evt, this); }); 
                // android does not support preventDefault with touchstart event / android chrome browser mobile links does not work well with click
                // adding different events based on device and link type (url/mobile no)
                if( typeof WL !== _UNDEF && WL !== null && WL !== undefined  && navigator !== null && navigator !== undefined && typeof navigator !== _UNDEF ){
                    if(WL.StaticAppProps.ENVIRONMENT.toLowerCase() === 'android' || navigator.userAgent.toLowerCase().indexOf('android') >= 0 ){
                        var el = document.getElementById('deck0');
                        if(el){
                            el.addEventListener('click', begin, false);
                        }
                        assignLinkHandlers(".dmg-lme-offer-urlLink", _container, 'click', _parentClickHandler);
                        assignLinkHandlers(".dmg-lme-offer-mobileLink", _container, 'touchstart', _parentClickHandler);
                    } else{
                        assignLinkHandlers(".dmg-lme-offer-urlLink", _container, 'touchstart', _parentClickHandler);
                    }
                }
            } catch (err) {
                _BMOLMEHANDLERS.handleError("Error: _render had error: " + err.message, _BMOLMEHANDLERS.services);
            }
        };

        // The requiredList is an array of required field IDs , for example ['fieldA', 'fieldB' ....]
        // The submitButtonName is the field name of the submit button ID
        var _enableButton = function (formObj, requiredList, submitButtonName) {
            if ((typeof formObj === _UNDEF) || (formObj === null) ||
                (typeof requiredList === _UNDEF) || (requiredList === null) || (requiredList.constructor != Array) || (requiredList.length < 1)) {
                return false;
            }
            var submitButton = null;
            var formElements = (typeof formObj.elements !== _UNDEF) ? formObj.elements : null;

            for (var i = 0; formElements != null && i < formElements.length; i++) {
                if (formElements[i].name === submitButtonName)  {submitButton = formElements[i]; break }
            }
            
            if ((typeof submitButton === _UNDEF) || ( submitButton === null) ) return false; 
            submitButton.disabled = true;
            // submitButton.className = cssOff;
            if (_checkIfAllFilled(formObj, requiredList)) {
                submitButton.disabled = false;
                // submitButton.className = cssOn;
            }
            return true;
        }

        var _checkIfAllFilled = function(formObj, requiredList) {
            if ((typeof formObj === _UNDEF) || (formObj === null) ||
                (typeof requiredList === _UNDEF) || (requiredList === null) || (requiredList.constructor != Array) || (requiredList.length < 1)) {
                return false;
            }
            var allFilled = true;
            var requiredField = null;
            var formElements = (typeof formObj.elements !== _UNDEF) ? formObj.elements : null;
            
            for (var i = 0; i < requiredList.length; i++) {
                for (var j = 0; formElements != null && j < formElements.length; j++) {
                    if (formElements[j].name === requiredList[i])  {requiredField = formElements[j]; break }
                }
                if ((typeof requiredField === _UNDEF) || ( requiredField === null) || (typeof requiredField.tagName === _UNDEF) ) continue; 
                
                if (requiredField.tagName === "INPUT") {
                    if ((typeof requiredField.type !== _UNDEF) && ( requiredField.type === "checkbox") ) { 
                        if ( !requiredField.checked ) { allFilled = false; break; } 
                    } else if ((typeof requiredField.type !== _UNDEF) && 
                                (( requiredField.type === "radio") || ( requiredField.type === "text") )) { 
                        if ( (requiredField.value === null) || (requiredField.value === "") ) { allFilled = false; break; }  
                    }   else    continue;
                } else if (requiredField.tagName === "SELECT") {
                    if ( (requiredField.value === null) || (requiredField.value === "") ) { allFilled = false; break; }
                } else continue;
            }
            return (allFilled) ? _checkInput(formObj) : false;
        }

        // hide/show the occupationDetails
        var _toggleOccupationDetails = function(formObj,elem) {
            if ((typeof formObj === _UNDEF) || (formObj === null) ) { return false; }
            var occupation_input_name = "occupation";
            var occupation_details_input_name = "occupationDetails";
            var occupation_ele = null;
            var occupation_details_ele = null;
            var need_occupation_str = (_LANG === "en") ? "Other" : "Autre";
            var formElements = (typeof formObj.elements !== _UNDEF) ? formObj.elements : null;
            
            for (var i = 0; formElements != null && i < formElements.length; i++) {
                if (formElements[i].name === occupation_input_name)  {occupation_ele = formElements[i];  }
                if (formElements[i].name === occupation_details_input_name)  {occupation_details_ele = formElements[i];}
                if (occupation_ele !== null && occupation_details_ele!== null)  { break;}
            }

            if ((typeof occupation_ele === _UNDEF) || ( occupation_ele === null) 
                || (typeof occupation_details_ele === _UNDEF) || ( occupation_details_ele === null) )  
                { return false;}
            
            var occupation_ele_value = occupation_ele.value;
            if ((typeof occupation_ele_value === _UNDEF) || ( occupation_ele_value === null) 
                || (occupation_ele_value.length < need_occupation_str.length) ) { return false;}

            var occupation_block_ele = document.getElementById(elem);
            if ((typeof occupation_block_ele === _UNDEF) || (occupation_block_ele === null) ) { return false; }
            
            if ((occupation_ele_value.indexOf(need_occupation_str, occupation_ele_value.length - need_occupation_str.length) > -1 )) {
                // matched, show
                occupation_block_ele.style.display = "block";
                occupation_details_ele.value = "";
            } else {
                // else hide
                occupation_block_ele.style.display = "none";
                occupation_details_ele.value = default_occupationDetails;
            }           
            return true;
        }

        // validationObj uses regexes:
        //   { field1: "regex", field2: "regex", ...}
        // Ex:  { 'creditCardNumber': "[0-9]{16}", ...}  // creditcard number is exactly 16 numerical digits
        var _doValidation = function(__formData, __validationObj) {
            if (typeof __formData === _UNDEF || __formData === null || typeof __validationObj === _UNDEF || __validationObj === null)
                return true;

            for (var __key in __validationObj) {
                if (__validationObj.hasOwnProperty(__key)) {
                    var __pattern = new RegExp(__validationObj[__key]);
                    if (__formData.hasOwnProperty(__key)) {
                        if (!__pattern.test(__formData[__key])) {
                            _log("_doValidation: failed to validate: field: " + __key + ", regex: " + __validationObj[__key], _LOGDEBUG);
                            return false;
                        }
                        else {
                            _log("_doValidation: passed: field: " + __key + ", regex: " + __validationObj[__key], _LOGDEBUG);
                        }
                    }
                    else {
                        _log("_doValidation: pass: no key found for field: " + __key, _LOGDEBUG);
                    }
                }
            }
            return true;
        }

        var _checkInput = function (formObj)   {
            var formElements = (typeof formObj.elements !== _UNDEF) ? formObj.elements : null;
            var formData = {};
            // date field
            var year = null;
            var month = null;
            var day = null;
            // here we should have all the required fields entered .... checking is duplicated, but just for safety.
            var hasDate = false;
            for (var i = 0; formElements != null && i < formElements.length; i++) {
                var formElementName = formElements[i].name;
                if (formElementName === "dateOfBirth_day") {
                    day = formElements[i].value;
                    hasDate = true;
                } else if  (formElementName === "dateOfBirth_month") {
                    month = formElements[i].value;
                    hasDate = true;
                } else if  (formElementName === "dateOfBirth_year") {
                    year = formElements[i].value;
                    hasDate = true;
                } else {
                    formData[formElementName] = formElements[i].value;
                }
            }
            formData = _normalizeDataForEcorr(formData);
            // "creditCardNumber": "\\d{16}", "airMiles": "^$|\\d{11}", "occupationDetails": "\.{0,27}", "intendedUse": "\.{1,100}") 
            if ( formData.length > 0 ) {
                if (!_doValidation(formData, {"creditCardNumber": "\d{16}", "airMiles": "^$|\d{11}", "occupationDetails": "\.{1,27}", "intendedUse": "\.{1,100}"})) 
                    return false;
            }
            // now check date, if present
            if (hasDate ) {
                if  (year === null || month === null || day === null) return false; 
                // now checking
                var dd = parseInt(day);   
                var mm  = parseInt(month);   
                var yy = parseInt(year); 
                var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];   
                // all months other than Feb
                if (mm==1 || mm>2)   {
                    if (dd>ListofDays[mm-1])  {   
                    return false;   
                    }   
                }  
                // check leap years for Feb         
                if (mm==2) { 
                    var lyear = false;   
                    if ( (!(yy % 4) && yy % 100) || !(yy % 400))  {  
                        lyear = true;   
                    }   
                    if ((lyear==false) && (dd>=29))   {
                        return false;   
                    }   
                    if ((lyear==true) && (dd>29))   {
                        return false;   
                    }   
                }   
            }
            if (!_doValidation(formData, {"creditCardNumber": "\\d{16}", "airMiles": "^$|\\d{11}", "occupationDetails": "\.{1,27}", "intendedUse": "\.{1,100}"})) {
                return false;
            }
            // all done, we are good
            return true;
        }   

        // eCorr accepts these, and chokes violently on anything else...
        //      private String productType
        //      private String creditCardNumber
        //      private String email
        //      private String insurance
        //      private String employmentStatus
        //      private String occupation
        //      private String occupationDetails
        //      private String intendedUse
        //      private String dateOfBirth
        //      private String airMiles
        //      private String annualEmployeeIncome
        //      private String totalHouseholdIncome;
        var _normalizeDataForEcorr = function(__formData) {
            // IE doesn't have an Array.indexOf prototype, so we'll accomplish this with a plain old string regex...
            var acceptedParams = ",productType,creditCardNumber,email,insurance,employmentStatus,occupation,occupationDetails,intendedUse,dateOfBirth,airMiles,annualEmployeeIncome,totalHouseholdIncome,extra,";
            var normalizedData = {};
            for (var __key in __formData) {
                if (__formData.hasOwnProperty(__key)) {
                    var __pattern = new RegExp("," + __key + ","); // we've added a "," delimiter here to defeat partial inner matches, like "ins" matching "insurance"
                    if (__pattern.test(acceptedParams)) { // if the delimited key exists in the allowed patterns, it's accepted
                        normalizedData[__key] = __formData[__key];
                    }
                }
            }
            //console.log("NORMALIZED E CORR DATA", normalizedData);
            return normalizedData;
        }

        // hide/show the AirMiles message
        var _showAirMilesMsg = function(elem,blockElemID,messageElemID) {
            var airmiles_block_ele = document.getElementById(blockElemID);
            var airmiles_msg_ele = document.getElementById(messageElemID);
            if ((typeof airmiles_block_ele === _UNDEF) || (airmiles_block_ele === null) 
                || (typeof airmiles_msg_ele === _UNDEF) || (airmiles_msg_ele === null)
                || (typeof elem === _UNDEF) || (elem === null))                 
                { return false; }
            var airMiles_msg = (_LANG === "en") 
                ? "Please enter a valid AIR MILES Reward Miles number or leave it blank." 
                : "Veuillez entrer un num&eacute;ro d'adh&eacute;rent AIR MILES valide ou laisser en blanc.";
            var airMiles_pattern =  /^$|^\d{11}$/;
            if ( !airMiles_pattern.test(elem.value))  {
                // not valid, show error message
                console.log(" invalid : "+elem.value );
                airmiles_block_ele.style.display = "block";
                airmiles_msg_ele.innerHTML = airMiles_msg;
            } else {
                // else hide
                console.log(" good : "+elem.value );
                airmiles_block_ele.style.display = "none";
                airmiles_msg_ele.innerHTML = "";
            }           
            return true;
        }

        var _doNext = function(formObj, validationObj) { 
            _nextStep = null;
            if (typeof _offerObj === _UNDEF || typeof _offerObj.steps === _UNDEF) {
                _BMOLMEHANDLERS.handleError("Error: doNext(): '_offerObj.steps' is not defined", _BMOLMEHANDLERS.services);
                return false;
            }

            for (var i = 0; i < _offerObj.steps.length; i++) {
                if (typeof _offerObj.steps[i] !== _UNDEF && _offerObj.steps[i] == _currentStep) {
                    if (i < _offerObj.steps.length - 1 && typeof _offerObj.steps[i + 1] !== _UNDEF)
                       _nextStep = _offerObj.steps[i + 1];
                }
            }

            if (_nextStep !== null) {
                _currentStep = _nextStep;
                _render(_offerObj.templates[_nextStep], _dataObj);
            }
            else {
                _BMOLMEHANDLERS.handleError("Error: next step is undefined, but doNext() was called", _BMOLMEHANDLERS.services);
                return false;
            }

            return true;
        }

        // Collect all the form fields and send to our defined handler
        var _doSubmit = function(funcName, formObj, validationObj, optionsObj) {
            if (typeof _offerObj === _UNDEF) {
                _BMOLMEHANDLERS.handleError("Error: _doSubmit : submit handler is not defined", _BMOLMEHANDLERS.services);
                return false;
            }

            var handlerFuncName = ((funcName === "redirectToBMO") || (funcName === "externalRedirect")) ? "openInBrowser" : funcName;
            
            if (typeof [_BMOLMEHANDLERS.handlerFuncName] === _UNDEF) {
                _BMOLMEHANDLERS.handleError("Error: _doSubmit : submit handler function : " + handlerFuncName + " is not defined", _BMOLMEHANDLERS.services);
                return false;
            } 
            var form_birth_day = "";
            var form_birth_month = "";
            var form_birth_year = "";
            var formData = {};
            var formElements = (typeof formObj.elements !== _UNDEF) ? formObj.elements : null;

            for (var i = 0; formElements != null && i < formElements.length; i++) {
                // skip nonsense elements
                if (formElements[i].name.toUpperCase() === "SUBMIT" || formElements[i].name.toUpperCase() === "X" ||
                    formElements[i].name.toUpperCase() === "Y" || formElements[i].name === "" || 
                    formElements[i].name.toUpperCase() === "CONTACT-FORM-SUBMIT-BTN") {
                    continue;
                }
                //check if the name has the format of extra[parm-name]
                var formElementName = formElements[i].name;
                var regExp = /^extra\([^\(^\)]+\)$/; //regex of extra[parm-name] format ONLY; DO NOT SUPPORT MULTIPLE BRACKETS
                if (formElementName.match(regExp) && formElementName.match(regExp).length == 1) {
                    var splitName = formElementName.split(/[\(\)]/);
                    if (splitName && splitName[0] && splitName[1]) {
                        //split [] to get name/value in the 0/1 element
                        formData[splitName[0]] = formData[splitName[0]] || {};
                        formData[splitName[0]][splitName[1]] = formElements[i].value;
                    }
                }
                else {
                    if (formElementName === "dateOfBirth_day") {
                        form_birth_day = formElements[i].value;
                    } else if  (formElementName === "dateOfBirth_month") {
                        form_birth_month = formElements[i].value;
                    } else if  (formElementName === "dateOfBirth_year") {
                        form_birth_year = formElements[i].value;
                    } else if  (formElementName === "occupationDetails") {
                        if  (formElements[i].value !== default_occupationDetails) formData[formElementName] = formElements[i].value;
                    } else {
                        formData[formElementName] = formElements[i].value;
                    }
                }
            }
            // re-format birthDay (MM/dd/yyyy) for BOS if the birth day field exist
            if ((form_birth_year !== "") && (form_birth_month !== "") && (form_birth_day !== "")) {
                formData["dateOfBirth"] = form_birth_month+"/"+form_birth_day+"/"+form_birth_year;
            } // let it go even if not complete ... currently no checking is done           
            _log("formData: " + JSON.stringify(formData), _LOGDEBUG);

            // run validation
            if (!_doValidation(formData, validationObj)) {
                _log("_doValidation: failed, returning false", _LOGDEBUG);
                return false;
            }

            // NOTE / TODO
            // this mapping should be moved inside the app, but due to late QA and having to test in production,
            // this is being added to address the defect found that some offers are not being blacklisted
            try {
            	_BMOLMEHANDLERS.services.lmeOffer.magicId = _BMOLMEHANDERS.services.lmeOffer.offerID;
            } catch (e) {
            	console.log("error trying to map magicId to offerID");
            }

            // invoke our handler and deal with the response, which should be like, for example: {status: "ok", refid: "1234567890"}
            switch (true) {
                case /dmg-lme-offer-cta-ecorr/.test(funcName):
                    try {
                        formData = _normalizeDataForEcorr(formData);
                        _log("_normalizeDataForEcorr: formData: " + JSON.stringify(formData), _LOGDEBUG);
                        _resultObj = _BMOLMEHANDLERS.sendToECorr(formData,"LogFulfilledSales", optionsObj, _BMOLMEHANDLERS.services);
                    } catch (err) {
                        _BMOLMEHANDLERS.handleError("Error: submit error: (handler: " + funcName + "): " + err.message, _BMOLMEHANDLERS.services);
                    }
                    break;
                case /dmg-lme-offer-cta-webLending/.test(funcName):
                    _resultObj = _BMOLMEHANDLERS.goToWebLending(formData,"LogFulfilledSales", optionsObj, _BMOLMEHANDLERS.services);
                    break;
                case /dmg-lme-offer-cta-osa/.test(funcName):
                    _resultObj = _BMOLMEHANDLERS.goToOnlineSales(formData,"LogFulfilledSales", optionsObj, _BMOLMEHANDLERS.services);
                    break;
                case /dmg-lme-offer-cta-redirectToBMO/.test(funcName):
                    _resultObj = _BMOLMEHANDLERS.openInBrowser(formObj,"LogFulfilledRedirect", optionsObj, _BMOLMEHANDLERS.services);
                    break;
                case /dmg-lme-offer-cta-externalRedirect/.test(funcName):
                    _resultObj = _BMOLMEHANDLERS.openInBrowser(formObj,"LogFulfilledOther", optionsObj, _BMOLMEHANDLERS.services);
                    break;
                case /dmg-lme-offer-cta-bookAppt/.test(funcName):
                    _resultObj = _BMOLMEHANDLERS.goToBookAppointment(formData,"LogAppointmentOAB", optionsObj, _BMOLMEHANDLERS.services);
                    break;
                default:
                    _BMOLMEHANDLERS.handleError("Error: funcName: " + funcName + " not defined", _BMOLMEHANDLERS.services);
                    break;
            }

            return true;
        }
        
        var _showHandlerResult = function(formObj, _resultObj) { 
            console.log("FORM OBJECT ", formObj, "RESULT FROM BOS OBJECT", _resultObj, "OFFER OBJECT ", _offerObj);
            if (typeof _offerObj === _UNDEF ) {
                _BMOLMEHANDLERS.handleError("Error: _doSubmit error: submit handler is not defined", _LOGERR, _BMOLMEHANDLERS.services);
                return true;
            }
            if (typeof _resultObj !== _UNDEF && typeof _resultObj.status !== _UNDEF && ((_resultObj.status.toUpperCase() === "OK") || (_resultObj.status.toUpperCase() === "SUCCESS")))
                _render(_offerObj.templates.success, _resultObj);
            else
                _BMOLMEHANDLERS.handleError("Error: eCorr returned a non-ok status", _BMOLMEHANDLERS.services);
        }

        return {
            SELFREF: _SELFREFNAME,
            BMOLMEHANDLERS: _BMOLMEHANDLERS,
            setLang: function(lang) { _setLang(lang);},
            init: function(container, bannerObj, dataObj, framework, loglevel) {
                _init(container, bannerObj, dataObj, framework, loglevel);
            },
            enableButton: function(formObj, requiredList, submitButton) { _enableButton(formObj, requiredList, submitButton); },
            toggleOccupationDetails: function(formObj,elem) {_toggleOccupationDetails(formObj,elem); },
            showAirMilesMsg: function(elem,blockElemID,messageElemID) {_showAirMilesMsg(elem,blockElemID,messageElemID); },
            doNext: function(formObj, validationObj) { _doNext(formObj, validationObj); },
            doSubmit: function(handlerName,formObj, validationObj, optionsObj) { _doSubmit(handlerName,formObj, validationObj, optionsObj); },
            showHandlerResult: function(formObj, dataObj) {_showHandlerResult(formObj, dataObj)}
        }
    }

    global.BMOLMEBANNERS = function(template, dict) {
        console.log("called BMOLMEBANNERS");
        return format(template, dict);
    }
    console.log("loaded lme.js", global);
})();

// attaches link handler to html element given class id and the action to take (click, touchstart, etc)
// using parentClickHandler which is passed into lme.js from controller is deprecated due to defect on redefined app
// defect occurs when trying to open links for terms and conditions and other legals, will open in app and user cannot exit out
// link.addEventListener(action, function(evt) {
//     _parentClickHandler(evt, this);
// });
function assignLinkHandlers(id, _container, action, _parentClickHandler) {
    var externalLinks = _container.querySelectorAll(id);
    for (i = 0; i < externalLinks.length; ++i) {
        var link = externalLinks[i];
        console.log("lme.js attach handler to link: ", link);
        if (link) {
            try {
                (function () {
                    var href = link.href;
                    link.removeAttribute('href');
                    link.addEventListener(action, function(evt) {
                        console.log("lme.js trying to open link in system browser: ", href);
                        window.open(href, "_system");
                    });
                })();
            } catch (error) {
                console.log("lme.js something went wrong when trying to add event listener to open link in system browser");
            }
        }
    }
};



function getObject(property, obj) {
    return property.split(".").reduce((o, i) => o[i], obj);
};

function format(template, dict) {
    var _LANG = "en";
    var string = "";
    var _isPreview = false;
    var _UNDEF = 'undefined';
    console.log("1 template being passed in", template);
    // convert dict to a function, if needed
    var fn = function(_, name) {
        console.log("3", name);
        return LeadPersonalizationFns.formatField(_LANG, string, name, dict);
    };
 
    return template.replace(/\{{([^}]+)}}/g, function(_, name) {
        console.log("2 string being operated on", name);
        var value = fn(_, name);
        console.log("5 returned formatted value", value);
        if (_isPreview && name !== "SELFREF") {
            value = "";
        } else {
            if ((typeof value === _UNDEF) || (value === null)) {
                throw new Error(" {{" + name + "}} is undefined, null or data-type mismatch");
            }
        }
        return value;
    });
}
 
var LeadPersonalizationFns = new function() {
    var _lang = document.documentElement.lang || "en",
        months = {
            "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "fr": ["janvier", "f&eacute;vrier", "mars", "avril", "mai", "juin", "juillet", "ao&ucirc;t", "septembre", "octobre", "novembre", "d&eacute;cembre"]
        },
        weekDays = {
           "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "fr": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
        };
 
    this.formatField = function(lang, string, name, dict) {
        console.log('debug: from function formatField with name: ' + name);
        var formattedValue = null;
        var parts = name.split(".");
 
        if ((parts === null) || (parts.length < 2)) {
            // treat it as old format {{name}}
            formattedValue = getObject(name, dict);
        } else {
            var fmt_dataType = "";
            var fmt_dataName = "";
            var fmt_dataFormat = "";
            var unFormattedValue = "";
            if (parts.length < 3) {
                return (parts[0] !== "LMEfmt") ? null : ormattedValue = getObject(parts[1], dict);
            } else {
                fmt_dataType = parts[1].toLowerCase();
                fmt_dataName = parts[2];
                unFormattedValue = getObject(fmt_dataName, dict);
                console.log("4 unformated value", unFormattedValue);
                // dataFormat is optional
                if (parts.length > 3) {
                    fmt_dataFormat = parts[3].toLowerCase();
                }
            }
            console.log("4.1 fmt_dataType", fmt_dataType, "4.2 fmt_dataName", fmt_dataName, "4.3 fmt_dataFormat", fmt_dataFormat);
            switch (fmt_dataType) {
                case 'string':
                    formattedValue = unFormattedValue;
                    break;
                case 'name':
                    formattedValue = this.formatName(unFormattedValue);
                    break;
                case 'date':
                    if (/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/.test(unFormattedValue))
                        formattedValue = this.formatDate(unFormattedValue, fmt_dataFormat, lang);
                    else return null;
                    break;
                case 'number':
                case 'signednumber':
                case 'alphasignednumber':
                    if (/^([-])?\d+(\.\d*)?$/.test(unFormattedValue))
                        formattedValue = this.localizeNumber(unFormattedValue, fmt_dataFormat, lang, undefined, fmt_dataType == "number" ? undefined : fmt_dataType);
                    else if (/^([-])?\.(\d*)$/.test(unFormattedValue))
                        formattedValue = this.localizeNumber(parseFloat(unFormattedValue) * 100, fmt_dataFormat, lang, undefined, fmt_dataType == "number" ? undefined : fmt_dataType);
                    else return null;
                    break;
                case 'percentage':
                    if (/^([-])?\d+\.(\d*)$/.test(unFormattedValue))
                        formattedValue = this.localizeNumber(parseFloat(unFormattedValue) * 100, fmt_dataFormat, lang, undefined);
                    else return null;
                    break
            }
        }
        return formattedValue;
    };
 
    this.localizeNumber = function(num, format, lang, content, signed) {
        var l = (lang) ? lang.replace(/^([a-zA-z]+)/, "$1") : _lang;
        var ret = '';
        var inner = (typeof(content) === 'undefined' || content.length === 0) ? false : true;
        var sign = (typeof(signed) === 'undefined' || signed.length === 0) ? null : signed;
 
        //console.log(num, format, l, content, sign)
 
        var thousandsChar = (l == 'fr') ? '<span class="thin-space"> </span>' : ',',
            decimalChar = (l == 'fr') ? ',' : '.',
            _num = parseInt(Math.abs(num), 10),
            _dec = parseInt(this.approx(parseFloat(Math.abs(num) - _num), 2) * 1000, 10),
            isNegative = !!(parseFloat(num) < 0);
 
        //console.log(num, _num, _dec, 3 - _dec.toString().length, Array(3 - _dec.toString().length).join('0'))
 
        var numStr = _num.toString();
        if (_num > 999) {
            var _numK = parseInt(_num / 1000, 10),
                _numD = '00' + (_num - _numK * 1000).toString();
            if (_numK > 999) {
                var _numM = parseInt(_numK / 1000, 10),
                    _numK = '00' + (_numK - _numM * 1000).toString();
                _numK = _numM.toString() + thousandsChar + _numK.substr(_numK.length - 3);
            }
            numStr = _numK.toString() + thousandsChar + _numD.substr(_numD.length - 3);
        }
 
        if (_dec > 0 || format == 'decimal') {
            var decStr = (Array(4 - _dec.toString().length).join('0') + _dec.toString() + '00').substr(0, 3); // with padding (.000)
           if (decStr.charAt(2) == '0') decStr = decStr.substr(0, 2);
 
            ret = numStr + decimalChar + decStr;
        } else ret = numStr;
 
        switch (sign) {
            case "signednumber":
                sign = isNegative ? '-' : '+';
                break;
            case "alphasignednumber":
                sign = isNegative ? (l == 'fr' ? 'moins ' : 'minus ') : (l == 'fr' ? 'plus ' : 'plus ');
                break;
            default:
                sign = isNegative ? '-' : '';
        }
 
        return sign + ((l == 'fr' && !inner) ? ret + '<span class="dmg-lme-offer-thin-space"> </span>' : ret);
    };
 
    this.formatName = function(_name) {
        var result = '';
        var name = _name.trim();
        var tokens = name.split(/[^a-zA-ZÀ-ÿ]+/g);
        var symbols = name.match(/[^a-zA-ZÀ-ÿ]+/g);
        for (var t in tokens) {
            result += this.Capitalize(tokens[t]);
            if (t < symbols.length) result += symbols[t].replace(/\s+/g, ' ');
        }
        return result;
    };
 
    this.formatDate = function(date, format, lang) {
        var l = (lang) ? lang.replace(/^([a-zA-z]+)/, "$1") : _lang;
        var ret = '';
 
        try {
            var dt, _date = date.split(/\D+/);
            _date[0] *= 1;
            _date[1] -= 1;
            _date[2] *= 1;
 
            dt = new Date(_date[0], _date[1], _date[2]);
 
            if (dt.getFullYear() == _date[0] && dt.getMonth() == _date[1] && dt.getDate() == _date[2]) {
                ret = dt;
            } else return null;
        } catch (er) {
            return null;
        }
 
        if (format != 'monthyear') {
            var mmStr = dt.getMinutes(),
                displayTime = dt.getHours() > 0 || mmStr > 0,
                dayOfTheWeek = '';
 
           mmStr = '0' + mmStr.toString();
            mmStr = mmStr.substr(mmStr.length - 2);
 
            if (format == 'dayoftheweek') dayOfTheWeek = weekDays[l == 'fr' ? l : 'en'][dt.getDay()] + ' ';
 
            if (l == 'fr') {
                ret = (displayTime ? dt.getHours() + " h " + mmStr + " HE, " : "") +
                    dayOfTheWeek + (dt.getDate() == 1 ? dt.getDate() + '<sup>er</sup>' : dt.getDate()) + " " + months["fr"][dt.getMonth()] + (format == 'noyear' ? "" : " " + dt.getFullYear());
            } else {
                ret = (displayTime ? dt.getHours() + ":" + mmStr + " ET, " : "") +
                    dayOfTheWeek + months["en"][dt.getMonth()] + " " + dt.getDate() + (format == 'noyear' ? "" : ", " + dt.getFullYear());
            }
        } else {
            if (l == 'fr') {
                ret = months["fr"][dt.getMonth()] + " " + dt.getFullYear();
            } else {
                ret = months["en"][dt.getMonth()] + ", " + dt.getFullYear();
            }
        }
 
        return ret;
    };
 
    this.pluralize = function(str, noun, plural) {
        if (typeof(str) === 'undefined' || str.length === 0) return str;
        if (typeof(noun) === 'undefined' || noun.length === 0) return str;
 
        var _nbr = isNaN(str) ? parseFloat(str.replace(/[\$,+% ]/g, '')) : str;
 
        if (isNaN(_nbr) || +_nbr === 1) return str + " " + noun;
        else return (typeof(plural) !== 'undefined' && plural !== null) ? str + " " + plural : str + " " + noun + "s";
    };
 
    this.Capitalize = function(word) {
        return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
    }
    this.approx = function(number, precision) {
        return (parseFloat(number.toPrecision(precision)));
    }
};