//Andrew Kase and Vinny Nittolo
//Prof. Woodring
//CIS-343-01

//Reads the line and stores the input
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

//General game loop
function run(){

  //Display the commands the user can choose from
  showMenu()

  //The next input is the choice variable
  //This determines what the user chose
  rl.question("Please select a choice: ", choice => {

    //If the user chose 1
    //Means the user is looking for a pokemon
    if (choice == 1) {
      prompt(searchPoke)
    }

    //If the user chose 2
    //Means the user is looking for an item
    else if (choice == 2) {
      prompt(searchItem)
    }

    //If the user chose 3
    //Means the user is looking for a move
    else if (choice == 3) {
      prompt(searchMove)
    }

    //If the user chose none of these options
    //Means the user wants to end program
    else {
      rl.close()
    }
  })
}

//Display the commands the user can choose from
function showMenu() {
  console.log("1: Search for Pokemon")
  console.log("2: Search for an Item")
  console.log("3: Search for a Move")
  console.log("Anything else: Stop the program")
}

//Asks the user what command do choose
function prompt(cb) {
  rl.question("What are you searching for? ", term => {
    cb(term)
  })
}

//Fetches the information for the user selected pokemon
function searchPoke(term) {
  fetch("https://pokeapi.co/api/v2/pokemon/"+term)

  //Throws an error if fetch was not successfull
  .then(response => {
    if (!response.ok) {
      throw new Error('Could Not Find Poke-mon')
    }

    //Stores the json response
    return response.json()
  })

  //Calls the printPoke if the fetch was successfull
  .then(pokeData => {
    printPoke(pokeData)
  })

  //If an error arises in fetching, display the error message
  .catch(error => {
    console.error('Fetch error:', error.message)
    prompt(searchPoke)
  })
}

//Displays the information for the user selected pokemon
function printPoke(json) {

  //Prints the information from the .json
  console.log("\nName: " + json.name)
  console.log("Weight: " + json.weight)
  console.log("Base Experience: " + json.base_experience)
  for (i=0; i < (json.moves).length; i++) {
    console.log("  " + json.moves[i].move.name)
  }
  console.log("\n\n")

  //Runs the loop again after the information is displayed
  run()
}

//Fetches the information for the user selected item
function searchItem(term) {
  fetch("https://pokeapi.co/api/v2/item/"+term)

  //Throws an error if fetch was not successfull
  .then(response => {
    if (!response.ok) {
      throw new Error('Could Not Find Item')
    }

    //Stores the json response
    return response.json()
  })

  //Calls the printItem if the fetch was successfull
  .then(itemData => {
    printItem(itemData)
  })

  //If an error arises in fetching, display the error message
  .catch(error => {
    console.error('Fetch error:', error.message)
    prompt(searchItem)
  })
}

//Displays the information for the user selected item
function printItem(json) {

  //Prints the information from the .json
  console.log("\nName: " + json.name)
  console.log("Cost: " + json.cost)
  console.log("ID: " + json.id)
  console.log("Fling Effect: " + json.fling_effect)
  console.log("\n\n")

  //Runs the loop again after the information is displayed
  run()
}

//Fetches the information for the user selected move
function searchMove(term) {
  fetch("https://pokeapi.co/api/v2/move/"+term)

  //Throws an error if fetch was not successfull
  .then(response => {
    if (!response.ok) {
      throw new Error('Could Not Find Move')
    }

    //Stores the json response
    return response.json()
  })

  //Calls the printMove if the fetch was successfull
  .then(moveData => {
    printMove(moveData)
  })

  //If an error arises in fetching, display the error message
  .catch(error => {
    console.error('Fetch error:', error.message)
    prompt(searchMove)
  })
}

//Displays the information for the user selected move
function printMove(json) {

  //Prints the information from the .json
  console.log("Accuracy: " + json.accuracy)
  console.log("Effect Chance: " + json.effect_chance)
  console.log("Power: " + json.power)
  console.log("Target Type: " + json.target.name)
  console.log("\n\n")

  //Runs the loop again after the information is displayed
  run()
}

//Runs the game loop
run()
