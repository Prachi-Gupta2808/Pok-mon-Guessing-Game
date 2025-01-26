
// let correctName = "";
// let randomInt = getRandomInteger(1, 100);
// fetchPokemonData(randomInt);

// // JavaScript function to fetch Pokémon data from the PokéAPI
// async function fetchPokemonData(pokemon) {
//   const loadingSpinner = document.getElementById("loadingSpinner");
//   const pokemonImage = document.getElementById("pokemonImage");

//   // Show the loading spinner and hide the image while fetching
//   loadingSpinner.style.display = "block";
//   pokemonImage.style.display = "none";

//   const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${pokemon}`
//   );
//   const data = await response.json();

//   // Set Pokémon data and hide the loading spinner
//   document.getElementById("pokemonImage").src = data.sprites.front_default;
//   correctName = data.name.toLowerCase();

//   // Hide the loading spinner and show the image
//   loadingSpinner.style.display = "none";
//   pokemonImage.style.display = "block";
// }

// // Function to get random integer for Pokémon ID
// function getRandomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getPokemon() {
//   // Fetch data for a new random Pokémon and reset the blur effect
//   let randomInt = getRandomInteger(1, 100);
//   fetchPokemonData(randomInt);
//   resultMessage.textContent=" ";
//   // Re-apply the blur effect for the new Pokémon
//   document.getElementById("pokemonImage").style.filter = "blur(5px)";
// }

// // Function to check the player's guess
// function checkGuess() {
//   const guessInput = document.getElementById("guessInput");
//   const guess = guessInput.value.toLowerCase();
//   const resultMessage = document.getElementById("resultMessage");
//   const pokemonImage = document.getElementById("pokemonImage");

//   if (guess === correctName) {
//     // If the guess is correct, reveal the Pokémon and show a success message
//     pokemonImage.style.filter = "none";
//     resultMessage.textContent = `Correct! It's ${correctName.charAt(0).toUpperCase() + correctName.slice(1)}!`;
//     resultMessage.style.color = "green";

//     // Clear the input box after correct guess
//     guessInput.value = "";


//     // Load a new Pokémon after a short delay
//     setTimeout(getPokemon, 2000);
//   } else {
//     // If the guess is incorrect, display a message to try again
//     resultMessage.textContent = "Incorrect! Try again.";
//     resultMessage.style.color = "red";
//   }
// }

let correctName = "";
let randomInt = getRandomInteger(1, 100);
let score = 0; // Initialize score
let incorrectGuesses = 0; // Initialize incorrect guesses counter
const maxIncorrectGuesses = 3; // Max number of incorrect guesses before game over

fetchPokemonData(randomInt);

// JavaScript function to fetch Pokémon data from the PokéAPI
async function fetchPokemonData(pokemon) {
  const loadingSpinner = document.getElementById("loadingSpinner");
  const pokemonImage = document.getElementById("pokemonImage");

  // Show the loading spinner and hide the image while fetching
  loadingSpinner.style.display = "block";
  pokemonImage.style.display = "none";

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  const data = await response.json();

  // Set Pokémon data and hide the loading spinner
  document.getElementById("pokemonImage").src = data.sprites.front_default;
  correctName = data.name.toLowerCase();

  // Hide the loading spinner and show the image
  loadingSpinner.style.display = "none";
  pokemonImage.style.display = "block";
}

// Function to get random integer for Pokémon ID
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPokemon() {
  // Fetch data for a new random Pokémon and reset the blur effect
  let randomInt = getRandomInteger(1, 100);
  fetchPokemonData(randomInt);
  resultMessage.textContent = " ";
  
  // Re-apply the blur effect for the new Pokémon
  document.getElementById("pokemonImage").style.filter = "blur(5px)";

  // Update score on the page
  document.getElementById("score").textContent = `Score: ${score}`;
}

function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value.toLowerCase();
  const resultMessage = document.getElementById("resultMessage");
  const pokemonImage = document.getElementById("pokemonImage");

  if (guess === correctName) {
    // If the guess is correct, reveal the Pokémon and show a success message
    pokemonImage.style.filter = "none";
    resultMessage.textContent = `Correct! It's ${correctName.charAt(0).toUpperCase() + correctName.slice(1)}!`;
    resultMessage.style.color = "green";
    
    // Increment the score
    score += 1;
    
    // Clear the input box after correct guess
    guessInput.value = "";

    // Load a new Pokémon after a short delay
    setTimeout(getPokemon, 2000);
  } else {
    // If the guess is incorrect, display a message to try again
    incorrectGuesses += 1; // Increment incorrect guess counter
    resultMessage.textContent = "Incorrect! Try again.";
    resultMessage.style.color = "red";

    // If the number of incorrect guesses exceeds the limit, game over
    if (incorrectGuesses >= maxIncorrectGuesses) {
      resultMessage.textContent = `Game Over! Your final score is ${score}.`;
      resultMessage.style.color = "black";
      document.getElementById("guessInput").disabled = true; // Disable input
      document.getElementById("guessButton").disabled = true; // Disable guess button
    }
  }
}

// Display the score on the page initially
document.getElementById("score").textContent = `Score: ${score}`;
