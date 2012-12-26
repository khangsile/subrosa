var clickHandler = function(e) {
  
  if (e.selectionText) {
    //add the word and definition to the database with timestamp
      var req = new XMLHttpRequest();
      req.open(
	  "GET",
	  "http://www.stands4.com/services/v2/defs.php?" +
	  "uid=1001&" +
	  "tokenid=tk324324&" +
	  "word=" + e.selectionText,
	   true);
  } else {
    //popup - "Incorrect input. Your argument is invalid."
  }

};

chrome.contextMenus.create({
	"title": "Store word",
	"contexts": ["selection"],
	"onclick" : clickHandler
 });