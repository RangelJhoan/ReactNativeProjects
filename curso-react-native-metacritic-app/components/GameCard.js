import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

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
