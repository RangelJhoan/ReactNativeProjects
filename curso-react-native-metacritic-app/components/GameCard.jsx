import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Animated,
} from "react-native";
import "../global.css";
import { Score } from "./Score";
import { Link } from "expo-router";

export function GameCard({ game }) {
  return (
    <Link asChild href={`/${game.mockio_id}`}>
      <Pressable
        className="active:opacity-70 border border-white active:border-black/50 
        mb-2 bg-gay-500/10 rounded-xl p-4"
      >
        <View className="flex-row gap-4" key={game.slug}>
          <Image source={{ uri: game.image }} style={styles.image} />
          <View className="flex-shrink">
            <Text className="mb-1" style={styles.title}>
              {game.title}
            </Text>
            <Score score={game.score} maxScore={10} />
            <Text className="mt-2 flex-shrink" style={styles.description}>
              {game.description.slice(0, 100)}...
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 30,
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
});
