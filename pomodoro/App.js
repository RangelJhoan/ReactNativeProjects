import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  // Creamos el estado "time" para indicar el tiempo en pantalla. Inicializamos el tiempo (25 minutos) en segundos
  const [time, setTime] = useState(25 * 60);

  // Creamos el estado "currentTime" para indicar en qué tipo de cuenta regresiva está el tab (Pomodoro, Descanso Corto o Descanso Largo)
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  // Creamos el estado "isActive" para indicar si la cuenta regresiva está en proceso o pausada
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      // Si la cuenta regresiva está activa, continuamos disminuyendo un segundo al tiempo total
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }

    // Si la cuenta regresiva, llega a cero
    if (time === 0) {
      // Desactivamos la cuenta regresiva
      setIsActive(false);

      // Según la pestaña seleccionada, indicamos el tiempo inicial para reiniciar el tiempo
      const startTime = currentTime === 0 ? 25 : currentTime === 1 ? 0.5 : 1;
      setTime(startTime * 60);
    }

    // Siempre que finalice el hook, limpiamos el intervalo para que no se cree uno nuevo
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Creamos la función para manejar cuando oprime el botón de iniciar o detener
  function handleStartStop() {
    // Ejecutamos el sonido del click
    playSound();

    // Actualizamos el estado isActivo intercambiando el valor
    setIsActive(!isActive);
  }

  // Creamos la función para manejar el efecto de sonido al oprimir el botón de iniciar o detener
  async function playSound() {
    // Cargamos el recurso del click
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.wav")
    );

    // Damos play al efecto de sonido cargado
    await sound.playAsync();
  }

  return (
    // Mantiene la vista en un área segura (distanciado de bordes, barra de estado, etc)
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          setIsActive={setIsActive}
        />

        <Timer time={time} />

        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
