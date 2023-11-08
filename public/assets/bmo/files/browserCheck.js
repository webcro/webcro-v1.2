
/* JavaScript content from lib/browserCheck.js in folder common */
(function() {
var browserCheckError = document.getElementById('browserCheckError');

// Since WL may not be available at this time, we are doing a manual check for the mobilewebapp
if (WL.StaticAppProps.ENVIRONMENT === 'mobilewebapp') {

  var ERRORS = {
    COOKIES: {
      title: {
        EN: "Give cookies a chance.",
        FR: "Donnez une chance aux témoins."
      },
      message: {
        EN: "Cookies help us create great experiences. <br /> <br /> Please enable them in your browser settings to access BMO Mobile Banking.",
        FR: "Ces témoins nous permettent de vous offrir une expérience exceptionnelle. <br /> <br /> Pour accéder aux Services mobiles, veuillez modifier les paramètres du navigateur et autorisant les cookies."
      }
    },

    PRIVATE_BROWSING: {
      title: {
        EN: "You’re in a private browser.",
        FR: "Vous utilisez le navigateur en mode confidentiel."
      },
      message: {
        EN: "To access our site, you’ll need to change your settings or use another browser.",
        FR: "Pour accéder à notre site, vous devez modifier vos paramètres ou utiliser un autre navigateur."
      }
    },

    LOCAL_STORAGE: {
      title: {
        EN: "Check out your settings!",
        FR: "Vérifiez vos paramètres!"
      },
      message: {
        EN: "Your browser encryption level isn't supported. You'll need to check your settings or open our site in a different browser.",
        FR: "Le navigateur utilisé ne permet pas l'accès à l'appli. Modifiez les paramètres ou utilisez un autre navigateur."
      }
    }
  }

  /**
   * Check if cookies are enabled
   * @returns {boolean} true if cookies are enabled, false otherwise
   */
  function isCookiesEnabled() {

    var isEnabled = navigator.cookieEnabled ? true : false;

    if (isEnabled) {
      document.cookie = "testcookie";
      isEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }

    return isEnabled;
  }

  /**
   * Check if private browsing mode
   * @returns {boolean} true if private browsing, false otherwise
   */
  function isPrivateBrowsingMode() {

    try {
      var storage = window.localStorage;
      var testKey = 'test';
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
    } catch (error) {
      if (error.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
          return true;
      }
    }

    return false;
  }

  /**
   * Check if local storage is supported
   * @returns {boolean} true if local storage supported, false otherwise
   */
  function isLocalStorageSupported() {

    try {

      var storage = window.localStorage;
      //Need to test if in iOS private browsing
      var testKey = 'test';
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
    } catch (error) {
        return false;
    }

    return true;
  }

  /**
   * Set error message content
   * @param {any} el element
   * @param {any} content content
   */
  function setContent(el, content) {
    var titleEN = el.querySelector('#titleEN');
    var messageEN = el.querySelector('#messageEN');
    var titleFR = el.querySelector('#titleFR');
    var messageFR = el.querySelector('#messageFR');

    titleEN.innerHTML = content.title.EN;
    messageEN.innerHTML = content.message.EN;
    titleFR.innerHTML = content.title.FR;
    messageFR.innerHTML = content.message.FR;
  }

  var errorContent;

  if (!isCookiesEnabled()) {
    errorContent = ERRORS.COOKIES;
  } else if (isPrivateBrowsingMode()) {
    errorContent = ERRORS.PRIVATE_BROWSING
  } else if (!isLocalStorageSupported()) {
    errorContent = ERRORS.LOCAL_STORAGE;
  }

  if (errorContent) {

    if (browserCheckError) {
      browserCheckError.style.display = "";
      setContent(browserCheckError, errorContent);

      var body = document.body;

      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }

      body.appendChild(browserCheckError);
    }

    return;
  }
}

if (browserCheckError) {
  browserCheckError.parentNode.removeChild(browserCheckError);
}

})();