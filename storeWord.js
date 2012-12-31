function lookUpQuery(query, callback) {
  
    //add the word and definition to the database
    var API_KEY = "721c7f71-22ff-48d9-80fa-2489ea2a009c";
    var word = query.toLowerCase();
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
	    
	    try {
	      $test.find('vi').remove();
	      $test.find('sx').remove();
	    } catch (err) {
		console.log(err.message);
	    }
	    var defs = $test.text().split(":");
	    var def = defs[0];

	    for(var i=0; def.trim() == '' && i < defs.length; i++) {
		def = defs[i];
	    }

	    callback(def);
	    
	}
  }

req.send();

}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        if (request.method == "lookup") {
	    lookUpQuery(request.arg, function(def) {
		    sendResponse({definition: def});
		    });
        }
});


var clickHandler = function(e) {
    alert(e.menuItemId);
    lookUpQuery(e.selectionText, function(def) {
	    if (def.trim() == '')
		def = "Invalid input. Your argument is invalid.";
	    alert(def);
	});
}

var parentCM = chrome.contextMenus.create({
	"title": "Store word",
	"contexts": ["selection"]
});

var childCM = chrome.contextMenus.create({
	"title": "Default",
	"parentId": parentCM,
	"onclick": clickHandler,
	"contexts": ["selection"]
});           