
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "preface";

// Then, we create an object that stores the data for each scene,
const scenes = {

  preface: {
    title: "Preface",

    text: "Late into the 32nd Millennium, much in the solar system has changed. Over a millennium ago, Old Earth governments all rapidly and mysteriously collapsed, being replaced by the unified Earthen government known as ‘The Republic’. Currently there is a revolt against the government, and it is finally starting to fail. Recent raids led by these insurgents led to the destruction of a freighter carrying necessary supplies to a Republic mining station orbiting Titan, one of Saturn’s moons. The station is home to hundreds of thousands of civilians who now will be going without basic resources. With system-wide military response and industrial powerhouse of The Republic going into overdrive, plus the new even worse souring of public opinion, this revolt has been pushed to its last legs, forced into pocket groups within the Kuiper Belt. These people are terrorists, and must be stopped. You are one of Earth’s finest soldiers, sent to an underground vault discovered on Pluto to gather intelligence on the insurgents. For the millennia that The Republic has governed, a revolt has never seen success. Your job is to ensure it stays that way.",
    
    choices: [
      {
        text: "Continue"
        action: function () {
          updateScene("briefing");
        }
      }

  }

  briefing: {
    title: "Briefing",
    text: "This is the briefing. You can add any text you want here to set up the story.",
    choices: [
      {
        text: "Start",
        action: function () {
          updateScene("decontamination");
        }
      }
    ]
  }
  // See "decontamination" for the first example
  decontamination: {
    title: "Location: Decontamination",
    // character: "Interviewee:Grandma",
    text: "Text: well what I remember happening is that Darcie went inside to play with her pretend kitchen, I heard her neighbor mention he was really hungry, and the dog ran around really quickly",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Chase after the dog (-10 HP)",
        action: function () {
          updateHealth(-10);
        },
        nextScene: "entrance"
      },
      {
        text: "Ask about the neighbor",
        nextScene: "hallway"
      },
      {
          text: "Pick up the brass key",
          action: function () {
            pickUpItem("brass key");
          },
          nextScene: "hallway"
      }
    ]
  },

  entrance: {
    title: "Location: Entrance",
    character: "Interviewee:Neighbor",
    text: "well what I remember...",
    choices: [
      {
        text: "Ask about the dog",
        nextScene: "decontamination"
      },
         {
        text: "Ask about the neighbor",
        nextScene: "hallway"
      }
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "The hallway is dark and silent.",
    choices: [
      {
        text: "decontamination",
        nextScene: "decontamination"
      }
    ]
  },

   lockedDoor: {
    title: "The Locked Door",
    text: "The door handle doesn't move.",
    choices: [
      {
        text: "Try to open it",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "decontamination"
      }
    ]
  },

   solution: {
    title: "The solution",
    text: "You solved the mystery!",
    
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

