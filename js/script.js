const unorderedList = document.querySelector(".guessed-letters");
//The unordered list where the player’s guessed letters will appear.

const button =  document.querySelector(".guess");
//The button with the text “Guess!” in it.

const input = document.querySelector(".letter")
//The text input where the player will guess a letter.

const wordInProgress = document.querySelector(".word-in-progress");
//The empty paragraph where the word in progress will appear.

const remaining = document.querySelector(".remaining");
//The paragraph where the remaining guesses will display.

const remainingSpan = document.querySelector(".remaining span");
//The span inside the paragraph where the remaining guesses will display.

const message = document.querySelector(".message");
//The empty paragraph where messages will appear when the player guesses a letter.

const hiddenButton = document.querySelector(".play-again");
//The hidden button that will appear prompting the player to play again.


const word = "magnolia";
//Magnolia is your starting word to test out the game until you fetch words from a hosted file

const placeholder = function (word) {
    const placeholderLetters = []; //create an empty array
    for (const letter of word) { //looping through each letter of magnolia
        //console.log(letter); //indivdiually log out the letters of magnolia
        placeholderLetters.push("●"); //bc we are looping through it is going to have this symbol for each letter of magnolia
    }
    wordInProgress.innerText = placeholderLetters.join(""); //this is joining all the dots together in a string
};

placeholder(word); //this is running the function 


button.addEventListener("click", function(e){
    e.preventDefault();//Because you’re working with a form, you want to prevent the default behavior
                        //of clicking a button, the form submitting, and then reloading the page.
    const guessedLetter = input.value;  //captures value of input
    console.log(guessedLetter);
    input.value = "";//you emptied the value of the input
});