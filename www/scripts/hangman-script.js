/** Hangman **/


$(document).ready(function() {
	// startNewGame();

	$("#new-game").click(function(){
		startNewGame();

	
		$("#new-game").removeClass("visible");
		$("#new-game").addClass("invisible");
		

		let arrOfInviClass = [".letter", "#guess", "#used-letter"];
		for (i=0; i<arrOfInviClass.length; i++){
			$(arrOfInviClass[i]).removeClass("invisible");
			$(arrOfInviClass[i]).addClass("visible");
		}

	})


    $("#guess").click(function(){
	    let letterInput = $(".letter").val();
	    let token = $(".token").text();
	    guessLetter (token, letterInput);
	    console.log(guessLetter);
	});


    $(document).on('keypress', function(event) {
	    if (event.which == 13) { 
	      let letterInput = $(".letter").val();
	      let token = $(".token").text();
	      guessLetter (token, letterInput);
	      // console.log('letter is ' + letterInput);
    	}
    });

});

function startNewGame (){
	//Set initial variables to start of game
	$('.remaining').text(`7`);
	$('.attempts').html(``);	
	$('.letter').val(``);
	let canvas = document.getElementById('canvas-id');
 	let context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

	$.ajax ({
		type: "POST",
		url: "http://hangman-api.herokuapp.com/hangman",
		dataType: "json",
		data: "string",

		success: function(data){
			console.log(data);
			// guessLetter (data.token);
			updateCurrentToken(data.token);		
			updateString(data.hangman);

		}
	})

}

function updateCurrentToken (token) {
	$('.token').text(token);
}

function updateString (hangman){
	$('.hangman-word').html(hangman);	
}

function updateNumber (token) {
	let guessNum = $('.remaining').text();

	guessNum -=1 ;
	$('.remaining').text(guessNum);

	let returnMessage ="";
	let canvas = document.getElementById('canvas-id');
 	let context = canvas.getContext("2d");

	switch (guessNum){
		case 6:
			context.beginPath();
			context.lineWidth = 9;
			context.strokeStyle = 'purple';
			context.moveTo(100,300);
			context.lineTo(300,300);
			context.stroke();
			context.closePath();
			break;
		case 5:
			context.beginPath();
			context.lineWidth = 5;
			context.strokeStyle = 'purple';
			context.moveTo(150,300);
			context.lineTo(150,100);
			context.stroke();
			context.closePath();
			break;
		case 4:
			context.beginPath();
			context.lineWidth = 5;
			context.strokeStyle = 'purple';
			context.moveTo(147,100);
			context.lineTo(250,100);
			context.lineTo(250,150);
			context.stroke();
			context.closePath();
			break;
		case 3:
			context.beginPath();
			context.lineWidth = 1;
			context.strokeStyle = 'purple';
			context.arc(250, 170, 20, 0, Math.PI*2, true);
			context.stroke();
			context.closePath();
			break;
		case 2:
			context.beginPath();
			context.lineWidth = 1;
			context.strokeStyle = 'purple';
			context.moveTo(250, 190);
			context.lineTo(250, 240);
			context.stroke();
			context.closePath();
			break;
		case 1: 
			context.beginPath();
			context.lineWidth = 1;
			context.strokeStyle = 'purple';
			context.moveTo(225, 260);
			context.lineTo(250, 240);
			context.lineTo(275, 260);
			context.stroke();
			context.closePath();
			break;
		case 0:
			context.beginPath();
			context.lineWidth = 1;
			context.strokeStyle = 'purple';
			context.moveTo(235, 210);
			context.lineTo(250, 200);
			context.lineTo(265, 210);
			context.stroke();

			returnMessage += ["GAME OVER"]; 
			// alert(returnMessage);
			getSolution (token);

	}

}
	
function updateAttempts (val) {
	let newAttempt = $(".letter").val();

	let oldSpan = $('.attempts').html();
    let newSpan = `<span class="${val}"> ${newAttempt} </span>`;
	let result = oldSpan + newSpan;
	$('.attempts').html(result);
			
}


function guessLetter (token, letterInput){
	let isValid = checkingInput(letterInput);

	if (isValid ==true){
		$(".letter").removeClass("error");

		$.ajax ({
			type: "PUT",
			url: "http://hangman-api.herokuapp.com/hangman",
			dataType: "json",
			data: {"token": token, "letter": letterInput},
			success: function(data){
				console.log(data);
				let attemptClass = "";
				if (data.correct == true){
					attemptClass = "correct";
				} else {
					attemptClass = "wrong";
					updateNumber (data.token);
				}

				updateAttempts (attemptClass);
				updateString (data.hangman);
				updateCurrentToken (data.token);
			}
	    })    
	} else {
		$(".letter").addClass("error");
	}


	
}

function getSolution (token){
	$.ajax({
		type: "GET",
		url: "http://hangman-api.herokuapp.com/hangman",
		dataType: "json", 
		data: {"token": token},
		success: function (data){
			console.log(data);
			displaySolution(data.solution);
		}
	})
}

function displaySolution(solution){
	$(".hangman-word").html(solution);	
	$(".letter").hide();
	$("#guess").hide();
	$("#new-game").show();

}


function checkingInput (letterInput){
	
	let isNumber = $.isNumeric(letterInput);
	let trimWhitespace = $.trim(letterInput);
	let isOneCharacterLong = (trimWhitespace.length ===1);
	let attempts = $(".attempts").text();
	let isAlreadyContained = attempts.indexOf(letterInput);	

	if (isNumber == true || isOneCharacterLong == false || !isAlreadyContained ==-1){
		return false;
	} else{
		return true;
	}	
}





