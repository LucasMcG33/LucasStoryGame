
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
let currentScene = "briefing";

// Then, we create an object that stores the data for each scene,
const scenes = {

  briefing: {
    title: "Briefing",
    text: "~kzzzttt~ Your Mission Briefing is as follows: The vault is believed to hold valuable information on the locations of remaining insurgent pockets. You are being hot dropped onto Pluto’s surface with limited supplies and time, as the insurgents will likely be notified the minute the vault is opened. You will be given a brief window to infiltrate the Vault facility and gather any information you can before you are extracted. Be swift, be courageous. Long live Earth. Mission Control out. ~krrrttzz~",
    choices: [
      {
        text: "Start",
        action: function () {
          startCountdown(),
          updateScene("decontamination");
        }
      }
    ]
  },
  // See "decontamination" for the first example
  decontamination: {
    title: "Location: Decontamination",
    // character: "Interviewee:Grandma",
    text: "As you enter the decontamination chamber to the vault, you hear faint alarms blare from inside. The countdown has begun.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Click to Continue",
        action: function () {
        },
        nextScene: "decontamination2"
      }
    ]
  },

  decontamination2: {
    title: "Location: Decontamination",
    text: "Seconds later, the alarms stop. The lights go out. The power seems to have been shut off somehow. Luckily, you had just enough time to cycle the decontamination chamber. Where should you go next?",
    choices: [
      {
        text: "Go forward",
        nextScene: "storage"
      },
      {
        text: "Go right",
        nextScene: "observatory"
      }
    ]
  },

  storage: {
    title: "Location: Storage",
    text: "This seems to be a small storage room. Non-perishable food packets are strewn about on a shelf, and boxes litter the floor.",
    choices: [
      {
        text: "Search",
        //-30s, 
        action: function(){
          messageDisplay.textContent = "The room only contains old provisions and supplies, no useful information. You continue on.";
        },
        nextScene: "hallway"
      },
         {
        text: "Continue On",
        nextScene: "hallway"
      }
    ]
  },

  observatory: {
    title: "Location: Observatory",
    text: "You enter a large room with a telescope in the center. The walls are littered with various monitors and control panels, with some calculations written out on a large white wall.",
    choices: [
      {
        text: "Continue On",
        nextScene: "hallway"
      }
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "You see seemingly recent footprints in the dust on the floor leading down the hall and off to the left",
    choices: [
      {
        text: "Immediate Left",
        nextScene: "storage"
      },
      {
        text:"Far Left",
        nextScene: "lockedDoor"
      },
      {
        text:"Forward",
        nextScene:"lockedVault"
      },
      {
        text:"Right",
        nextScene:"crewQuarters"
      }
    ]
  },

   lockedDoor: {
    title: "The Locked Door",
    text: "The footprints lead to this door, but the door won't open. It seems to require a keycard to unlock.",
    choices: [
      {
        text: "Try to open it",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },

    powerStation: {
    title: "The Power Station",
    text: "As the door squeaks open, you can see the footsteps leading to a lever on a generator. All the signage has been scratched away.Flip the lever?",
    choices: [
      {
        text: "Flip the lever",
        action: function () {
          power=true;
          messageDisplay.textContent = "You flip the lever, restoring power to the facility. Some extra doors and monitors are now probably accessible.";
        },
        nextScene: "hallway"
      },
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },
  crewQuarters: {
    title: "The Crew Quarters",
    text: "You enter a room with a few beds and some personal belongings. It seems the crew left in a hurry, leaving their quarters behind.",
    choices: [
      {
        text: "Search the room",
        action: function () {
          //-30s
          pickUpItem("Keycard");
          messageDisplay.textContent = "You found a Keycard in some old clothes";
        },
        nextScene: "crewQuarters"
      },
      {
        text:"Go to the left",
        nextScene:"controlRoom"
      },
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },
  controlRoom: {
    title: "The Control Room",
    text: "Monitors line the walls giving off a faint hum. The control panel lights up with the option to access the vault.",
    choices: [
      {
        text: "Access the vault",
        action: function () {
          if (power) {
            messageDisplay.textContent ="You open the vault, backtracking through the hallway.";
            updateScene("vault");
          } else {
            messageDisplay.textContent = "The button doesn't seem to do anything. It requires power to function.";
          }
        }
      },
      {
        text: "Go back",
        nextScene: "crewQuarters"
      }
    ]
  },

  lockedVault:{
    title: "Locked Vault Door",
    text: "The vault door is locked. There may be some way to unlock it, maybe a console somewhere.",
    choices: [
      {
        text: "Go back",
        nextScene: "hallway"
      }
    ]
  },
  vault: {
    title: "The Vault",
    text: "The Vault is filled with numerous books along with food, water, and two sleeping pads. As you look around, you see a small wooden door at the back of the vault behind a bookshelf.",
    choices: [
      {
        text: "Open the door",
        action: function () {
          messageDisplay.textContent = "You open the door and find a hidden passage.";
          updateScene("archives");
        }
      },
      {
        text: "Extract from the facility",
        nextScene: "extraction"
      }
    ]
  },
  archives: {
    title: "The Archives",
    text: "You enter a dimly lit room filled with old books and documents, picking up a small book on a desk. It seems like a place where secrets are kept.",
    choices: [
      {
        text: "Read the book",
        action: function () {
          messageDisplay.textContent = "You find a journal with some interesting notes sitting on a small desk.";
          pickUpItem("Survivors Journal");
          wait(2000).then(() => {
            updateScene("journal");
          });
        }
      }
    ]
  },

  extraction: {
    title: "Extraction",
    text: "You have successfully completed your mission and are being extracted from the facility. With the information you gathered, the insurgents will soon be dealt with. Thank you, brave soldier.",
},

  journal: {
    title: "Survivors Journal",
    text: "You open the journal and read about the experiences of the insurgents. The journal details the rise of the Republic and fall of Old Earth governments. In the aftermath of World War 4, after the fall of The East Asian Republic, the United Federation of America, and the European Union, a new government was formed called The Republic. The Republic was a coalition of  nations that sought to 'rebuild' civilization in their image, establishing a new world order. The 3 founding members of the Republic featured old United States of America pockets which remained after the founding of the United Federation, along with Chinese and Israeli pockets. The Republic was a totalitarian government that sought to control all aspects of life, and had engineered all 4 World Wars in an attempt to overthrow the Old World. The crew of this facility were part of a resistance movement against them, fighting tooth and nail to remove them from power. The journal speaks of how the resistance was failing, especially after The Republic attacked one of their own supply ships in an effort to hurt resistance recruiting. It worked.",
    choices: [
      {
        text: "Close the journal and extract",
        nextScene: "extraction2"
      }
    ]
  },

  extraction2: {
    title: "Extraction",
    text: "You have successfully completed your mission and are being extracted from the facility. Now it is a question of what you will do next. Help the rebels, or put them fully in the grave.",
},

  failure: {
    title: "Mission Failed",
    text: "You have failed to extract from the Vault and meet up with your extraction team. You are now MIA, unable to return home."
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
  if (inventory.includes("Keycard")) {
    messageDisplay.textContent = "You swipe the Keycard unlocking the door.";
    updateScene("powerStation");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

function unlockVault(){
  if(power){
    messageDisplay.textContent="You press the button, then hear a loud sliding noise from out in the hall. The vault is now open.";
    updateScene("crewQuarters")
  }
}

function startCountdown() {
  document.getElementById("time-display").classList.toggle('hidden');
  let now = new Date().getTime();
}

