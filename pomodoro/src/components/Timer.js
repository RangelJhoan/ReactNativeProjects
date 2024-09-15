import { StyleSheet, Text, View } from "react-native";

export default function Timer({ time }) {
  // Tiempo formateado a minutos, se agrega cojín al inicio de la cadena de texto cuando sea necesario agregar un cero
  const timeInMinutes = Math.floor(time / 60) // Convertimos a minutos
    .toString() // Convertimos a String para poder usar la función padStart
    .padStart(2, "0"); // Agregamos 0 a la izquierda cuando hayan menos de dos caracteres

  // Calculamos los segundos del tiempo (es decir, el restante del minuto de la cuenta regresiva),
  // se agrega cojín al inicio de la cadena de texto cuando sea necesario agregar un cero
  const leftMinutesInSeconds = (time % 60) // Convertimos el minuto restante en segundos
    .toString() // Convertimos a String para poder usar la función padStart
    .padStart(2, "0"); // Agregamos 0 a la izquierda cuando hayan menos de dos caracteres

  // Formateamos el nuevo tiempo concatenando los minutos restantes con los segundos
  const formattedTime = `${timeInMinutes}:${leftMinutesInSeconds}`;

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 15,
  },
  time: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
  },
});
