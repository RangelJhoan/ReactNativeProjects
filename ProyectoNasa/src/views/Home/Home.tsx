import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import Header from "../../components/Header";
import TodaysImage from "../../components/TodaysImage";
import fetchApi from "../../utils/fetch";
import { PostImage } from "../../types";

import { format, sub } from "date-fns";
import LastFiveDaysImages from "../../components/LastFiveDaysImages";

const Home = () => {
  // Creamos variable local para guardar la respuesta ya que solo se usa en este componente
  const [todaysImage, setTodaysImage] = useState<PostImage>({});
  const [lastFiveDaysImages, setLastFiveDaysImages] = useState<PostImage[]>([]);

  useEffect(() => {
    // Crreamos la función para consultar la imagen del día
    const loadTodaysImage = async () => {
      try {
        const todaysImageResponse = await fetchApi();
        setTodaysImage(todaysImageResponse);
      } catch (error) {
        console.error(error);
        setTodaysImage({});
      }
    };

    // Ejecutamos la función para cargar la imagen del día cuando se monte el componente por primera vez
    loadTodaysImage().catch(null);

    // Creamos la función para consultar las últimas 5 imágenes del día proporcionadas por la NASA
    const loadLast5DaysImages = async () => {
      try {
        const date = new Date();
        const todaysDate = format(sub(date, { days: 1 }), "yyyy-MM-dd");
        const fiveDaysAgoDate = format(sub(date, { days: 5 }), "yyyy-MM-dd");

        const lastFiveDaysImagesResponse = await fetchApi(
          `&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`
        );

        setLastFiveDaysImages(lastFiveDaysImagesResponse);
      } catch (error) {
        console.error(error);
      }
    };

    // Ejecutamos la función para cargar las últimas 5 imágenes del día cuando se monte el componente por primera vez
    loadLast5DaysImages().catch(null);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <TodaysImage {...todaysImage} />
      <LastFiveDaysImages postImages={lastFiveDaysImages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgba(7,26,93,255)",
  },
});

export default Home;
