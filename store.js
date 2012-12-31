window.addEventListener('dblclick', handleClick, false);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getSelection")
	    sendResponse({data: window.getSelection().toString()});
	else
	    sendResponse({}); // snub them.
    });

function handleClick(e) {
    var query = window.getSelection().toString().trim();
    if (query != "") {
      alert(query);
    }
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
		var report = $test.text();
		
		if (report == "") {
		    report = "Your argument is invalid.";
		}

		alert(report);
		addWordToBank(e.selectionText, "myGroup", report);
	    }
	}

	req.send();

}
