const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");

describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });

  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
describe("fetchSinglePlayer", () => {
  let player;

  beforeAll(async () => {
    const players = await fetchAllPlayers();
    player = await fetchSinglePlayer(players[0].id);
  });

  test("returns an object", () => {
    expect(typeof player).toBe("object");
  });

  test("returns player with name and id", () => {
    expect(player).toHaveProperty("name");
    expect(player).toHaveProperty("id");
  });
});

// TODO: Tests for `addNewPlayer`
describe("addNewPlayer", () => {
  let newPLayerTest;
  const playerObject = {
    name: "Test Player",
    breed: "Test Breed",
    status: "bench",
    imageUrl:
      "http://r.ddmcdn.com/w_912/s_f/o_1/cx_51/cy_0/cw_912/ch_1368/APL/uploads/2019/12/Anise-PBXVI.jpg",
    teamId: 1,
  };

  beforeAll(async () => {
    newPLayerTest = await addNewPlayer(playerObject);
  });

  test("returns an object", () => {
    console.log(newPLayerTest);
    expect(newPLayerTest).not.toBeNull();
  });

  test("new player has name, breed, status, imageUrl, and teamId", () => {
    console.log(newPLayerTest["name"]);
    expect(newPLayerTest).not.toBeNull();
    expect(newPLayerTest["name"]).toBe("Test Player");
    expect(newPLayerTest["breed"]).toBe("Test Breed");
    expect(newPLayerTest["status"]).toBe("bench");
    expect(newPLayerTest["imageUrl"]).toBe(
      "http://r.ddmcdn.com/w_912/s_f/o_1/cx_51/cy_0/cw_912/ch_1368/APL/uploads/2019/12/Anise-PBXVI.jpg"
    );
    expect(newPLayerTest["teamId"]).toBe(1);
  });
});

// (Optional) TODO: Tests for `removePlayer`
describe("removePlayer", () => {
  let players;

  beforeAll(async () => {
    players = await fetchAllPlayers();
    await removePlayer(players[0].id);
  });

  test("removes a player from the list", async () => {
    const updatedPlayers = await fetchAllPlayers();
    expect(
      updatedPlayers.find((player) => player.id === players[0].id)
    ).toBeUndefined();
  });
});