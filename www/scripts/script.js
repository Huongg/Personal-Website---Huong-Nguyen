console.log("ready");
$(document).scroll(function(ev) {
	let scroll = $("html").scrollTop();
	// console.log(scroll);
	if (scroll > 10){
		$(".navbar").addClass("fixed-top");
	};
	
})
