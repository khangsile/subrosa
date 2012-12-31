window.addEventListener('dblclick', handleClick, false);

function handleClick(e) {
    var query = window.getSelection().toString().trim();
 
    chrome.extension.sendRequest({method: "lookup", arg: query}, function(response) {
	    alert(response.definition);
	});

}
