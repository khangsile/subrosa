$(function() {
	var navigation_offset_top = $('#navbar').offset().top;
	var sticky_navigation = function() {
	    var scroll_top = $(window).scrollTop();
	    if(scroll_top > navigation_offset_top) {
		$('#navbar').css({ 'position': 'fixed', 'top':0, 'left':0 });
	    } else {
		$('#navbar').css({ 'position': 'relative' });
	    }
	};
	
	sticky_navigation();
	$(window).scroll(function() {
		sticky_navigation();
	    });
    });