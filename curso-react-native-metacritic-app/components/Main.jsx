import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { getMyGames } from "../lib/metacritic";
import { AnimatedGameCard } from "./GameCard";
import { Screen } from "./Screen";

export function Main() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getMyGames().then((games) => setGames(games));
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
