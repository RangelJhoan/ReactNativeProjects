import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCar } from "./GameCard";
import { FlatList } from "react-native";
import { Logo } from "./Logo";
import { getMyGames } from "../lib/metacritic";

export function Main() {
  const insets = useSafeAreaInsets();

  const [games, setGames] = useState([]);
  useEffect(() => {
    getMyGames().then((games) => setGames(games));
  }, []);

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View style={{ marginBottom: 10 }}>
        <Logo />
      </View>
      {games.length === 0 ? (
        <ActivityIndicator color={"#000"} size={"large"} />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCar game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
