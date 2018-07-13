

$(document).ready(function(){
	const shuffledCard = shuffleIcon(iconArray);
	// moves +1 whenever the player clicks on card + updates directly on the your move in html
	let moves = 0;
	let moveTaken = 0;
	let firstCard = 0
	let secondCard = 1; 
	// those are to assign the class fa icon to
	// then compare to see if firstCard is matched the secondCard
	let firstCardVal ;
	let secondCardVal;

	// whenever 2 cards are matched, totalCardMatched +1
	// player win when totalCard = totalCardMatch
	const totalCard = iconArray.length;
	let totalCardMatched = 0;
	let hasStarted = false;

	//assign the icon from iconArray randomly to #card
	$('#card-1').prepend(shuffledCard[0])
	$('#card-2').prepend(shuffledCard[1]);
	$('#card-3').prepend(shuffledCard[2]);
	$('#card-4').prepend(shuffledCard[3]);
	$('#card-5').prepend(shuffledCard[4]);
	$('#card-6').prepend(shuffledCard[5]);
	$('#card-7').prepend(shuffledCard[6]);
	$('#card-8').prepend(shuffledCard[7]);
	$('#card-9').prepend(shuffledCard[8]);
	$('#card-10').prepend(shuffledCard[9]);
	$('#card-11').prepend(shuffledCard[10]);
	$('#card-12').prepend(shuffledCard[11]);

	// TIME COUNTER
	let sec =0;
	let min =0;
	let timer = null;
	// const timer = setInterval(timeCounting, 1000);
	function timeCounting(){
		timer = setInterval(function(){
			sec +=1;
			if(sec <60){
				$(".seconds").text(sec + "s");
			} else if(sec ===60){
				min += 1;
				sec = 0;
				$(".minutes").css('visibility', 'visible');
	            $(".colon-two").css('visibility', 'visible');
	            $(".seconds").text(sec + "s");
	            $(".minutes").text(min + "m");
	            sec += 1;
			}	
			// console.log(sec);
		},1000)
			
	}

	$(".card").click(function(){
		if (!hasStarted){
			hasStarted = true;
			console.log(`starting game`);
			timeCounting();
		}
		moves += 1;
		$('.moves').text(moves);
		// if this is the first card of the game then flip the cards
		if(firstCard === moveTaken){
			$(this).find('img').css('visibility', 'visible');
			$(this).addClass("open");
			firstCard = $(this).find('img');
			firstCardVal = $(this).find('img').attr("src");
			// console.log(firstCard);
			moveTaken +=1;
		} else if (secondCard === moveTaken){
			$(this).find('img').css('visibility', 'visible')
			$(this).addClass("open");
			secondCard = $(this).find('img');
			secondCardVal = $(this).find('img').attr("src");
			// console.log(secondCard);
			// if 2 cards matched -> call matched()
			if (firstCardVal == secondCardVal){
				matched(firstCard, secondCard);
				totalCardMatched +=2; //to track how many cards have been matched

				// if the amount of totalCardMatch == totalCard
				// it means players have matched all the cards
				if (totalCardMatched === totalCard){
					console.log(`you won`);
					clearInterval(timer);
					completed();
				}
			// the case where 2 cards do not match
			} else if (firstCardVal !== secondCardVal){
				flipBack(firstCard, secondCard);	
			} 
		
		firstCard =0;
		secondCard=1;
		moveTaken =0;
		}		
				
	});

	// FIND CARDS ARE MATCHED , OR NOT, IF ALL MATCHED, THE PLAYER WINS
	// function failed(firstCard, secondCard){
	// 	firstCard.addClass("not-a-match");
	// 	secondCard.addClass("not-a-match");
	// };

	function flipBack(firstCard, secondCard){
		setTimeout(function(){
			firstCard.css('visibility', 'hidden');
			secondCard.css('visibility', 'hidden');
			firstCard.removeClass("open not-a-match");
			secondCard.removeClass("open not-a-match");
		}, 1000);		
	}

	function matched (firstCard, secondCard){
		firstCard.css('visibility', 'visible');
		secondCard.css('visibility', 'visible');
	};

	function completed(){		
      	// hide the card deck and score-panel when the game is finished
      	$(".card-deck").css("display", "none");
      	$(".score-panel-container").css('visibility', 'hidden');
      	// Modal content
      	$(".modal").css('display', 'block');
      	$(".congratulatory_message").text('Congratulations,  you won!');
      	$(".time_taken").text(`Time taken: ${min} min, ${sec} sec`);
      	$(".moves_taken").text(`Total moves: ${moves}`);


      	 // Restarts the game
	    $(".play_again_button").click(function() {
	        restartGame();
	        
	    });
	};

	function restartGame(){
		hasStarted = false;
		moves = 0;
		moveTaken = 0;
		firstCard = 0
		secondCard = 1; 
		totalCardMatched = 0;
		min = 0; 
		sec = 0;
		$(".seconds").text("");
		$(".minutes").text("");
		$('.moves').text("");
		$(".modal").css('display', 'none');
	    $(".card-deck").css("display", "flex");
	    $(".score-panel-container").css('visibility', 'visible');
	    $(".card").find("img").css('visibility', 'hidden');
	}
	
})
// an array of 6 flagss x 2
let iconArray = [
    "<img src=./assets/england.png />",
    "<img src=./assets/japan.png />",
    "<img src=./assets/brasil.png />",
    "<img src=./assets/france.png />",
    "<img src=./assets/germany.png />",
    "<img src=./assets/portugal.png />",
    "<img src=./assets/brasil.png />",
    "<img src=./assets/portugal.png />",
    "<img src=./assets/germany.png />",
    "<img src=./assets/france.png />",
    "<img src=./assets/japan.png />",
    "<img src=./assets/england.png />"];

function shuffleIcon (array){
	let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}



