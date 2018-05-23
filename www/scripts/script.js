
$(document).scroll(function(ev) {
	// let scroll = $("html").scrollTop();
	// console.log(scroll);
	// if (scroll > 1){
	// 	$(".navbar").addClass("fixed-top");
	// };


	let buttons = document.getElementsByClassName("nav-item");
	for (i=0; i<buttons.length; i++){
		$(".nav-item").click(function(){
			let current = document.getElementsByClassName("active");
			current.removeClass("active");
			$(this).addClass("active");
		})
	};
	
	
})

// const maxWidth = window.matchMedia("(max-width: 992px)");
// function setMediaQueries(maxWidth) {
//     if (maxWidth.matches) { // If media query matches
//         // document.body.style.backgroundColor = "yellow";
//         $( ".block" ).find("p").css("display", "none");
//         $( ".block" ).find("h4").css("display", "none");
//         $( ".block" ).find("img").click(function(){
        	
//         });
//     } ;
// }


