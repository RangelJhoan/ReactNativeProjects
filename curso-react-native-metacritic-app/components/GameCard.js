import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";

export function GameCard({ game }) {
  return (
    <View key={game.slug} style={styles.card}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.score}>{game.score}</Text>
      <Text>{game.description}</Text>
    </View>
  );
}

export function AnimatedGameCar({ game, index }) {
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
    <Animated.View>
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
  score: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "green",
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
});
