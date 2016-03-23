//
// hangman.js -- A word guessing game
//
// Solution for homework 4
//
// Karishma Ghiya, kghiya93@umd.edu, 17th March 2016
//

// Keeps track of the word the user is supposed to guess
var wordGlobal; 
// Keeps track of which letters have been guessed correctly so far
var partialWordGlobal = []; 
// keeps track of the number of wrong guesses so far (max allowed is 6)
var numWrongGuessesGlobal = 0; 
var wrongGuessesGlobal = [];
var guessedAlreadyGlobal;
/**
 * Called once when the page loads. Sets up initial values for
 * global variables and randomly selects a word for the user to
 * guess.
 */
function initializeGame() {

    alert("Welcome to the game!");
     var i;
    // variable to hold an array of at least 15 words
    var wordBank = ["Parakeet", "Cockatoo", "Dove","Parrot","Macaw","Finch","Peacock","Starling","Duck","Sandpiper","Woodpecker","Owl","Sparrow","Crow","Warbler","Flycatcher"];
    // For wordGlobal, one word selected randomly from the array you just declared
    wordGlobal = wordBank[1 + Math.floor(16 * Math.random())];
    
    // initializes all the global variables.
     for (i = 0; i< wordGlobal.length; i++) {
     	partialWordGlobal[i] = "_";
     }
     	
    partialWordGlobal[i] = "\0";
    wrongGuessesGlobal[0] = "\0";
    guessedAlreadyGlobal = "";
    // displays the partially filled word in the currentWordSpan.
              
        for (i=0; i< wordGlobal.length; i++) {
        	document.getElementById("currentWordSpan").innerHTML +=  "    " + partialWordGlobal[i];
        }
}

/**
 * Called whenever the user clicks the Guess! button. Provides the
 * main logic of the game, checking to see if there were any
 * matching letters and updating the behavior accordingly.
 */
 function isLetter(str) {

  if ((str.charCodeAt(0) <=90  && str.charCodeAt(0) >= 65 )||(str.charCodeAt(0) <=122 && str.charCodeAt(0) >= 97))
  	return 1;
  else
  	return 0;
}

function onGuessLetterButtonClick() {
   //Variable declarations
   // get the input (value of the letterInput HTML element)
   var guessLetter = document.getElementById("letterInput").value;
   var pic = document.getElementById("hangmanImage");   
   var match = 0;
   var i=0;
   var check;
   document.getElementById("letterInput").value = "";
   
   // check if the input is valid (i.e., a single character) and an alphabet
   if (isLetter(guessLetter.toUpperCase()) !== 1 || guessLetter.length > 1) {
   		alert("Invalid input. Please enter your guessed letter again! Click the button when done.");
   }
  // If Valid Input & an alphabet then play the game!
  if (isLetter(guessLetter) === 1 && guessLetter.length === 1) { 

   	 if (guessedAlreadyGlobal.indexOf(guessLetter.charAt(0).toUpperCase()) === -1) {
   	 	guessedAlreadyGlobal = guessedAlreadyGlobal+(guessLetter.charAt(0).toUpperCase());
   	 	
   	 	for (i = 0; i < wordGlobal.length; i++) {
      		
      		if ((guessLetter.charAt(0) === wordGlobal[i]) || ((guessLetter.charAt(0).toUpperCase() === wordGlobal[i])) || ((guessLetter.charAt(0).toLowerCase() === wordGlobal[i]))) {
      			match = 1;
      			partialWordGlobal[i] = guessLetter.toUpperCase();
      		}
      	}

    // if the guess is valid, check to see if it matches letters in
    // wordGlobal, updating partialWordGlobal for each letter where
    // there's a match.
    
   	 	if (match === 1) {
        	// update the partially filled word in the currentWordSpan
    		document.getElementById("currentWordSpan").innerHTML = " ";
    		
    		for (i=0; i< wordGlobal.length;i++) {
    	   		document.getElementById("currentWordSpan").innerHTML += "    " +partialWordGlobal[i];
     		}
     		
     	// checked if the word is fully guessed  
     		check = partialWordGlobal.toString();
     		if (check.indexOf("_") === -1) {
     	    	document.getElementById("message").innerHTML += "<br/>Congrats! You have guessed the word correctly!";
     	    	pic.src = "images/you_win.jpg";
     	    	document.getElementById("letterInput").disabled = true;
    	    	document.getElementById("guessLetterButton").disabled = true;
     	    }
       	}
    	else {
    		// if the guess resulted in no matches, 
            //Record all wrong guesses to display to the user  		
    		wrongGuessesGlobal[numWrongGuessesGlobal] = guessLetter;
    		// increment numWrongGuessesGlobal 
       		numWrongGuessesGlobal++;
    		wrongGuessesGlobal[numWrongGuessesGlobal] = "\0";
    		//Display to the user
    		document.getElementById("wrongGuess").innerHTML = wrongGuessesGlobal;
    		document.getElementById("message").innerHTML  = "Incorrect guess! Total incorrect guesses = " + numWrongGuessesGlobal ;
    		
    		// update the hangman image
     		
  		    switch (numWrongGuessesGlobal) {
     			case 1:
     				pic.src = "images/man_1.png";
     				break;
     			case 2:
     				pic.src = "images/man_2.png";
     				break;
     			case 3:
     				pic.src = "images/man_3.png";
     				break;
     			case 4:
     				pic.src = "images/man_4.png";
     				break;
     			case 5:
     				pic.src = "images/man_5.png";
     				break;
     			case 6:
     				pic.src = "images/man_6.png";
     				break;
     			default:
     				;//do nothing

     			}
		    if (numWrongGuessesGlobal === 6) {
    			document.getElementById("message").innerHTML += "<br/> You have now lost all your chances <br/>";
    			document.getElementById("message").innerHTML += "Correct Word Was: <b>"+wordGlobal +" </b><br/>GAME OVER!!";
    	    	document.getElementById("letterInput").disabled = true;
    	    	document.getElementById("guessLetterButton").disabled = true;
    		}
   
    	}//end else - when no matches in the wordGlobal  	

   	 }//End if-not guessed earlier
	 else {
	 	alert("You have guessed this letter earlier!!You cannot enter that again");
	 }	

    }// end if isletter==1 && guessletter.length ==1
       
    
}


/***
 * Initialization code for the entire page. DO NOT EDIT BELOW THIS
 * LINE.
 */
function init() {
    
    // Mouse click event handlers
    document.getElementById("guessLetterButton").onclick = onGuessLetterButtonClick;

    // Call main game init function
    initializeGame();
}

window.onload = init;
