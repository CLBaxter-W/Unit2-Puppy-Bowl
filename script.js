// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)

const cohortName = "2405-FTB-ET-WEB-FT";
const API_URL_PLAYER_LIST = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
const API_URL_PLAYER_ID = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
const API_URL_TEAM = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/teams`;

const state = {
  playerList: [],
  team: [],
};

/*
 *   Call the pair of render functions together
 */

const renderMainPage = async () => {
  console.log("****** renderMainPage ******* ");

  renderNewPlayerForm();

  const returnObject = fetchAllPlayers();
  renderAllPlayers(state.team, returnObject);
};

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL_PLAYER_LIST);
    const json = await response.json();
    return json.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL_PLAYER_ID}/${playerId}`);
    const json = await response.json();
    return json.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const fetchAllTeams = async () => {
  //added fetch all teams
  try {
    const response = await fetch(API_URL_TEAM);
    const json = await response.json();
    return json.data.teams;
  } catch (err) {
    console.error("Uh oh, trouble fetching teams!", err);
  }
};

//TODO fetch all team data here
//TODO team on top, players on the team underneath
//TODO player, player team and other players on that team

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(API_URL_PLAYER_LIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(
        responseData.error ? responseData.error.message : "Failed to add player"
      );
    }

    return responseData.data.newPlayer;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL_PLAYER_LIST}/${playerId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete player");
    }
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

const createTeamContainers = (teamContainers) => {
  console.log("****** CreateTeamContainers ***********");

  for (let i = 0; i <= state.team.length; i++) {
    let playerListContainer = document.createElement("div");
    playerListContainer.id = `team${i}`;
    playerListContainer.className = "playerContainerDiv";

    let teamNameElement = document.createElement("h3");
    if (i < state.team.length) {
      teamNameElement.textContent = `Team: ${state.team[i].name}`;
    } else {
      teamNameElement.textContent = `Team: TeamFringe`;
    }

    playerListContainer.appendChild(teamNameElement);

    teamContainers.push(playerListContainer);
  }
};

/*
 * Updates `<main>` to display a list of all players.
 * If there are no players, a message is displayed.
 * BUTTONS ON PLAYER CARDS
 * - "See details" button that, CALLS `renderSinglePlayer` to
 *    display more information about the player,
 * - "Remove from roster" button that, when clicked, SHOULD CALL `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (teamList, playerList) => {
  const mainElement = document.querySelector("main");

  // If there are no players found, display message
  if (playerList.length === 0) {
    mainElement.innerHTML = "<p>No players found.</p>";
    return;
  }

  //  If there are players to display
  // Create Three Containers - 2 Named Teams [0, 1], 1 All the other teams
  // We are always adding them new - logic can be done to be more flexible
  //  They are an "appendChild" because "renderNewPlayerForm"
  // is always at the top.

  let teamContainers = [];
  createTeamContainers(teamContainers);
  console.log(teamContainers);

  // add the team containers to main
  // teamContainers.forEach((container) => {
  for (let x = 0; x < teamContainers.length; x++) {
    let container = teamContainers[x];
    mainElement.appendChild(container);
  }
  //});

  // For each player, create a display card with minimal stats
  console.log(`document before: ${document}`);

  // playerList.forEach((player) => {

  console.log(`playerList before: ${playerList}`);

  const playerHolderList = playerList;
  console.log(`playerList before: ${playerHolderList}`);

  for (let i = 0; i < playerList.length; i++) {
    const player = playerList[i];

    const playerCard = document.createElement("div");
    playerCard.className = "playerDiv";

    // find the player's team name to display and choose correct parent container
    // TODO duplicated in renderSingle Player, should be function
    let teamName = "FringeLeague";
    if (player.teamId === state.team[0].id) {
      teamName = state.team[0].name;
      teamContainers[0].appendChild(playerCard);
    } else if (player.teamId === state.team[1].id) {
      teamName = state.team[1].name;
      teamContainers[1].appendChild(playerCard);
    } else {
      teamContainers[2].appendChild(playerCard);
    }

    playerCard.innerHTML = `
      <h2>${player.name}</h2>
      <h5>Team: ${teamName}</h5>
      <img name="player-image" class="divImg playerImagePlacement" src="${player.imageUrl}" alt="${player.name}">

      <button class="details-button playerDetailButtonPlacement" data-id="${player.id}">See details</button>
      <button class="remove-button playerRemoveButtonPlacement" data-id="${player.id}">Remove from roster</button>
    `;

    // add events to the buttons for details and deletes
    playerCard
      .querySelector(".remove-button")
      .addEventListener("click", async (e) => {
        const playerId = e.target.dataset.id;
        await removePlayer(playerId);
        renderMainPage();
      });

    playerCard
      .querySelector(".details-button")
      .addEventListener("click", async (e) => {
        const playerId = e.target.dataset.id;
        const player = await fetchSinglePlayer(playerId);
        renderSinglePlayer(player);
      });
  }
  // });
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * will call 'renderNewPlayerForm' to re-render the new player form+
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = "";

  // clean up the old view
  // TODO do I need to cleanup listeners here?
  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.firstChild);
  }

  const playerCard = document.createElement("div");
  playerCard.className = "playerDiv"; // TODO "player-card";

  // find the player's team name to display and choose correct parent container
  // TODO duplicated in renderSingle Player, should be function
  let teamName = "FringeLeague";
  if (player.teamId === state.team[0].id) {
    teamName = state.team[0].name;
  } else if (player.teamId === state.team[1].id) {
    teamName = state.team[1].name;
  }

  playerCard.innerHTML = `
    <h2 class="playerNameAndTeamPlacement">${player.name}</h2>
    <h3 class="playerTeamPlacement">Team: ${teamName}<h3> 
    <img name="player-image" class="divImg singlePlayerImagePlacement" src="${player.imageUrl}" alt="${player.name}">
    <h3 class="playerStatusPlacement">Status: ${player.status}</h3>
    <h3 class="playerBreedPlacement">Breed: ${player.breed}</h3>
    
    <button id="back-button"  class="details-button playerRemoveButtonPlacement">Back to all players</button>
  `;

  // mainElement.replaceChildren(...playerCard);
  mainElement.appendChild(playerCard);

  document.querySelector("#back-button").addEventListener("click", async () => {
    renderMainPage();
  });
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  // Put the new Player Form as the first item on the screen
  const mainElement = document.querySelector("main");

  // clean up the old view
  // TODO do I need to cleanup listeners here?
  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.firstChild);
  }

  // create the new view
  const newPlayerForm = document.createElement("form");
  newPlayerForm.className = "newPlayerForm";
  // mainElement.replaceChildren(...newPlayerForm);
  mainElement.appendChild(newPlayerForm);
  // Draw the class
  newPlayerForm.innerHTML = `

  <label for="playerName"> Player Name: </label><br />
  <input type="text" id="playerName" name="name" style="width: 40vw" /><br />

  <label for="playerBreed"> Player Breed: </label><br />
  <input type="text" id="playerBreed" name="breed" style="width: 40vw" /><br />

  <label for="playerStatus"> Player Status: </label><br />
  <select id="playerStatus" name="status" style="width: 40vw">
    <option value="bench" selected>Bench</option>
    <option value="field">Field</option>
  </select><br />

  <label for="playerImage">Image URL:</label><br />
  <input type="text" id="playerImage" name="imageUrl" style="width: 40vw"/><br />

    <label for="playerTeamId">Player Team Id</label><br />
  <input type="text" id="playerTeamId" name="teamId" style="width: 40vw"/><br />
  

  <br /> <button>Add Player</button>
  <br />`;

  // Add the event Listener for creating a new player
  // When  submit is clicked, add the player and then re-render
  // the player list
  newPlayerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(newPlayerForm);
    const newPlayer = {
      name: formData.get("name"),
      breed: formData.get("breed"),
      status: formData.get("status"),
      imageUrl: formData.get("imageUrl"),
      teamId: formData.get("teamId"),
    };

    const theNewPlayer = await addNewPlayer(newPlayer);
    console.log(theNewPlayer);

    // rerender the main page
    renderMainPage();
  });
};

/**
 * Initializes the app by fetching all players all teams and rendering them to the DOM.
 *  set state variable to hold list of teams (id, name)
 *  set state variable to hold list of players
 *
 *  render the new player form
 *  render all players
 */
const init = async () => {
  try {
    const [team, players] = await Promise.all([
      fetchAllTeams(),
      fetchAllPlayers(),
    ]);

    state.team = team;
    state.players = players;

    // first render the new player form and the puppy teams
    renderMainPage();
  } catch (err) {
    console.error("Error initializing data:", err);
  }
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
