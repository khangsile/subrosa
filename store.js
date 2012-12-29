var clickHandler = function(e) {
  
    //add the word and definition to the database with timestamp
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
		$test = $xml.find('def');

		alert($test.text());
		//for (var i=0, definition; definition = definitions[i]; i++) {
		//    alert(definition.getAttribute("id"));
		//}
	    }
	}

	req.send();

}


chrome.contextMenus.create({
	"title": "Store word",
	"contexts": ["selection"],
	"onclick" : clickHandler
 });