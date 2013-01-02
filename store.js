window.addEventListener('dblclick', handleClick, false);
window.addEventListener('contextmenu', updateCM, false);

text = "<a href='#dialog' name='modal'>Simple Modal Window</a>" +
    "<div id='boxes'>" +
    "<div id='dialog' class='window'>" +
    "<b>Testing Witch of Modal Window</b>" +
    "<a href='#' class='close'>Close it</a>" +
    "</div>" + "<div id='mask'></div>" +
    "</div>";

$("body").prepend(text);

//createModalWindow();

function handleClick(e) {
    var query = window.getSelection().toString().trim();
    
    if (query != '') {
	chrome.extension.sendRequest({method: "lookup", arg: query}, function(response) {
		var def = response.definition;
		    //Create the modal dialog box
			
	    });	  
    }
}

function updateCM(e) {
    chrome.extension.sendRequest({method: "createCMs"}, function(response) {
	});
}

function createModalWindow() {
    $('a[name=modal]').click(function(e) {
	    e.preventDefault();

	    var id = $(this).attr('href');
	    
	    var maskHeight = $(document).height();
	    var maskWidth = $(window).width();

	    $('#mask').css({'width':maskWidth, 'height':maskHeight});

	    $('#mask').fadeIn(100);
	    $('#mask').fadeTo("slow", 0.8);

	    var winH = $(window).height();
	    var winW = $(window).width();

	    $(id).css('top', winH/2-$(id).height()/2);
	    $(id).css('left', winW/2-$(id).width()/2);

	    $(id).fadeIn(2000);
	});


}
