import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";
import { Score } from "../components/Score";

export default function Detail() {
  const { gameslug } = useLocalSearchParams();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    setGameInfo({
      slug: "doom",
      title: "DOOM",
      image:
        "https://i0.wp.com/nxtgame.cl/wp-content/uploads/2023/06/doom.jpg?fit=1024%2C1024&ssl=1",
      description:
        "DOOM vuelve como un shooter moderno repleto de diversión y desafíos brutales desarrollado por id Software. Despiadados demonios, armas de destrucción inimaginables y un movimiento ágil y fluido constituyen la base de un intenso combate en primera persona, tanto si estáis aniquilando a las hordas demoníacas del infierno en la campaña para un jugador como si competís contra amigos en los diversos modos multijugador. Combinad un arsenal de armas emblemáticas y futuristas y un avanzado sistema de cuerpo a cuerpo para derribar, acuchillar, pisotear, aplastar y destruir a los demonios con métodos creativos y violentos. Ampliad la experiencia de juego con DOOM SnapMap, el editor de juego que permite crear, jugar y compartir contenidos con el resto del mundo.",
      score: 9,
    });
  }, [gameslug]);

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
