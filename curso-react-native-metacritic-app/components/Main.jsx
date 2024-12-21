import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { getMyGames } from "../lib/metacritic";
import { AnimatedGameCard } from "./GameCard";
import { Screen } from "./Screen";

export function Main() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getMyGames().then((games) => setGames(games));

    /*
    // Cuando se obtiene de una API en LOCAL se pone la IP
    const result = fetch("http://192.168.2.9:8080/usuario").then((rawData) => {
      return rawData.json();
    });

    result
      .then((data) => alert(data[0].email))
      .catch((error) => console.log("Se presentó el error:\n", error));*/
  }, []);

  return (
    <Screen>
      {games.length === 0 ? (
        <ActivityIndicator color={"#000"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
