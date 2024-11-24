//Andrew Kase and Vinny Nittolo
//Prof. Woodring
//CIS-343-01

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);


function run(){
  showMenu()
  rl.question("Please select a choice: ", choice => {
    if (choice == 1) {
      prompt(searchPoke)
    }
    else if (choice == 2) {
      prompt(searchItem)
    }
    else if (choice == 3) {
      prompt(searchMove)
    }
    else {
      rl.close()
    }
  })
}

function showMenu() {
  console.log("1: Search for Pokemon")
  console.log("2: Search for an Item")
  console.log("3: Search for a Move")
  console.log("Anything else: Stop the program")
}


function prompt(cb) {
  rl.question("What are you searching for? ", term => {
    cb(term)
  })
}



function searchPoke(term) {
  fetch("https://pokeapi.co/api/v2/pokemon/"+term)

  .then(response => {
    if (!response.ok) {
      throw new Error('Could Not Find Poke-mon')
    }
    return response.json()
  })
  .then(pokeData => {
    printPoke(pokeData)
  })
  .catch(error => {
    console.error('Fetch error:', error.message)
    prompt(searchPoke)
  })
}

function printPoke(json) {
  console.log("\nName: " + json.name)
  console.log("Weight: " + json.weight)
  console.log("Base Experience: " + json.base_experience)
  for (i=0; i < (json.moves).length; i++) {
    console.log("  " + json.moves[i].move.name)
  }
  console.log("\n\n")
  run()
  
}

function searchItem(term) {
  fetch("https://pokeapi.co/api/v2/item/"+term)

  .then(response => {
    if (!response.ok) {
      throw new Error('Could Not Find Item')
    }
    return response.json()
  })
  .then(itemData => {
    printItem(itemData)
  })
  .catch(error => {
    console.error('Fetch error:', error.message)
    prompt(searchItem)
  })
}

function printItem(json) {
  console.log("\nName: " + json.name)
  console.log("Cost: " + json.cost)
  console.log("ID: " + json.id)
  console.log("Fling Effect: " + json.fling_effect)
  console.log("\n\n")
  run()
}

function searchMove(term) {
  fetch("https://pokeapi.co/api/v2/move/"+term)

  .then(response => {
    if (!response.ok) {
      throw new Error('Could Not Find Move')
    }
    return response.json()
  })
  .then(moveData => {
    printMove(moveData)
  })
  .catch(error => {
    console.error('Fetch error:', error.message)
    prompt(searchMove)
  })
}

function printMove(json) {
  console.log("Accuracy: " + json.accuracy)
  console.log("Effect Chance: " + json.effect_chance)
  console.log("Power: " + json.power)
  console.log("Target Type: " + json.target.name)
  console.log("\n\n")
  run()
}

run()