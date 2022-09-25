const unorderedList = document.querySelector(".guessed-letters");
//The unordered list where the player’s guessed letters will appear.

const button =  document.querySelector(".guess");
//The button with the text “Guess!” in it.

const letterInput = document.querySelector(".letter")
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


let word = "magnolia";
//Magnolia is your starting word to test out the game until you fetch words from a hosted file

const guessedLetters = [];//the letters that have already been guessed 

let remainingGuesses = 8;


const getWord = async function() {
    const retrievedWords = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const wordResults = await retrievedWords.text();
    //console.log(wordResults);

    const wordArray = wordResults.split("\n"); 
    //To select a random word, you’ll need first to transform the data you fetched into an array. Each word is separated by a newline (line break)
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //to grab a random word from the file, create a variable to pull a random index from the wordArray
    console.log(randomIndex);
   word = wordArray[randomIndex].trim();
    placeholder(word);
};

//fire off the game
getWord();

//display the symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = []; //create an empty array
    for (const letter of word) { //looping through each letter of magnolia
        console.log(letter); //indivdiually log out the letters of magnolia
        placeholderLetters.push("●"); //bc we are looping through it is going to have this symbol for each letter of magnolia
    }
    wordInProgress.innerText = placeholderLetters.join(""); //this is joining all the dots together in a string
};

//placeholder(word); //this is running the function 


button.addEventListener("click", function(e){
    e.preventDefault();//Because you’re working with a form, you want to prevent the default behavior
                        //of clicking a button, the form submitting, and then reloading the page.

    message.innerText = ""; //emptied text      

    const guessedLetter = letterInput.value;  //captures value of input

    const goodGuess = validInput(guessedLetter);

    if (goodGuess) { //We've got a letter! Let's guess!
        makeGuess(guessedLetter);
    }

    //console.log(guessedLetter);

    letterInput.value = "";//you emptied the value of the input
    
    //validInput(input.value);
});

const validInput = function (input) {//This function’s purpose is to validate the player’s input.
    const acceptedLetter = /[a-zA-Z]/ //Now your code uses a regular expression to ensure the player inputs a letter!
    if (input.length === 0) { //is the input empty?
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) { //did they put more than 1 letter?
        message.innerText = "Did you mean to enter in more than one letter?";
    } else if (!input.match(acceptedLetter)) { // did you type something other than a letter?
        message.innerText = "Please enter a letter from A to Z.";
    } else { //finally it is a single letter they inputed
        return input;
    }
};


const makeGuess = function (guessedLetter) {
    guessedLetter = guessedLetter.toUpperCase(); //JS is case sensitive
    if (guessedLetters.includes(guessedLetter)) {
        message.innerText = "You're funny! You already guessed that letter, try again!";
    } else {
        guessedLetters.push(guessedLetter);
        console.log(guessedLetters);
        countGuessesRemaining(guessedLetter);
        showLetter();
        updateWordInProgress(guessedLetters);
    }
};


//function to show the guessed letters
const showLetter = function () {
    //clear list
    unorderedList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText= letter;
        unorderedList.append(li);
    }
};


// This function will replace the circle symbols with the correct letters guessed.
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // a variable to split the word string into an array so that the letter can appear in the guessedLetters array:
    const revealWord = [];
    //console.log(wordArray); //this logs out the word magnolia in the console
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    //console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    playerSuccess();
};

//updateWordInProgress();


const countGuessesRemaining = function(guessedLetter) {
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guessedLetter)) {
        message.innerText = `Nope try again sucker! There is no ${guessedLetter}`;
        remainingGuesses -=1;  
    } else {
        message.innerText = `Good job! You're one step closer. The word has the letter ${guessedLetter}`;
    }

    if (remainingGuesses === 0){
        message.innerHTML = `<p class="highlight> You have no guesses remaining loser! The word is ${word}.</p>`;
    } else if (remainingGuesses === 1){
        remaining.innerHTML = `<p class="remaining"> You have ${remainingGuesses} guess remaining. May the odds be ever in your favor</p>`;
    } else {
        remaining.innerHTML = `You got ${remainingGuesses} guesses remaining shawty.`;
    }
};


const playerSuccess = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};



