$( document ).ready(function() {
        $( '#searchsub' ).click(function() {
                getQuery();
            });
        $(function() {
                $('#query').keypress(function (e) {
                        if (e.which==13 || e.keyCode==13) {
                            getQuery();
                        }
                    });
            });
    });

function getQuery() {
    q = $( '#query' ).val();
    $( '#query' ).val('');
    lookup(q);
}

function lookup(query) {
    chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, {requester: "popup", 
			myquery: query}, 
			function(response) {
			    console.log(reponse.farewell);
			});
        });
}