getGroups(renderGroups);
function pageSetup() {
    $(document).ready(function() {
	var toggleSpeed = 300;
	/*
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

	*/
	//	$('#wordbank').show();

	$("button#addgroup-button").click(function() {
		var groupName = document.getElementById("addgroup-text").value.trim();
		if(groupName != "") {
		    addGroup(groupName, null, null);
		    getGroups(renderGroups);
		}
		document.getElementById("addgroup-text").value = "";
	    });

	$('.remove-group').click(function(e) {
		var groupName = $(this).parent().find('.group-title').html();
		console.log(groupName);
		var remove = confirm('Do you want to remove ' + groupName + '?');
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

	$('#wordbox a.edit').click(function () {
		var wordid = $(this).parent().find('.term').attr('name');
		wordid = wordid.substr(1, wordid.length);
		console.log(wordid);

		var winH = $(window).height();
		var winW = $(window).width();

		getWord(wordid, renderWordEdit);
		
		$('#editbox').css('top', winH/2 - $(wordbox).height()/2);
		$('#editbox').css('left', winW/2 - $(wordbox).width()/2);

		//		$('#editbox').show();
		//		$('#wordbox').hide();
	    });

	$('#wordbox a.remove').click(function () {
		console.log($(this).parent().find('.term').html());
		var remove = confirm('Do you want to remove ' + $(this).parent().find('.term').html() + '?');
	        if(remove) {
		    var wordid = $(this).parent().find('.term').attr('name');
		    wordid = wordid.substr(1, wordid.length);
		    console.log(wordid);
	
		    $('#wordbox').hide();
		    removeWord(wordid, null);
		    console.log($('#w' + wordid).parent().parent().parent());
		    $('#w' + wordid).parent().parent().parent().remove();
		}
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
	    });
	/*
	$('a[name=modal]').hover(function(e) {
		var winH = $(window).height();
		var winW = $(window).width();
		
		var noteboxTop = winH/2 - $('#notebox').height()/2;
		var noteboxLeft = winW/2 + 300;
		var noteboxWidth = winW - noteboxLeft - 50;
		
		$('#notebox').css('top', noteboxTop);
		$('#notebox').css('left', noteboxLeft);
		$('#notebox').css('width', noteboxWidth);

	        var wordid = $(this).attr('id');
		wordid = wordid.substr(1, wordid.length);
		getWord(wordid, renderWordForNotebox);

		$(this).parent().parent().parent().parent().hover(function() {
			$('#notebox').hide();
		    });
	    }); */
}