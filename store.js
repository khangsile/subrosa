window.addEventListener('dblclick', handleClick, false);
window.addEventListener('contextmenu', updateCM, false);

$(document).ready(function() {
  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.extension.getURL('css/frames.css');
  document.body.appendChild(link);

  popup = "<div id='overlay'>" + "<div class='def_content'>" + "Content you want the user to see" +
    "</div></div> <div id='mask'></div>";

  $("body").append(popup);
    });

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
      
      handleClick();
  });				   

function handleClick() {
    var query = window.getSelection().toString().trim();
    if (query != '') {
	chrome.extension.sendRequest({method: "lookup", arg: query}, function(response) {
		var def = response.definition;
		if (def!='')
		    showOverlay(def);
	    });	  
    }
}

function updateCM(e) {
    chrome.extension.sendRequest({method: "createCMs"}, function(response) {
	});
}

function showOverlay(definition) {
    $('div.def_content').html("<p>"+definition+"</p>");
    el = document.getElementById("overlay");
    el.style.visibility=(el.style.visibility=="visible")?"hidden":"visible";

    $('#overlay').click(function() {
	    el = document.getElementById("overlay");
	    el.style.visibility="hidden";
	});
}


