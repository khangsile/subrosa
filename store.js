window.addEventListener('dblclick', handleClick, false);
window.addEventListener('contextmenu', updateCM, false);

$(document).ready(function() {

  popup = "<div id='overlay'>" + "<div class='def_content'>" +
    "</div></div> <div id='mask'></div>";

  $("body").append(popup);
    });

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
      popUpWord(request.id);
  });		

function handleClick() {
    popUpWord(-1);
}

function popUpWord(id) {
    var query = window.getSelection().toString().trim();
    if (query != '') {
	chrome.extension.sendRequest({method: "lookup", arg: query}, function(response) {
		var reqQuery = response.definition;
		showOverlay(reqQuery, function(word, definition) {
			    store(word, definition, id);  
			});
	    });	  
    }
}

function updateCM(e) {
    chrome.extension.sendRequest({method: "createCMs"}, function(response) {
	});
}

function showOverlay(query, callback) {
    var xml = $.parseXML(query),
	$xml = $( xml );
    $entry = $xml.find('entry').first();
    
    var tText = '';
	    
    $query = $entry.find('ew');
    var query = $query.text();
   
    $def = $entry.find('def');
    $def.find('vi').remove();
    $def.find('sx').remove();
    
    var definitions = '';
    var defs = '';
    $def.find('dt').each(function(index) {
	    defs = defs + '%a' + $(this).text();
	});
    
    defs = defs.replace(/:/g, '').split('%a');
    var definition = '';
    var savedDef = '';
    var defNum = 1;
    for(var i=0; i<defs.length; i++) {
	var def = defs[i].trim();
	if (defs[i] != '') {
	    definition = definition + '<p>'+defNum+'. '+ def + '</p>';
	    savedDef = savedDef + defNum+'. ' + def + '. ';
	    defNum++;
	}
    }
    
    if (def.trim() != '') {
	$sound = $entry.find('wav');
	tText = tText + '<p><b>' + query + '</b></p>';
	tText = tText + definition;
    }

    $('div.def_content').html(tText);
    el = document.getElementById("overlay");
    el.style.visibility=(el.style.visibility=="visible")?"hidden":"visible";

    $('#overlay').click(function() {
	    el = document.getElementById("overlay");
	    el.style.visibility="hidden";
	});

    callback(query, savedDef);
}

function store(query, definition, id) {
    if (id > 0) {
	chrome.extension.sendRequest({
		method: "store", arg: query, def: definition,
		    id: id}, function(response) {
	    });
    }   
}


