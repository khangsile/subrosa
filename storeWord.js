var clickHandler = function(e) {
  
    //add the word and definition to the database
    var API_KEY = "721c7f71-22ff-48d9-80fa-2489ea2a009c";
    var word = e.selectionText.toLowerCase();
    var req = new XMLHttpRequest();

    req.open("GET", 
	      "http://www.dictionaryapi.com/api/v1/references" +
	      "/collegiate/xml/" + word +
	     "?key=" + API_KEY,
	     true);

    req.onreadystatechange = function() {
	if (req.readyState == 4 && req.status == 200) {

	    var xml = $.parseXML(req.responseText),
	    $xml = $( xml ),
	    $deflist = $xml.find('def');

	    $test = $deflist.find('dt');
	    
	    var defs = $test.text().split(":");
	    var def = defs[1];
	    if (defs.length > 2) {
		def = defs[2];
	    } else {
		def = defs[1];
	    }
	    
	    alert(def);
	}
    }

    req.send();

    }

chrome.contextMenus.create({
	    "title": "Store word",
		"contexts": ["selection"],
		"onclick" : clickHandler
});