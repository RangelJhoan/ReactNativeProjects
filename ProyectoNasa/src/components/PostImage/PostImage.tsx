import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { PostImage as PostImageType, RootStackParams } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PostImageNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  "Detail"
>;

const PostImage: FC<PostImageType> = ({ title, date, hdurl, explanation }) => {
  const { navigate } = useNavigation<PostImageNavigationProps>();

  const handleViewPress = () => {
    navigate("Detail", { title, date, hdurl, explanation });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.buttonContainer}>
        <Button title="View" onPress={handleViewPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(18,39,113,255)",
    borderRadius: 20,
    marginBottom: 12,
    padding: 16,
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  date: {
    color: "#FFF",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});

export default PostImage;
