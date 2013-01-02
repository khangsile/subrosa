getGroups(renderGroups);
function pageSetup() {
    $(document).ready(function() {
	var toggleSpeed = 400;
	$("#expand").click(function() {
		$(".wordlist").slideDown(toggleSpeed);
		$("#expand").hide();
		$("#collapse").show();
	    });
	$("#collapse").click(function() {
		$(".wordlist").slideUp(toggleSpeed);
		$("#collapse").hide();
		$("#expand").show();
	    });
	$("#expand").hide();

	$("button#addgroup-button").click(function() {
		var groupName = document.getElementById("addgroup-text").value.trim();
		if(groupName != "") {
		    addGroup(groupName, null, null);
		    getGroups(renderGroups);
		}
		document.getElementById("addgroup-text").value = "";
	    });

	$(".removeGroup").click(function(e) {
		var remove = confirm('Do you want to remove?');
		if(remove) {
		    var groupid = $(this).attr('href');
		    groupid = groupid.substr(2, groupid.length);
		    removeGroup(groupid, null);
		    getGroups(renderGroups);
		}
	    });

        $(".group").click(function() {
                $(this).next(".wordlist").slideToggle(toggleSpeed);
            });

	$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('#mask, .window').hide();
	    });     
     
	//if mask is clicked
	$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
	    });  
    });
}

function setupWords() {
    	$('a[name=modal]').click(function(e) {
		e.preventDefault();
		var wordbox = $(this).attr('href');
		var wordid = $(this).attr('id').substr(1, $(this).attr('id').length);
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		
		$('#mask').css({'width':maskWidth, 'height':maskHeight});
		$('#mask').fadeIn(500);
		$('#mask').fadeTo('slow', 0.8);

		var winH = $(window).height();
		var winW = $(window).width();
		console.log(wordid);
		getWord(wordid, renderWordPopup);
		
		$(wordbox).css('top', winH/2 - $(wordbox).height()/2);
		$(wordbox).css('left', winW/2 - $(wordbox).width()/2);

		$(wordbox).fadeIn(1000);
	    });
}