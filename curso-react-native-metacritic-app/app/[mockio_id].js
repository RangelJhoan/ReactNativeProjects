import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";
import { Score } from "../components/Score";
import { getGameDetails } from "../lib/metacritic";

export default function Detail() {
  const { mockio_id } = useLocalSearchParams();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    getGameDetails(mockio_id).then((game) => setGameInfo(game));
  }, [mockio_id]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => {},
          headerTitle: gameInfo?.title,
          headerRight: () => {},
        }}
      />
      {!gameInfo ? (
        <ActivityIndicator color={"#000"} size={"large"} />
      ) : (
        <ScrollView>
          <View className="justify-center items-center">
            <Image
              className="mb-4 rounded"
              source={{ uri: gameInfo.image }}
              style={{ width: 214, height: 294 }}
            />
            <Score score={gameInfo.score} maxScore={10} />
            <Text className="text-center font-bold text-xl">
              {gameInfo.title}
            </Text>
            <Text className="mt-4 text-left mb-8 text-base">
              {gameInfo.description}
            </Text>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}
