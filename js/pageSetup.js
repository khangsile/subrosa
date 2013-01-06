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

	$('.remove-group').click(function(e) {
		var remove = confirm('Do you want to remove?');
		if(remove) {
		    var groupid = $(this).parent().attr('id');
		    groupid = groupid.substr(1, groupid.length);
		    removeGroup(groupid, null);
		    $(this).parent().parent().remove();
		}
	    });

        $('.group-title').click(function() {
                $(this).parent().next(".wordlist").slideToggle(toggleSpeed);
            });

	$('.wordlist').hide();

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

	$('#wordbox a').click(function () {
		var wordid = $(this).parent().find('.term').attr('name');
		wordid = wordid.substr(1, wordid.length);
		console.log(wordid);

		var winH = $(window).height();
		var winW = $(window).width();

		getWord(wordid, renderWordEdit);
		
		$('#editbox').css('top', winH/2 - $(wordbox).height()/2);
		$('#editbox').css('left', winW/2 - $(wordbox).width()/2);

		$('#wordbox').hide();
		$('#editbox').show();
		
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
		var fadeSpeed = 500;
		
		$('#mask').css({'width':maskWidth, 'height':maskHeight});
		$('#mask').fadeIn(fadeSpeed);
		$('#mask').fadeTo('slow', 0.8);

		var winH = $(window).height();
		var winW = $(window).width();

		getWord(wordid, renderWordPopup);
		
		$(wordbox).css('top', winH/2 - $(wordbox).height()/2);
		$(wordbox).css('left', winW/2 - $(wordbox).width()/2);

		//		$(wordbox).fadeIn(fadeSpeed);
		$(wordbox).show();
	    });
}