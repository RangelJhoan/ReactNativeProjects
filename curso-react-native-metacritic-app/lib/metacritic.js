// Reajustado
export async function getMyGames() {
  const MY_GAMES = "https://mocki.io/v1/148856d5-86c3-4523-8039-c7d6270e5d7f";

  return fetch(MY_GAMES).then((data) => data.json());
}

export async function getGameDetails(mockio_id) {
  const MY_GAMES = "https://mocki.io/v1/" + mockio_id;

  return fetch(MY_GAMES).then((data) => data.json());
}
