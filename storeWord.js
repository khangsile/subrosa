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
	    var resp = req.responseText;
	    callback(resp);
	    
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
	if (request.method == "createCMs") {
	    setTimeout(function() {
		    chrome.contextMenus.removeAll();
		    createContextMenus();
		}, 100);
	}
	if (request.method == "store") {
	    addWord(request.arg, request.def, request.id);
	}
});

var clickHandler = function(e) {
    chrome.tabs.getSelected(null, function(tab) {
	    chrome.tabs.sendMessage(tab.id, {id: e.menuItemId}, function(response) {
		    console.log(reponse.farewell);
		});
	});
    

    /* lookUpQuery(e.selectionText, function(definitions) {
	    var defs = definitions.split(':');
	    var defNum = 1;
	    var text = '';
	    for(var i=0; i<defs.length;i++) {
		defs[i] = defs[i].trim();
		if (defs[i] != '') {
		    text = text + defNum + '. ' + defs[i] + '. ';
		    defNum = defNum + 1;
		}
	    }

	    if (text.trim() != '') {
		addWord(e.selectionText, text, e.menuItemId);
	    }
	    }); */
} 

function createContextMenus() {

    var parentCM = chrome.contextMenus.create({
	    "title": "Store word",
	    "contexts": ["selection"]
	});

    getGroups(function(tx, results) {
	    for(var i=0; i < results.rows.length; i++) {
		var row = results.rows.item(i);
		
		var child = chrome.contextMenus.create({
			"title": row.name,
			"id": row.id + '',
			"parentId": parentCM,
			"onclick": clickHandler,
			"contexts": ["selection"]
		    });

	    }
    });

}

createContextMenus();
         
